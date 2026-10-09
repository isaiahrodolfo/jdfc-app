import upsertEvent from "@/api/supabase/events/upsertEvent";
import ButtonBig from "@/components/buttons/ButtonBig";
import CheckboxSmall from "@/components/miscellaneous/CheckboxSmall";
import DropdownSmall from "@/components/miscellaneous/DropdownSmall";
import Input from "@/components/miscellaneous/Input";
import { useTheme } from "@/contexts/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Lucide } from "@react-native-vector-icons/lucide";
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

  const [eventName, setEventName] = useState(title.toString());
  const [dateStart, setDateStart] = useState(new Date()); // Default start: now
  const [timeStart, setTimeStart] = useState(new Date()); // Default start: now
  const [dateEnd, setDateEnd] = useState(new Date(Date.now() + 3600000)); // Default end: now plus one hour
  const [timeEnd, setTimeEnd] = useState(new Date(Date.now() + 3600000)); // Default end: now plus one hour
  const [location, setLocation] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [information, setInformation] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [selectedEventTypeIndex, setSelectedEventTypeIndex] = useState(
    Number(eventTypeIndex.toString()) - 1, // eventTypeIndex is 0-indexed, while eventTypeId is 1-indexed
  );

  const timestampStart = new Date(
    dateStart.getFullYear(),
    dateStart.getMonth(),
    dateStart.getDate(),
    timeStart.getHours(),
    timeStart.getMinutes(),
  );

  const timestampEnd = new Date(
    dateEnd.getFullYear(),
    dateEnd.getMonth(),
    dateEnd.getDate(),
    timeEnd.getHours() + 1,
    timeEnd.getMinutes(),
  );

  const handleCreateEventButtonPress = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await upsertEvent({
        eventId: eventId.toString() === "" ? null : Number(eventId.toString()),
        eventTypeId: Number(eventTypeIndex.toString()),
        title: eventName,
        timestampStart: timestampStart,
        timestampEnd: timestampEnd,
        location: location.toString() ?? "",
        information: information.toString() ?? "",
        announcementStart: new Date(),
        lifeGroupId: Number(lifeGroupId.toString()) ?? null,
        isOnline: isOnline,
      });

      if (eventId === null) {
        console.log("Upsert event failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
                fontFamily={fonts.family}
                textColor={theme.text}
                placeholderTextColor={theme.iconSecondary}
                borderColor={theme.textAlt}
                onChangeText={(text) => setEventName(text)}
              />
            </View>
            {/* Date & Time (Start) */}
            <View style={styles.field}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h4,
                  fontWeight: "bold",
                  color: theme.textAlt,
                }}
              >
                Date & Time (Start)
              </Text>
              <View style={styles.dateAndTimePickerContainer}>
                <DateTimePicker
                  mode="date"
                  value={dateStart}
                  onValueChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setDateStart(selectedDate);
                    }
                  }}
                />
                <DateTimePicker
                  mode="time"
                  value={timeStart}
                  onValueChange={(_, selectedTime) => {
                    if (selectedTime) {
                      setTimeStart(selectedTime);
                    }
                  }}
                />
              </View>
            </View>
            {/* Date & Time (End) */}
            <View style={styles.field}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h4,
                  fontWeight: "bold",
                  color: theme.textAlt,
                }}
              >
                Date & Time (End)
              </Text>
              <View style={styles.dateAndTimePickerContainer}>
                <DateTimePicker
                  mode="date"
                  value={dateEnd}
                  onValueChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setDateEnd(selectedDate);
                    }
                  }}
                />
                <DateTimePicker
                  mode="time"
                  value={timeEnd}
                  onValueChange={(_, selectedTime) => {
                    if (selectedTime) {
                      setTimeEnd(selectedTime);
                    }
                  }}
                />
              </View>
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
                fontFamily={fonts.family}
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
                fontFamily={fonts.family}
                textColor={theme.text}
                placeholderTextColor={theme.iconSecondary}
                borderColor={theme.textAlt}
                multiline
                onChangeText={(text) => setInformation(text)}
              />
            </View>
            <View style={styles.createEventButton}>
              {isLoading ? (
                <ButtonBig
                  text="Loading..."
                  textColor={theme.iconSecondary}
                  backgroundColor={theme.iconAccent}
                  onButtonPress={() => {}}
                />
              ) : (
                <ButtonBig
                  icon={
                    <Lucide
                      name="plus"
                      color={theme.iconAccent}
                      size={fonts.sizes.h4}
                    />
                  }
                  text="Create Event"
                  textColor={theme.iconAccent}
                  backgroundColor={theme.iconPrimary}
                  onButtonPress={handleCreateEventButtonPress}
                />
              )}
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
  dateAndTimePickerContainer: {
    flexDirection: "row",
    gap: 0,
    alignItems: "center",
  },
});
