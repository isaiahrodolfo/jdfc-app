import type { Meta, StoryObj } from "@storybook/react-native";
import { Colors } from "../../src/constants/theme";

import { View } from "react-native";

import LessonCard from "../../src/components/LessonCard";

const meta = {
  title: "Example/LessonCard",
  component: LessonCard,
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          backgroundColor: Colors.dark.primary,
        }}
      >
        <Story />
      </View>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  //   args: { onPress: fn() },
} satisfies Meta<typeof LessonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GreenCompleted: Story = {
  args: {
    isCompleted: true,
    colorName: "green",
    size: "big",
    descriptionHeading: "September 12, 2026",
    descriptionSubheading: "Today",
    titleSubheading: "Week 1: Learning From Our Mistakes",
    titleHeading: "The Best Deal Of Your Life",
  },
};
