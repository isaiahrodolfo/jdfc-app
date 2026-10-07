import { useTheme } from "@/contexts/ThemeContext";
import Feather from "@react-native-vector-icons/feather";
import Lucide from "@react-native-vector-icons/lucide";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type PersonInfoCardProps = {
  phoneNumber?: string;
  birthday?: string;
  facebookLink?: string;
  instagramLink?: string;
};

type TextContainerProps = {
  icon: ReactNode;
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
        {icon}
        <Text
          style={{
            fontFamily: fonts.family,
            fontSize: fonts.sizes.h6,
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
        {phoneNumber && (
          <TextContainer
            icon={
              <Lucide
                name="phone"
                size={fonts.sizes.h5}
                color={theme.iconSecondary}
              />
            }
            fieldName="Phone"
            fieldContent={phoneNumber}
          />
        )}

        {birthday && (
          <TextContainer
            icon={
              <Lucide
                name="cake"
                size={fonts.sizes.h5}
                color={theme.iconSecondary}
              />
            }
            fieldName="Birthday"
            fieldContent={birthday}
          />
        )}

        {facebookLink && (
          <TextContainer
            icon={
              <Feather
                name="facebook"
                size={fonts.sizes.h5}
                color={theme.iconSecondary}
              />
            }
            fieldName="Facebook Link"
            fieldContent={facebookLink}
          />
        )}

        {instagramLink && (
          <TextContainer
            icon={
              <Feather
                name="instagram"
                size={fonts.sizes.h5}
                color={theme.iconSecondary}
              />
            }
            fieldName="Instagram Link"
            fieldContent={instagramLink}
          />
        )}
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
