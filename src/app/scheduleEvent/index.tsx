import DropdownSmall from "@/components/miscellaneous/DropdownSmall";
import Input from "@/components/miscellaneous/Input";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type EventType =
  | "Sunday Service"
  | "Prayer Service"
  | "Consolidation"
  | "Life Class"
  | "Destiny Training"
  | "Life Group"
  | "Other";

const eventTypes: EventType[] = [
  "Sunday Service",
  "Prayer Service",
  "Consolidation",
  "Life Class",
  "Destiny Training",
  "Life Group",
  "Other",
];

export default function ScheduleEventPage() {
  const { title, eventId, eventTypeIndex } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [selectedEventTypeIndex, setSelectedEventTypeIndex] = useState(
    Number(eventTypeIndex.toString()),
  );

  console.log("eventTypeIndex", eventTypeIndex);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.primary }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 96,
        paddingBottom: 96,
        paddingHorizontal: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text
          style={[
            styles.h2,
            {
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h2,
              color: theme.textAlt,
            },
          ]}
        >
          Schedule Event
        </Text>
        <View style={styles.fieldsContainer}>
          {/* Event Type */}
          <View style={styles.field}>
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h4,
                fontWeight: "bold",
                color: theme.textAlt,
              }}
            >
              Event Type
            </Text>
            <DropdownSmall
              isEditable={eventTypeIndex.toString() === ""}
              selections={eventTypes}
              isOpen={dropdownIsOpen}
              indexSelected={selectedEventTypeIndex}
              onOpenPress={() => setDropdownIsOpen(true)}
              onClosePress={(selectedIndex) => {
                setSelectedEventTypeIndex(selectedIndex);
                setDropdownIsOpen(false);
              }}
            />
          </View>
          {/* Event Name */}
          <View style={styles.field}>
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h4,
                fontWeight: "bold",
                color: theme.textAlt,
              }}
            >
              Event Name
            </Text>
            <Input
              value={eventName}
              placeholderText={title.toString()}
              autoComplete="off"
              textColor={theme.text}
              placeholderTextColor={theme.iconSecondary}
              borderColor={theme.textAlt}
              onChangeText={(text) => setEventName(text)}
            />
          </View>
          {/* Date */}
          <View style={styles.field}>
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h4,
                fontWeight: "bold",
                color: theme.textAlt,
              }}
            >
              Date
            </Text>
            <Input
              value={date}
              placeholderText="Date"
              autoComplete="off"
              textColor={theme.text}
              placeholderTextColor={theme.iconSecondary}
              borderColor={theme.textAlt}
              onChangeText={(text) => setDate(text)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20, top: 64 },
  fieldsContainer: { gap: 16, paddingRight: 24 },
  field: { gap: 8 },
  h2: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 24,
  },
});
