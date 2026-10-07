import upsertEvent from "@/api/supabase/events/upsertEvent";
import ButtonBig from "@/components/buttons/ButtonBig";
import CheckboxSmall from "@/components/miscellaneous/CheckboxSmall";
import DropdownSmall from "@/components/miscellaneous/DropdownSmall";
import Input from "@/components/miscellaneous/Input";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
  const { title, eventId, eventTypeIndex, lifeGroupId } =
    useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [information, setInformation] = useState("");

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [selectedEventTypeIndex, setSelectedEventTypeIndex] = useState(
    Number(eventTypeIndex.toString()) - 1, // eventTypeIndex is 0-indexed, while eventTypeId is 1-indexed
  );

  const handleCreateEventButtonPress = async () => {
    await upsertEvent({
      eventId: Number(eventId.toString()),
      title: title.toString() ?? "",
      timestamp: new Date(`${date} ${time}`),
      location: location.toString() ?? "",
      information: information.toString() ?? "",
      announcementStart: new Date(),
      announcementEnd: new Date(`${date} ${time}`),
      lifeGroupId: Number(lifeGroupId.toString()) ?? null,
      isOnline: isOnline,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
      style={[styles.keyboardContainer, { backgroundColor: theme.primary }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
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
            {/* Time */}
            <View style={styles.field}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h4,
                  fontWeight: "bold",
                  color: theme.textAlt,
                }}
              >
                Time
              </Text>
              <Input
                value={time}
                placeholderText="Time"
                autoComplete="off"
                textColor={theme.text}
                placeholderTextColor={theme.iconSecondary}
                borderColor={theme.textAlt}
                onChangeText={(text) => setTime(text)}
              />
            </View>
            {/* Location */}
            <View style={styles.field}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h4,
                  fontWeight: "bold",
                  color: theme.textAlt,
                }}
              >
                Location
              </Text>
              <Input
                value={location}
                placeholderText="Location"
                autoComplete="off"
                textColor={theme.text}
                placeholderTextColor={theme.iconSecondary}
                borderColor={theme.textAlt}
                onChangeText={(text) => setLocation(text)}
              />
              {/* is Online? */}
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingTop: 8,
                  alignItems: "center",
                }}
              >
                <CheckboxSmall
                  backgroundColor={theme.primary}
                  checkboxColor={theme.iconSecondary}
                  borderColor={theme.iconSecondary}
                  checkColor={theme.textAlt}
                  isChecked={isOnline}
                  onCheckboxPress={() => {
                    setIsOnline((s) => !s);
                  }}
                />
                <Text
                  style={{
                    fontFamily: fonts.family,
                    fontSize: fonts.sizes.h6,
                    color: theme.iconSecondary,
                  }}
                >
                  Online
                </Text>
              </View>
            </View>
            {/* Information */}
            <View style={styles.field}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h4,
                  fontWeight: "bold",
                  color: theme.textAlt,
                }}
              >
                Information
              </Text>
              <Input
                value={information}
                placeholderText="Information"
                autoComplete="off"
                textColor={theme.text}
                placeholderTextColor={theme.iconSecondary}
                borderColor={theme.textAlt}
                multiline
                onChangeText={(text) => setInformation(text)}
              />
            </View>
            <View style={styles.createEventButton}>
              <ButtonBig
                text="Create Event"
                textColor={theme.iconAccent}
                backgroundColor={theme.iconPrimary}
                onButtonPress={handleCreateEventButtonPress}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 96,
    paddingBottom: 24,
    paddingHorizontal: 40,
  },
  container: { paddingBottom: 96, gap: 20, top: 64 },
  fieldsContainer: { gap: 16, paddingRight: 24 },
  field: { gap: 8 },
  h2: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 24,
  },
  createEventButton: {
    paddingVertical: 12,
  },
});
