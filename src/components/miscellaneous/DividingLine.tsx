import { View } from "react-native";

export default function DividingLine({ color }: { color: string }) {
  return (
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: color,
      }}
    ></View>
  );
}
