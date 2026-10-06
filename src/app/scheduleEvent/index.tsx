import Input from "@/components/miscellaneous/Input";
import { useTheme } from "@/contexts/ThemeContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ScheduleEventPage(title: string, eventId: string) {
  const { theme, fonts } = useTheme();

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
            value={"Life Group"}
            isEditable={false}
            placeholderText="Birthday"
            autoComplete="off"
            textColor={theme.text}
            placeholderTextColor={theme.iconSecondary}
            borderColor={theme.textAlt}
            onChangeText={() => {}}
          />
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
