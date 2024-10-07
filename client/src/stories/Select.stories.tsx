import * as yup from "yup";
import type { Meta, StoryFn } from "@storybook/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Theme } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import "@/index.css";
import "@radix-ui/themes/styles.css";

import { Button, Select } from "@/components";

import SelectProps from "@/components/Select/Select.d";

const selectOptions = [
  { label: "", value: "" },
  {
    label: "5",
    value: "5",
  },
  {
    label: "10",
    value: "10",
  },
  {
    label: "15",
    value: "15",
  },
];

const meta = {
  title: "Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

const Template: StoryFn<typeof Select> = (args: SelectProps) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      selectOption: selectOptions[0].value,
    },
  });
  return (
    <Theme>
      <form onSubmit={handleSubmit((data: any) => console.log(data))}>
        <Select
          {...args}
          control={control}
          name="selectOption"
          dataSource={selectOptions}
        />
      </form>
    </Theme>
  );
};

const TemplateRequired: StoryFn<typeof Select> = (args: SelectProps) => {
  const schema = yup
    .object({
      selectOption: yup.string().required("This field is not be empty"),
    })
    .required();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      selectOption: selectOptions[0].value,
    },
    resolver: yupResolver(schema),
  });

  return (
    <Theme>
      <form onSubmit={handleSubmit((data: any) => console.log(data))}>
        <Select
          {...args}
          control={control}
          name="selectOption"
          dataSource={selectOptions}
        />
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
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  name: "input",
  placeholder: "Primary Input",
  label: "Primary Input",
};

export const WithLabelRequired = TemplateRequired.bind({});
WithLabelRequired.args = {
  name: "input",
  placeholder: "Primary Input",
  label: "Primary Input",
};
