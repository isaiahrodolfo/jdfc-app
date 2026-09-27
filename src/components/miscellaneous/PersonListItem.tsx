import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

type PersonListItemProps = {
  imageUrl?: string;
  name: string;
  role?: string;
  isChecked?: boolean;
};

export default function PersonListItem({
  imageUrl,
  name,
  role,
  isChecked,
}: PersonListItemProps) {
  const { theme, fonts } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme.primaryAlt,
          borderBottomWidth: 1,
        },
      ]}
    >
      <View style={styles.leftSideContainer}>
        <View style={styles.image}>{/* TODO: Image goes here */}</View>
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
    </View>
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
});
