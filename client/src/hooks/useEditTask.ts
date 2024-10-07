import { useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";

const useEditTask = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const onEditTask = async (data: any) => {
    const payload = {
      taskName: data.taskName,
      status: data?.status,
    };

    try {
      setIsLoading(true);
      const response = await axiosClient.patch(`tasks/${data._id}`, payload);
      callback();

      setIsLoading(false);
      toast.success("Edit Task Successfully");
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      throw error.message;
    }
  };
  return {
    onEditTask,
    isEditingTask: isLoading,
  };
};

export default useEditTask;
