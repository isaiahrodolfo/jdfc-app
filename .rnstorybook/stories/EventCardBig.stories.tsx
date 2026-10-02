import type { Meta, StoryObj } from "@storybook/react-native";

import { View } from "react-native";

import EventCardBig from "../../src/components/cards/EventCardBig";

const meta = {
  title: "Example/EventCardBig",
  component: EventCardBig,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        <Story />
      </View>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  // args: { onPress: fn() },
} satisfies Meta<typeof EventCardBig>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SundayServiceWithSubtitle: Story = {
  args: {
    title: "Sunday Service",
    subtitle: "17th Anniversary Service",
    livestreamLink: "youtube.com",
  },
};

export const SundayServiceWithoutSubtitle: Story = {
  args: {
    title: "Sunday Service",
    subtitle: "",
    livestreamLink: "youtube.com",
  },
};
