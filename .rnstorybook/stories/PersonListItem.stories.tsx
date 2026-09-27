import type { Meta, StoryObj } from "@storybook/react-native";
import { Colors } from "../../src/constants/theme";

import { View } from "react-native";

import PersonListItem from "../../src/components/miscellaneous/PersonListItem";

const meta = {
  title: "Example/PersonListItem",
  component: PersonListItem,
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
} satisfies Meta<typeof PersonListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Role: Story = {
  args: {
    name: "Person Name",
    role: "Leader",
  },
};

export const CheckboxChecked: Story = {
  args: {
    name: "Person Name",
    isChecked: true,
  },
};
