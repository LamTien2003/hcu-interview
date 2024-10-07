import { useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "@/services/axiosClient";
import { buildQueryString, downloadFile } from "@/utils/helper";

import { FilterCriteria } from "@/types/common";

const useExportTasks = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onExportTasks = async () => {
    try {
      setIsLoading(true);
      const response = (await axiosClient.get("tasks/downloadExcel", {
        responseType: "blob",
      })) as BlobPart;
      downloadFile(response, "Tasks");

      toast.success("Export Tasks Successfully");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      throw error.message;
    }
  };

  const onExportTasksByFilter = async (filterCriteria: FilterCriteria<any>) => {
    try {
      setIsLoading(true);
      const queryString = buildQueryString({
        ...filterCriteria.filters,
        ...filterCriteria.paging,
      });
      const response = (await axiosClient.get(
        `tasks/downloadExcel?${queryString}`,
        {
          responseType: "blob",
        }
      )) as BlobPart;
      downloadFile(response, "Tasks");

      toast.success("Export Tasks Successfully");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
      throw error.message;
    }
  };

  return {
    onExportTasks,
    onExportTasksByFilter,
    isExportingTasks: isLoading,
  };
};

export default useExportTasks;
