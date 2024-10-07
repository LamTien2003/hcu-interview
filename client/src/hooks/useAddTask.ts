import { useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";

const useAddTask = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const onAddTask = async (data: any) => {
    const payload = {
      taskName: data.taskName,
      status: data?.status,
    };

    try {
      setIsLoading(true);
      const response = await axiosClient.post("tasks", payload);
      callback();
      setIsLoading(false);
      toast.success("Create Task Successfully");
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      throw error.message;
    }
  };
  return {
    onAddTask,
    isAddingTask: isLoading,
  };
};

export default useAddTask;
