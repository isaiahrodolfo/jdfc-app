import { NoteType, saveNotes } from "@/api/supabase_api";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NoteEditorProps = {
  uniqueIdentifier: string;
  noteType: NoteType;
};

export default function NoteEditor({
  uniqueIdentifier,
  noteType,
}: NoteEditorProps) {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });

  const handleSaveNotes = async () => {
    saveNotes(await editor.getHTML(), uniqueIdentifier, noteType);
  };

  return (
    <SafeAreaView style={exampleStyles.fullScreen}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={"padding"}
        style={exampleStyles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
      <Pressable onPress={handleSaveNotes}>
        <Text>Save Notes</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

const initialContent = `<p>This is a basic example!</p>`;
