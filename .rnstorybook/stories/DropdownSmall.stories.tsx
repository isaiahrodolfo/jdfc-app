import type { Meta, StoryObj } from "@storybook/react-native";

import { View } from "react-native";

import DropdownSmall from "../../src/components/miscellaneous/DropdownSmall";

const meta = {
  title: "Example/DropdownSmall",
  component: DropdownSmall,
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
} satisfies Meta<typeof DropdownSmall>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    selections: ["selection 1", "selection 2", "selection 3"],
    isOpen: true,
    indexSelected: 0,
  },
};

export const ClosedZeroIndexSelected: Story = {
  args: {
    selections: ["selection 1", "selection 2", "selection 3"],
    isOpen: false,
    indexSelected: 0,
  },
};

export const ClosedTwoIndexSelected: Story = {
  args: {
    selections: ["selection 1", "selection 2", "selection 3"],
    isOpen: false,
    indexSelected: 2,
  },
};
