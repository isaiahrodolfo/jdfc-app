import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NoteEditorProps = {
  onSaveNotes: (html: string) => void | Promise<void>;
  onClose?: () => void;
  initialContent: string;
  height?: number;
  maxHeight?: number;
  onHeightChange?: (height: number) => void;
  keyboardAvoiding?: boolean;
  saveRequest?: number;
  showDoneButton?: boolean;
};

export default function NoteEditor({
  onSaveNotes,
  onClose,
  initialContent,
  height,
  maxHeight: availableMaxHeight,
  onHeightChange,
  keyboardAvoiding = true,
  saveRequest = 0,
  showDoneButton = true,
}: NoteEditorProps) {
  const { height: windowHeight } = useWindowDimensions();
  const [localHeight, setLocalHeight] = useState<number | null>(null);
  const closing = useRef(false);
  const lastSaveRequest = useRef(saveRequest);
  const heightAtStart = useRef(height ?? localHeight ?? 300);
  const measuredHeight = useRef(0);
  const maxHeight = Math.min(
    availableMaxHeight && availableMaxHeight > 0
      ? availableMaxHeight
      : windowHeight * 0.65,
    windowHeight,
  );
  const minHeight = Math.min(200, maxHeight);
  const requestedHeight = height ?? localHeight;
  const panelHeight =
    requestedHeight === null || requestedHeight === undefined
      ? undefined
      : Math.min(requestedHeight, maxHeight);
  const resizeValues = useRef({
    height,
    maxHeight,
    minHeight,
    onHeightChange,
    panelHeight,
    windowHeight,
  });
  resizeValues.current = {
    height,
    maxHeight,
    minHeight,
    onHeightChange,
    panelHeight,
    windowHeight,
  };

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });

  const handleClose = useCallback(
    async (dismissKeyboard = true) => {
      if (closing.current) return;

      closing.current = true;
      try {
        const html = await editor.getHTML();
        await onSaveNotes(html);

        if (dismissKeyboard) Keyboard.dismiss();
        onClose?.();
      } finally {
        closing.current = false;
      }
    },
    [editor, onClose, onSaveNotes],
  );

  useEffect(() => {
    if (saveRequest !== lastSaveRequest.current) {
      lastSaveRequest.current = saveRequest;
      void handleClose().catch((error: unknown) => {
        console.error("Error saving notes:", error);
      });
    }
  }, [handleClose, saveRequest]);

  const resizePanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dy) > 4,
        onPanResponderGrant: () => {
          const { panelHeight: currentPanelHeight, windowHeight: currentWindowHeight } =
            resizeValues.current;
          heightAtStart.current =
            currentPanelHeight ?? (measuredHeight.current || currentWindowHeight);
        },
        onPanResponderMove: (_, gestureState) => {
          const {
            height: currentHeight,
            maxHeight: currentMaxHeight,
            minHeight: currentMinHeight,
            onHeightChange: notifyHeightChange,
          } = resizeValues.current;
          const nextHeight = Math.min(
            currentMaxHeight,
            Math.max(currentMinHeight, heightAtStart.current - gestureState.dy),
          );
          if (currentHeight === undefined) {
            setLocalHeight(nextHeight);
          }
          notifyHeightChange?.(nextHeight);
        },
      }),
    [],
  );

  const content = (
    <SafeAreaView
      style={[
        styles.container,
        panelHeight === undefined ? styles.flexContainer : { height: panelHeight },
      ]}
      edges={["bottom"]}
      onLayout={(event) => {
        measuredHeight.current = event.nativeEvent.layout.height;
      }}
    >
      <View style={styles.resizeHandle} {...resizePanResponder.panHandlers}>
        <View style={styles.resizeGrip} />
      </View>
      <View style={styles.editorContainer}>
        <RichText editor={editor} />
      </View>

      <View style={styles.toolbarContainer}>
        <Toolbar editor={editor} />
      </View>

      {showDoneButton && (
        <Pressable
          style={styles.doneButton}
          onPress={() => {
            void handleClose().catch((error: unknown) => {
              console.error("Error saving notes:", error);
            });
          }}
        >
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );

  if (!keyboardAvoiding) return content;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
      style={styles.keyboardContainer}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  container: {
    backgroundColor: "white",
  },

  flexContainer: {
    flex: 1,
  },

  resizeHandle: {
    paddingVertical: 10,
    alignItems: "center",
  },

  resizeGrip: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#999",
  },

  editorContainer: {
    flex: 1,
  },

  toolbarContainer: {
    width: "100%",
  },

  doneButton: {
    padding: 12,
    alignItems: "center",
  },

  doneText: {
    fontWeight: "bold",
  },
});
