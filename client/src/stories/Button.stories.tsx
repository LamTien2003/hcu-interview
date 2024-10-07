import type { Meta, StoryFn } from "@storybook/react";
import { Theme } from "@radix-ui/themes";
import "@/index.css";
import "@radix-ui/themes/styles.css";

import Button from "@/components/Button/Button";

import ButtonProps, {
  ButtonSize,
  ButtonVariant,
} from "@/components/Button/Button.d";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: Object.values(ButtonSize),
    },
    variant: {
      control: "radio",
      options: Object.values(ButtonVariant),
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

const Template: StoryFn<typeof Button> = (args: ButtonProps) => {
  return (
    <Theme>
      <Button {...args} />
    </Theme>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.Small,
  variant: ButtonVariant.Outline,
  children: "Button Default",
  color: "violet",
};
