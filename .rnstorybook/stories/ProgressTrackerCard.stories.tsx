import type { Meta, StoryObj } from "@storybook/react-native";
import { Colors } from "../../src/constants/theme";

import { View } from "react-native";

import ProgressTrackerCard from "../../src/components/progress_tracker/ProgressTrackerCard";

const meta = {
  title: "Example/ProgressTrackerCard",
  component: ProgressTrackerCard,
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
} satisfies Meta<typeof ProgressTrackerCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PurplePrimary: Story = {
  args: {
    colorName: "purple",
    progressTrackerData: [
      {
        checkboxesData: [
          {
            date: 0,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 1,
            isChecked: false,
            isCurrent: false,
          },
          {
            date: 2,
            isChecked: false,
            isCurrent: false,
          },
          {
            date: 3,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 4,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 5,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 6,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 7,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 8,
            isChecked: true,
            isCurrent: true,
          },
        ],
        subtitles: ["6/7 complete!", "You can do this!"],
      },
      {
        checkboxesData: [
          {
            date: 0,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 1,
            isChecked: false,
            isCurrent: false,
          },
          {
            date: 2,
            isChecked: false,
            isCurrent: false,
          },
          {
            date: 3,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 4,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 5,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 6,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 7,
            isChecked: true,
            isCurrent: false,
          },
          {
            date: 8,
            isChecked: true,
            isCurrent: true,
          },
        ],
        subtitles: ["6/7 complete!", "You can do this!"],
      },
    ],
  },
};
