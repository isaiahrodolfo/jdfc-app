import { AccentColor } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import Checkbox from "./Checkbox";

export type CheckboxData = {
  date: number;
  dateKey?: string;
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
        <View
          key={checkbox.dateKey ?? checkbox.date}
          style={styles.gridItem}
        >
          <Checkbox
            isChecked={checkbox.isChecked}
            colorName={colorName}
            type="Primary"
            isCurrent={checkbox.isCurrent}
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
