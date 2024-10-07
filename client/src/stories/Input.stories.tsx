import * as yup from "yup";
import type { Meta, StoryFn } from "@storybook/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Theme } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import "@/index.css";
import "@radix-ui/themes/styles.css";

import { Button, Input } from "@/components";

import { InputProps } from "@/components/Input/Input.d";

const meta = {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["text", "textarea"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

const Template: StoryFn<typeof Input> = (args: InputProps) => {
  const { handleSubmit, control } = useForm<{
    searchText: "";
  }>({
    defaultValues: {
      searchText: "",
    },
  });
  return (
    <Theme>
      <form onSubmit={handleSubmit((data: any) => console.log(data))}>
        <Input {...args} control={control} name="searchText" />
      </form>
    </Theme>
  );
};

const TemplateRequired: StoryFn<typeof Input> = (args: InputProps) => {
  const schema = yup
    .object({
      searchText: yup.string().required("This field is not be empty"),
    })
    .required();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      searchText: "",
    },
    resolver: yupResolver(schema),
  });
  return (
    <Theme>
      <form onSubmit={handleSubmit((data: any) => console.log(data))}>
        <Input {...args} control={control} name="searchText" />
        <Button
          color="gray"
          highContrast
          onSubmit={handleSubmit(data => console.log(data))}
          style={{ marginTop: 12 }}
        >
          Submit
        </Button>
      </form>
    </Theme>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: "input",
  placeholder: "Primary Input",
  type: "text",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  name: "input",
  placeholder: "Primary Input",
  label: "Primary Input",
  type: "text",
};

export const WithLabelRequired = TemplateRequired.bind({});
WithLabelRequired.args = {
  name: "input",
  placeholder: "Primary Input",
  label: "Primary Input",
  type: "text",
};
