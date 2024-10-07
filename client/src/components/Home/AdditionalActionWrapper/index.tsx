import Button from "@/components/Button/Button";
import useBulkEditTasks from "@/hooks/useBulkEditTasks";
import { TaskStatus } from "@/types/common";
import { Spinner } from "@radix-ui/themes";

const AdditionalActionWrapper = ({
  status,
  setRowSelection,
  rowSelected,
  setFilterCriteria,
}: {
  status: TaskStatus;
  rowSelected: string[];
  setRowSelection: (value: any) => void;
  setFilterCriteria: (value: any) => void;
}) => {
  const { isBulkEditing, bulkEditTasks } = useBulkEditTasks(() => {
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
    setRowSelection([]);
  });

  const onClickBulkEdit = () =>
    bulkEditTasks({ listTask: rowSelected, status });

  return (
    <div>
      {isBulkEditing ? (
        <Spinner />
      ) : (
        <>
          {status === TaskStatus.Completed && (
            <div>
              <Button variant="outline" onClick={onClickBulkEdit}>
                Incomplete
              </Button>
            </div>
          )}
          {status === TaskStatus.Incomplete && (
            <Button variant="outline" onClick={onClickBulkEdit}>
              Completed
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default AdditionalActionWrapper;
