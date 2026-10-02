import { View } from "react-native";

export default function DividingLine({
  color,
  backgroundColor,
  paddingHorizontal,
}: {
  color: string;
  backgroundColor?: string;
  paddingHorizontal?: number;
}) {
  return (
    <View style={{ backgroundColor: backgroundColor }}>
      <View style={{ paddingHorizontal: paddingHorizontal }}>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: color,
          }}
        ></View>
      </View>
    </View>
  );
}
