import type { Meta, StoryFn } from "@storybook/react";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";
import "@/index.css";
import "@radix-ui/themes/styles.css";

import { Table } from "@/components";

import { FilterCriteria } from "@/types/common";
import TableProps from "@/components/Table/Table.d";

const dataSource = [
  {
    _id: "670296a0959aaf6805b80921",
    taskName: "asdasd",
    status: "Completed",
  },
  {
    _id: "67029751224fbcc761e63e96",
    taskName: "123123444",
    status: "Completed",
  },
  {
    _id: "6703576047f325e28b2de16c",
    taskName: "asdasdasd",
    status: "Incomplete",
  },
  {
    _id: "6703576347f325e28b2de170",
    taskName: "12314234",
    status: "Incomplete",
  },
  {
    _id: "6703576547f325e28b2de174",
    taskName: "11111",
    status: "Incomplete",
  },
  {
    _id: "6703637e47f325e28b2de18d",
    taskName: "dofokdkf",
    status: "Incomplete",
  },
];

const columns = [
  {
    label: "Task ID",
    key: "id",
  },
  {
    label: "Status",
    key: "Status",
  },
  {
    label: "Task Name",
    key: "Task Name",
  },
];

const meta = {
  title: "Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

const Template: StoryFn<typeof Table> = (args: TableProps) => {
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
      <Table
        {...args}
        dataSource={dataSource}
        columns={columns}
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
      />
    </Theme>
  );
};

const SelectionTemplate: StoryFn<typeof Table> = (args: TableProps) => {
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
  const [rowSelected, setRowSelected] = useState<number[]>([]);

  return (
    <Theme>
      <Table
        {...args}
        dataSource={dataSource}
        columns={columns}
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
        rowSelected={rowSelected}
        setRowSelection={setRowSelected}
      />
    </Theme>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const TableLoading = Template.bind({});
TableLoading.args = {
  isLoading: true,
};

export const AdditionalSection = Template.bind({});
AdditionalSection.args = {
  additionalSection: (
    <div style={{ border: "1px solid red", padding: 10 }}>
      Additional Section here
    </div>
  ),
};

export const SelectionTable = SelectionTemplate.bind({});
SelectionTable.args = {};
