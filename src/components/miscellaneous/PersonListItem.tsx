import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PersonListItemProps = {
  imageUrl?: string;
  name: string;
  role?: string;
  isUser: boolean;
  isChecked?: boolean;
  onProfilePress: () => void;
};

export default function PersonListItem({
  imageUrl,
  name,
  role,
  isUser,
  isChecked,
  onProfilePress,
}: PersonListItemProps) {
  const { theme, fonts } = useTheme();

  return (
    <Pressable
      style={[
        styles.container,
        {
          borderBottomColor: theme.primaryAlt,
          borderBottomWidth: 1,
        },
      ]}
      onPress={onProfilePress}
    >
      <View style={styles.leftSideContainer}>
        <View style={styles.image}>{/* TODO: Image goes here */}</View>
        <View style={styles.nameAndYouContainer}>
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h5,
              fontWeight: "bold",
              color: theme.text,
            }}
          >
            {name}
          </Text>
          {isUser && (
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h5,
                fontStyle: "italic",
                color: theme.text,
              }}
            >
              (YOU)
            </Text>
          )}
        </View>
      </View>
      {role !== undefined && (
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h6,
            fontWeight: "bold",
            color: theme.accentGrayAlt,
          }}
        >
          {role}
        </Text>
      )}
      {isChecked !== undefined && (
        <View
          style={{
            // testing
            backgroundColor: "gray",
            height: 30,
            width: 30,
            borderRadius: "50%",
          }}
        ></View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330, // testing
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 10,
  },
  image: {
    borderRadius: "50%",
    backgroundColor: "red", // testing
    width: 42,
    height: 42,
  },
  leftSideContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  nameAndYouContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
