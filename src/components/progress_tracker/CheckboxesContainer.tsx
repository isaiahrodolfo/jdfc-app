import { AccentColor } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import Checkbox from "./Checkbox";

export type CheckboxData = {
  date: number;
  isChecked: boolean;
  isCurrent: boolean;
};

type CheckboxesContainerProps = {
  colorName: AccentColor;
  checkboxesData: CheckboxData[];
};

export default function CheckboxesContainer({
  colorName,
  checkboxesData,
}: CheckboxesContainerProps) {
  return (
    <View style={styles.container}>
      {checkboxesData.map((checkbox) => (
        <Checkbox
          key={checkbox.date}
          isChecked={checkbox.isChecked}
          colorName={colorName}
          type={"Primary"}
          isCurrent={checkbox.isCurrent}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
  },
});
