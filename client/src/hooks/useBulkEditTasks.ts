import { useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";

import { TaskStatus } from "@/types/common";

interface Payload {
  listTask: string[];
  status: TaskStatus;
}

const statusPayload = {
  [TaskStatus.Completed]: TaskStatus.Incomplete,
  [TaskStatus.Incomplete]: TaskStatus.Completed,
};

const useBulkEditTasks = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const bulkEditTasks = async (data: Payload) => {
    const currentStatus = data?.status;

    const payload = {
      listTask: data.listTask,
      status: statusPayload[currentStatus],
    };

    try {
      setIsLoading(true);
      const response = await axiosClient.patch("tasks/bulkEdit", payload);
      console.log(payload);
      callback();
      setIsLoading(false);
      toast.success("Update Task Status Successfully");
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      throw error.message;
    }
  };
  return {
    isBulkEditing: isLoading,
    bulkEditTasks,
  };
};

export default useBulkEditTasks;
