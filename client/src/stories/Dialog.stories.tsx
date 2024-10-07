import type { Meta, StoryFn } from "@storybook/react";
import { Theme } from "@radix-ui/themes";
import "@/index.css";
import "@radix-ui/themes/styles.css";

import { Button, Dialog } from "@/components";

import DialogProps from "@/components/Dialog/Dialog.d";

const meta = {
  title: "Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

const Template: StoryFn<typeof Dialog> = (args: DialogProps) => {
  return (
    <Theme>
      <Dialog {...args} />
    </Theme>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: <Button>Click here</Button>,
  content: <div>test</div>,
};
