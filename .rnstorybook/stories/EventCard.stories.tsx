import type { Meta, StoryObj } from "@storybook/react-native";
import { Colors } from "../../src/constants/theme";

import { View } from "react-native";

import EventCard from "../../src/components/cards/EventCard";

const meta = {
  title: "Example/EventCard",
  component: EventCard,
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
} satisfies Meta<typeof EventCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrayerService: Story = {
  args: {
    title: "Prayer Service",
    date: "September 30, 2026",
    time: "7:00 pm",
    location: "Jesus’ Disciples Family Church",
    colorName: "prayerService",
  },
};
