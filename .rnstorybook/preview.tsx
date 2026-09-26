import type { Preview } from "@storybook/react-native";
import { ThemeProvider } from "../src/contexts/ThemeContext"; // Adjust path to match your layout

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // Add the decorators property here to wrap every individual story screen
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
