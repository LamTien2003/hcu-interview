import { Dialog as RadixDialog } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TaskForm } from "@/components";
import useEditTask from "@/hooks/useEditTask";

import EditTaskFormProps from "./EditTaskForm.d";

const schema = yup
  .object({
    taskName: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

const EditTaskForm = ({ task, setFilterCriteria }: EditTaskFormProps) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      ...task,
    },
    resolver: yupResolver(schema),
  });

  const { onEditTask, isEditingTask } = useEditTask(() => {
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
  });

  return (
    <form onSubmit={handleSubmit(onEditTask)}>
      <RadixDialog.Title>Edit Task</RadixDialog.Title>
      <RadixDialog.Description size="2" mb="4">
        Task Details
      </RadixDialog.Description>

      <TaskForm
        isLoading={isEditingTask}
        control={control}
        handleSubmit={handleSubmit(onEditTask)}
      />
    </form>
  );
};

export default EditTaskForm;
