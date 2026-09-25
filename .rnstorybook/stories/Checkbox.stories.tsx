import type { Meta, StoryObj } from "@storybook/react-native";

import { View } from "react-native";

import Checkbox from "../../src/components/progress_tracker/Checkbox";

const meta = {
  title: "Example/Checkbox",
  component: Checkbox,
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
  //   args: { onPress: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    isChecked: true,
  },
};

export const Not_Checked: Story = {
  args: {
    isChecked: false,
  },
};
