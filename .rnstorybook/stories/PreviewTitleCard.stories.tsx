import type { Meta, StoryObj } from "@storybook/react-native";
import { Colors } from "../../src/constants/theme";

import { View } from "react-native";

import PreviewTitleCard from "../../src/components/cards/PreviewTitleCard";

const meta = {
  title: "Example/PreviewTitleCard",
  component: PreviewTitleCard,
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
} satisfies Meta<typeof PreviewTitleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LifeGroup: Story = {
  args: {
    title: "Life Group",
    date: "September 25, 2026",
    time: "7:00 pm",
    location: "Address",
    colorName: "accentOpposite",
  },
};

export const VBS: Story = {
  args: {
    title: "VBS Day 1",
    category: "VBS",
    date: "June 25, 2027",
    time: "7:00 am",
    location: "Address",
    colorName: "accentOpposite",
  },
};
