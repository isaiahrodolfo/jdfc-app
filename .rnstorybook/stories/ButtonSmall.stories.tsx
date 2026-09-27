import type { Meta, StoryObj } from "@storybook/react-native";

import { View } from "react-native";

import ButtonSmall from "../../src/components/buttons/ButtonSmall";

import NotesIcon from "../../assets/icons/NotesIndigo3.svg";
import PlayIcon from "../../assets/icons/PlayIndigo3.svg";

const meta = {
  title: "Example/ButtonSmall",
  component: ButtonSmall,
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
} satisfies Meta<typeof ButtonSmall>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Watch: Story = {
  args: {
    icon: PlayIcon,
    text: "Watch",
  },
};

export const Notes: Story = {
  args: {
    icon: NotesIcon,
    text: "Notes",
  },
};
