import { Pressable, StyleSheet, Text, View } from "react-native";

import ChevronDown from "@/assets/icons/ChevronDownWhite.svg";
import { useTheme } from "@/contexts/ThemeContext";
import DividingLine from "./DividingLine";

type DropdownSmallProps = {
  selections: string[];
  isOpen: boolean;
  indexSelected: number;
  onOpenPress: () => void;
  onClosePress: (selectedIndex: number) => void;
};

export default function DropdownSmall({
  selections,
  isOpen,
  indexSelected,
  onOpenPress,
  onClosePress,
}: DropdownSmallProps) {
  const { theme, fonts } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.accentGray,
          borderColor: theme.primary,
          borderWidth: 1,
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
                <View style={{ transform: [{ rotate: "180deg" }] }}>
                  <ChevronDown />
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
        <Pressable onPress={onOpenPress} style={styles.firstItemContainer}>
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
            {selections[indexSelected]}
          </Text>
          <ChevronDown />
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
  },
  item: {
    paddingVertical: 5,
  },
});
