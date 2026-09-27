import type { Meta, StoryObj } from "@storybook/react-native";

import { View } from "react-native";

import ButtonBig from "../../src/components/buttons/ButtonBig";

import CalendarIcon from "../../assets/icons/CalendarIndigo3.svg";

const meta = {
  title: "Example/ButtonBig",
  component: ButtonBig,
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
} satisfies Meta<typeof ButtonBig>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ScheduleEvent: Story = {
  args: {
    icon: CalendarIcon,
    text: "Schedule Event",
  },
};
