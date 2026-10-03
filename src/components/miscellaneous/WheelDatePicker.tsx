import { useState } from "react";
import { Button, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";

type WheelDatePickerProps = {
  initialDate: Date;
  onChooseDatePress: (selectedDate: Date) => void;
};

export default function WheelDatePicker({
  initialDate,
  onChooseDatePress,
}: WheelDatePickerProps) {
  //   const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Selected: {initialDate.toLocaleDateString()}</Text>
      <Button title="Open Calendar" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={initialDate}
        mode="date"
        onConfirm={(selectedDate) => {
          setOpen(false);
          onChooseDatePress(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}
