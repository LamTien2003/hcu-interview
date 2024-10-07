import { Dialog, Spinner } from "@radix-ui/themes";
import { useMemo } from "react";

import { Button, Input, Select } from "@/components";

import { TaskStatus } from "@/types/common";
import { TaskFormProps } from "./TaskForm";
import styles from "./TaskForm.module.css";

const TaskForm = ({
  control,
  handleSubmit,
  isLoading = false,
}: TaskFormProps) => {
  const statusList = useMemo(
    () =>
      Object.entries(TaskStatus).map(([key, value]) => ({
        label: key,
        value,
      })),
    []
  );

  return (
    <>
      {isLoading ? (
        <div className={styles["loading"]}>
          <Spinner />
        </div>
      ) : (
        <div className={styles["task"]}>
          <div className={styles["task"]}>
            <div className={styles["task__info"]}>
              <Input
                control={control}
                name="taskName"
                placeholder="Task Name"
                label="Task Name"
              />

              <Select
                label="Status"
                control={control}
                name="status"
                dataSource={statusList}
                placeholder="Select Status"
                size="2"
              />
            </div>
            <div className="d-flex gap--12">
              <Button color="gray" highContrast onSubmit={handleSubmit}>
                Save
              </Button>
              <Dialog.Close>
                <Button size="2" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskForm;
