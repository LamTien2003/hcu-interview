import { useMemo, useRef, useState } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";

import {
  Button,
  Dialog,
  AddTaskForm,
  EditTaskForm,
  Table,
  SearchForm,
} from "@/components";
import AdditionalActionWrapper from "@/components/Home/AdditionalActionWrapper";
import useExportTasks from "@/hooks/useExportTasks";
import useGetTasks from "@/hooks/useGetTasks";

import { FilterCriteria, TaskStatus } from "@/types/common";
import styles from "./Home.module.css";

const Home = () => {
  const tableRef = useRef();
  const [filterCriteria, setFilterCriteria] = useState<
    FilterCriteria<{ role: string }>
  >({
    filters: {
      searchText: "",
      role: "",
    },
    paging: {
      page: 1,
      pageSize: 5,
    },
  });
  const [rowSelected, setRowSelected] = useState<number[]>([]);
  const { tasks, totalTasks, isTasksLoading } = useGetTasks(filterCriteria);
  const { onExportTasks, onExportTasksByFilter: onExportThisPage } =
    useExportTasks();

  const dataSource = useMemo(() => {
    return tasks.map(item => ({
      taskName: item.taskName,
      status: item.status,
      addons: (
        <Dialog
          content={
            <EditTaskForm task={item} setFilterCriteria={setFilterCriteria} />
          }
        >
          <Pencil2Icon className="cursor-pointer" />
        </Dialog>
      ),
    }));
  }, [tasks]);

  const columns = useMemo(
    () => [
      {
        label: "Status",
        key: "Status",
      },
      {
        label: "Task Name",
        key: "Task Name",
      },

      {
        label: "Action",
        key: "Action",
      },
    ],
    []
  );

  const statuses = useMemo<TaskStatus[]>(
    () => [...new Set(rowSelected.map(index => tasks[index].status))],
    [rowSelected, tasks]
  );

  console.log(statuses);
  const isMultiStatuses = useMemo(() => statuses.length !== 1, [statuses]);

  return (
    <div className={styles.wrapper}>
      <div className={styles["header"]}>
        <strong>HCU Interview</strong>
        <div className={styles["header-right"]}>
          <div className={styles["header-right__avatar"]}>avatar</div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles["main-head"]}>
          <strong>Tasks</strong>
          <div className={styles["main-head__action"]}>
            <Button color="gray" highContrast onClick={onExportTasks}>
              Export all tasks
            </Button>
            <Button
              color="gray"
              highContrast
              onClick={() => onExportThisPage(filterCriteria)}
            >
              Export this page
            </Button>
            <Dialog
              content={<AddTaskForm setFilterCriteria={setFilterCriteria} />}
            >
              <Button color="gray" highContrast>
                Add New Task
              </Button>
            </Dialog>
          </div>
        </div>

        <SearchForm setFilterCriteria={setFilterCriteria} />
        <Table
          isLoading={isTasksLoading}
          reference={tableRef}
          totalItems={totalTasks}
          dataSource={dataSource}
          columns={columns}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          rowSelected={rowSelected}
          setRowSelection={setRowSelected}
          additionalSection={
            !isMultiStatuses ? (
              <AdditionalActionWrapper
                status={statuses[0]}
                rowSelected={rowSelected.map(rowIndex => tasks[rowIndex]._id)}
                setFilterCriteria={setFilterCriteria}
                setRowSelection={setRowSelected}
              />
            ) : undefined
          }
        />
      </div>
    </div>
  );
};
export default Home;
