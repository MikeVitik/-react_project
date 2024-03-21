import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Button } from "../components/Button";
import { Confirmation } from "../components/Confirmation";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Confirmation",
  component: Confirmation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  render: (props) => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button
          text="show confirmation"
          variant="normal"
          onClick={() => {
            console.log("setVisible");
            setVisible(true);
          }}
        />
        <Confirmation
          {...props}
          visible={visible}
          onVisibleChange={(value) => setVisible(value)}
        />
      </>
    );
  },
  args: {
    onConfirm: fn(),
  },
} satisfies Meta<typeof Confirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {} as any,
};
