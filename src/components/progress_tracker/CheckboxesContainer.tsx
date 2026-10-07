import { AccentColor } from "@/constants/theme";
import { ColorValue, StyleSheet, View } from "react-native";
import Checkbox from "./Checkbox";

export type CheckboxData = {
  date: number;
  dateKey?: string;
  isChecked: boolean;
  isCurrent: boolean;
};

type CheckboxesContainerProps = {
  colorName: AccentColor;
  checkmarkColor: ColorValue;
  checkboxesData: CheckboxData[];
};

export default function CheckboxesContainer({
  colorName,
  checkmarkColor,
  checkboxesData,
}: CheckboxesContainerProps) {
  return (
    <View style={styles.container}>
      {checkboxesData.map((checkbox) => (
        <View key={checkbox.dateKey ?? checkbox.date} style={styles.gridItem}>
          <Checkbox
            isChecked={checkbox.isChecked}
            colorName={colorName}
            type="Primary"
            isCurrent={checkbox.isCurrent}
            checkmarkColor={checkmarkColor}
            onCheckboxPress={() => {}}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingRight: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "14.2857%",
    alignItems: "flex-start",
    marginBottom: 11,
  },
});
