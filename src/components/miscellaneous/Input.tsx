import { useState } from "react";
import {
  ColorValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

const INPUT_HEIGHT = 48;
const MULTILINE_MIN_HEIGHT = INPUT_HEIGHT * 5;

type InputProps = {
  value: string;
  placeholderText: string;
  autoComplete: TextInputProps["autoComplete"];
  fontFamily: string;
  textColor: ColorValue;
  placeholderTextColor: ColorValue;
  borderColor: ColorValue;
  backgroundColor?: ColorValue;
  isEditable?: boolean;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
};

export default function Input({
  value,
  placeholderText,
  autoComplete,
  fontFamily,
  textColor,
  placeholderTextColor,
  borderColor,
  backgroundColor,
  isEditable = true,
  multiline = false,
  onChangeText,
}: InputProps) {
  const [inputHeight, setInputHeight] = useState(
    multiline ? MULTILINE_MIN_HEIGHT : INPUT_HEIGHT,
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={[
          styles.input,
          {
            fontFamily: fontFamily,
            height: multiline ? inputHeight : INPUT_HEIGHT,
            color: textColor,
            borderWidth: 1,
            borderColor,
          },
        ]}
        editable={isEditable}
        autoComplete={autoComplete}
        multiline={multiline}
        scrollEnabled={true}
        textAlignVertical={multiline ? "top" : "center"}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        onContentSizeChange={
          multiline
            ? (event) => {
                const newHeight = Math.max(
                  MULTILINE_MIN_HEIGHT,
                  event.nativeEvent.contentSize.height,
                );

                setInputHeight((currentHeight) =>
                  currentHeight === newHeight ? currentHeight : newHeight,
                );
              }
            : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    padding: 12,
  },
});
