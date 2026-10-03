import {
  ColorValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type InputProps = {
  value: string;
  placeholderText: string;
  autoComplete: TextInputProps["autoComplete"];
  textColor: ColorValue;
  placeholderTextColor: ColorValue;
  borderColor: ColorValue;
  backgroundColor?: ColorValue;
  onChangeText?: (text: string) => void;
};

export default function Input({
  value,
  placeholderText,
  autoComplete,
  textColor,
  placeholderTextColor,
  borderColor,
  backgroundColor,
  onChangeText,
}: InputProps) {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <TextInput
        style={[
          styles.input,
          { color: textColor, borderWidth: 1, borderColor: borderColor },
        ]}
        autoComplete={autoComplete}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
  },
  input: { padding: 12 },
});
