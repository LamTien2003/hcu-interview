import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";
import { buildQueryString } from "@/utils/helper";

import { FilterCriteria, Task } from "@/types/common";

const useGetTasks = (filterCriteria: FilterCriteria<{ role: string }>) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchApi = async () => {
        setIsLoading(true);
        console.log(filterCriteria);
        const queryString = buildQueryString({
          ...filterCriteria.filters,
          ...filterCriteria.paging,
        });

        const response = await axiosClient.get(`/tasks?${queryString}`);
        setTasks(response?.data?.data || []);
        setTotalTasks(response?.data?.totalItems || 0);
        setIsLoading(false);
      };
      fetchApi();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  }, [filterCriteria]);

  return {
    tasks,
    totalTasks,
    isTasksLoading: isLoading,
  };
};

export default useGetTasks;
