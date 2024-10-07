import { Control, UseFormHandleSubmit } from "react-hook-form";

export interface TaskFormProps {
  handleSubmit: UseFormHandleSubmit;
  control: Control<any>;
  isLoading?: boolean;
}
