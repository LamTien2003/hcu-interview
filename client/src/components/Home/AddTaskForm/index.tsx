import * as yup from "yup";
import { Dialog as RadixDialog } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { TaskForm } from "@/components";
import useAddTask from "@/hooks/useAddTask";
import { TaskStatus } from "@/types/common";

const schema = yup
  .object({
    taskName: yup.string().required("Task name is not be empty"),
    status: yup.string().required(),
  })
  .required();

const AddTaskForm = ({
  setFilterCriteria,
}: {
  setFilterCriteria: (value: any) => void;
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      taskName: "",
      status: TaskStatus.Incomplete,
    },
    resolver: yupResolver(schema),
  });
  const { onAddTask, isAddingTask } = useAddTask(() => {
    setFilterCriteria({
      filters: {
        searchText: "",
        role: "",
      },
      paging: {
        page: 1,
        pageSize: 5,
      },
    });
    reset();
  });

  return (
    <form onSubmit={handleSubmit(onAddTask)}>
      <RadixDialog.Title>Add Task</RadixDialog.Title>
      <RadixDialog.Description size="2" mb="4">
        Task Details
      </RadixDialog.Description>

      <TaskForm
        isLoading={isAddingTask}
        control={control}
        handleSubmit={handleSubmit(onAddTask)}
      />
    </form>
  );
};

export default AddTaskForm;
