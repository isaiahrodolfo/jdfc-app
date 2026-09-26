import type { Meta, StoryObj } from "@storybook/react-native";
import { Colors } from "../../src/constants/theme";

import { View } from "react-native";

import AnnouncementCard from "../../src/components/cards/AnnouncementCard";

const meta = {
  title: "Example/AnnouncementCard",
  component: AnnouncementCard,
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
} satisfies Meta<typeof AnnouncementCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GreenCompleted: Story = {
  args: {
    title: "Welcome to the JDFC App!",
    subtitle: "JDFC App",
    colorName: "accent",
  },
};
