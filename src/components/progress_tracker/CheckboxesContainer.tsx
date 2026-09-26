import { StyleSheet, View } from "react-native";
import Checkbox from "./Checkbox";

type CheckboxData = {
  date: number;
  isChecked: boolean;
  isCurrent: boolean;
};

type CheckboxesContainerProps = {
  colorName: "yellow" | "green" | "blue" | "purple";
  type: "Primary" | "Secondary";
  checkboxesData: CheckboxData[];
};

export default function CheckboxesContainer({
  colorName,
  type,
  checkboxesData,
}: CheckboxesContainerProps) {
  return (
    <View style={styles.container}>
      {checkboxesData.map((checkbox) => (
        <Checkbox
          key={checkbox.date}
          isChecked={checkbox.isChecked}
          colorName={colorName}
          type={type}
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
    gap: 12 + 34,
    padding: 17,
  },
});
