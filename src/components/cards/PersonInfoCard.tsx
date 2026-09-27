import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

type PersonInfoCardProps = {
  phoneNumber: string;
  birthday: string;
  facebookLink: string;
  instagramLink: string;
};

type TextContainerProps = {
  icon: string;
  fieldName: string;
  fieldContent: string;
};

export default function PersonInfoCard({
  phoneNumber,
  birthday,
  facebookLink,
  instagramLink,
}: PersonInfoCardProps) {
  const { theme, fonts } = useTheme();

  const TextContainer = ({
    icon,
    fieldName,
    fieldContent,
  }: TextContainerProps) => {
    return (
      <View style={styles.textContainer}>
        <Text
          style={{
            color: theme.iconSecondary,
            fontSize: fonts.sizes.h5,
          }}
        >
          {icon}
        </Text>
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h5,
            color: theme.textAlt,
          }}
        >
          {fieldName}: {fieldContent}
        </Text>
        TextContainer
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryAlt }]}>
      <View style={styles.textColumns}>
        <TextContainer icon="ph" fieldName="Phone" fieldContent={phoneNumber} />
        <TextContainer icon="bc" fieldName="Birthday" fieldContent={birthday} />
        <TextContainer
          icon="fb"
          fieldName="Facebook Link"
          fieldContent={facebookLink}
        />
        <TextContainer
          icon="in"
          fieldName="Instagram Link"
          fieldContent={instagramLink}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 24,
  },
  textColumns: {
    gap: 8,
  },
  textContainer: {
    gap: 8,
    flexDirection: "row",
  },
});
