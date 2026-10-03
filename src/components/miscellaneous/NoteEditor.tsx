import { RichText, useEditorBridge } from "@10play/tentap-editor";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type NoteEditorHandle = {
  saveAndClose: () => Promise<void>;
};

type NoteEditorProps = {
  onSaveNotes: (html: string) => void | Promise<void>;
  onClose?: () => void;
  initialContent: string;
  height?: number;
  maxHeight?: number;
  onHeightChange?: (height: number) => void;
  keyboardAvoiding?: boolean;
  showDoneButton?: boolean;
  backgroundColor?: string;
  accentColor?: string;
  borderColor?: string;
  textColor?: string;
  fontFamily?: string;
};

const NoteEditor = forwardRef<NoteEditorHandle, NoteEditorProps>(
  function NoteEditor(
    {
      onSaveNotes,
      onClose,
      initialContent,
      height,
      maxHeight: availableMaxHeight,
      onHeightChange,
      keyboardAvoiding = true,
      showDoneButton = true,
      backgroundColor = "white",
      accentColor = "#999",
      borderColor = accentColor,
      textColor = "black",
      fontFamily = "sans-serif",
    },
    ref,
  ) {
  const { height: windowHeight } = useWindowDimensions();
  const [localHeight, setLocalHeight] = useState<number | null>(null);
  const closing = useRef(false);
  const keyboardTop = useRef<number | null>(null);
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
    autofocus: false,
    avoidIosKeyboard: true,
    initialContent,
    theme: {
      webview: {
        backgroundColor,
      },
      toolbar: {
        toolbarBody: {
          backgroundColor,
          borderTopColor: accentColor,
          borderBottomColor: accentColor,
        },
        toolbarButton: {
          backgroundColor,
        },
        icon: {
          tintColor: textColor,
        },
        iconDisabled: {
          tintColor: accentColor,
        },
        iconActive: {
          tintColor: accentColor,
        },
        iconWrapper: {
          backgroundColor,
        },
        iconWrapperActive: {
          backgroundColor: accentColor,
        },
        linkBarTheme: {
          addLinkContainer: {
            backgroundColor,
            borderTopColor: accentColor,
            borderBottomColor: accentColor,
          },
          linkInput: {
            backgroundColor,
            color: textColor,
          },
          placeholderTextColor: textColor,
          doneButton: {
            backgroundColor: accentColor,
          },
          doneButtonText: {
            color: backgroundColor,
          },
        },
      },
    },
  });
  const editorCss = `
    html, body, #root {
      background-color: ${backgroundColor} !important;
    }
    .ProseMirror {
      box-sizing: border-box;
      min-height: calc(100% - 48px);
      margin: 24px;
      padding: 24px !important;
      border: 1px solid ${borderColor};
      background-color: ${backgroundColor} !important;
      color: ${textColor} !important;
      caret-color: ${textColor};
      font-family: '${fontFamily}', sans-serif !important;
    }
    .ProseMirror * {
      color: ${textColor};
      font-family: '${fontFamily}', sans-serif !important;
    }
    .ProseMirror:focus {
      outline: none;
    }
  `;

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

  useImperativeHandle(
    ref,
    () => ({
      saveAndClose: () => handleClose(),
    }),
    [handleClose],
  );

  const handleCloseRef = useRef(handleClose);
  handleCloseRef.current = handleClose;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (event) => {
      keyboardTop.current = event.endCoordinates.screenY;
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      keyboardTop.current = null;
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const resizePanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dy) > 4,
        onPanResponderGrant: () => {
          const {
            panelHeight: currentPanelHeight,
            windowHeight: currentWindowHeight,
          } = resizeValues.current;
          heightAtStart.current =
            currentPanelHeight ??
            (measuredHeight.current || currentWindowHeight);
        },
        onPanResponderMove: (_, gestureState) => {
          const currentKeyboardTop = keyboardTop.current;
          if (
            currentKeyboardTop !== null &&
            gestureState.moveY >= currentKeyboardTop
          ) {
            void handleCloseRef.current().catch((error: unknown) => {
              console.error("Error saving notes:", error);
            });
            return;
          }

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
        { backgroundColor },
        panelHeight === undefined
          ? styles.flexContainer
          : { height: panelHeight },
      ]}
      edges={["bottom"]}
      onLayout={(event) => {
        measuredHeight.current = event.nativeEvent.layout.height;
      }}
    >
      <View
        style={[styles.resizeHandle, { backgroundColor }]}
        {...resizePanResponder.panHandlers}
      >
        <View style={[styles.resizeGrip, { backgroundColor: accentColor }]} />
      </View>
      <View style={styles.editorContainer}>
        <RichText
          editor={editor}
          onLoad={() => {
            requestAnimationFrame(() => editor.injectCSS(editorCss));
          }}
        />
      </View>

      {/* <View style={styles.toolbarContainer}>
        <Toolbar editor={editor} />
      </View> */}
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
  },
);

export default NoteEditor;

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
