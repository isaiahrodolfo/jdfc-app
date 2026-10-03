import { useState } from "react";
import { ColorValue, StyleSheet, TextInput, View } from "react-native";

type InputProps = {
  textColor: ColorValue;
  placeholderTextColor: ColorValue;
  borderColor: ColorValue;
  backgroundColor?: ColorValue;
};

export default function Input({
  textColor,
  placeholderTextColor,
  borderColor,
  backgroundColor,
}: InputProps) {
  const [text, setText] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <TextInput
        style={[
          styles.input,
          { color: textColor, borderWidth: 1, borderColor: borderColor },
        ]}
        placeholder="Search..."
        placeholderTextColor={placeholderTextColor}
        value={text} // Binds the input value to state
        onChangeText={setText} // Updates state automatically on every keystroke
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330, // testing
    height: 48,
  },
  input: { padding: 12 },
});
