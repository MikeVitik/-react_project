import type { Meta, StoryObj } from "@storybook/react";
import { InfoCard } from "../components/InfoCard";
import { PauseIcon } from "../components/icons/Pause";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/InfoCard",
  component: InfoCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    //    text: { defaultValue: "Button" },
    // variant: { defaultValue: "danger" },
    // backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { type: "pause", data: "35%" },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Inactive: Story = {
  args: { type: "inactive", text: "Фокус", data: "0%", icon: PauseIcon },
};

export const Focus: Story = {
  args: { type: "focus", text: "Фокус", data: "35%", icon: PauseIcon },
};

export const Pause: Story = {
  args: {
    type: "pause",
    text: "Время на паузе",
    data: "9м",
    icon: PauseIcon,
  },
};
