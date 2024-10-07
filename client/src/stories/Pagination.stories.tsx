import type { Meta, StoryFn } from "@storybook/react";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";
import "@/index.css";
import "@radix-ui/themes/styles.css";

import { Pagination } from "@/components";

import { FilterCriteria } from "@/types/common";
import PaginationProps from "@/components/Pagination/Pagination.d";

const rowsPerPage = [
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
  title: "Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;

const Template: StoryFn<typeof Pagination> = (args: PaginationProps) => {
  const [filterCriteria, setFilterCriteria] = useState<
    FilterCriteria<{ searchText: string }>
  >({
    filters: {
      searchText: "",
    },
    paging: {
      page: 1,
      pageSize: 5,
    },
  });
  return (
    <Theme>
      <Pagination
        {...args}
        rowsPerPage={rowsPerPage}
        totalItems={30}
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
      />
    </Theme>
  );
};

export const Default = Template.bind({});
Default.args = {};
