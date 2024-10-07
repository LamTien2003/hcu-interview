import { Task } from "@/types/common";

export default interface EditTaskFormProps {
  task: Task;
  setFilterCriteria: (value: any) => void;
}
