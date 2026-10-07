import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import DividingLine from "./DividingLine";

import { Lucide } from "@react-native-vector-icons/lucide";

type DropdownSmallProps = {
  isEditable?: boolean;
  selections: string[];
  isOpen: boolean;
  indexSelected: number;
  onOpenPress: () => void;
  onClosePress: (selectedIndex: number) => void;
};

export default function DropdownSmall({
  isEditable = true,
  selections,
  isOpen,
  indexSelected,
  onOpenPress,
  onClosePress,
}: DropdownSmallProps) {
  const nonEditableOpacity = 0.7;
  const { theme, fonts } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.accentGray,
          borderColor: theme.primary,
          borderWidth: 1,
          opacity: isEditable ? 1 : nonEditableOpacity,
        },
      ]}
    >
      {isOpen ? (
        selections.map((selection, index) => (
          <Pressable onPress={() => onClosePress(index)} key={index}>
            {index === 0 ? (
              <View style={styles.firstItemContainer}>
                <Text
                  style={[
                    styles.item,
                    {
                      fontFamily: fonts.family,
                      fontSize: fonts.sizes.h6,
                      color: theme.text,
                    },
                  ]}
                >
                  {selection}
                </Text>
                <View style={[styles.arrow, { opacity: isEditable ? 1 : 0 }]}>
                  <Lucide
                    name="chevron-up"
                    color={theme.iconAccentAlt}
                    size={fonts.sizes.h5}
                  />
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.item}>
                  <DividingLine color={theme.accentGraySecondary} />
                </View>
                <Text
                  style={[
                    styles.item,
                    {
                      fontFamily: fonts.family,
                      fontSize: fonts.sizes.h6,
                      color: theme.text,
                      paddingRight: 36,
                    },
                  ]}
                >
                  {selection}
                </Text>
              </View>
            )}
          </Pressable>
        ))
      ) : (
        <Pressable
          onPress={() => {
            if (isEditable) onOpenPress();
          }}
          style={styles.firstItemContainer}
        >
          <Text
            style={[
              styles.item,
              {
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h6,
                color: theme.text,
                opacity: isEditable ? 1 : nonEditableOpacity,
              },
            ]}
          >
            {selections[indexSelected]}
          </Text>
          <View style={[styles.arrow, { opacity: isEditable ? 1 : 0 }]}>
            <Lucide
              name="chevron-down"
              color={theme.iconAccentAlt}
              size={fonts.sizes.h5}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  firstItemContainer: {
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 36,
  },
  item: {
    paddingVertical: 5,
  },
  arrow: {
    position: "absolute",
    right: 8,
  },
});
