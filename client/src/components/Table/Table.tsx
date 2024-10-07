import { Table as RadixTable, Spinner } from "@radix-ui/themes";

import { Pagination } from "@/components";
import Checkbox from "@/components/Checkbox";

import styles from "./Table.module.css";
import TableProps from "./Table.d";

const rowsPerPage = [
  {
    label: "5",
    value: "5",
  },
  {
    label: "10",
    value: "10",
  },
  {
    label: "15",
    value: "15",
  },
];

const Table = ({
  totalItems,
  filterCriteria,
  setFilterCriteria,
  columns,
  dataSource,
  rowSelected,
  setRowSelection,
  additionalSection,
  reference,
  isLoading,
}: TableProps) => {
  const onCheckedChange = (value: any) => {
    if (!setRowSelection) return;

    if (rowSelected?.includes(value)) {
      return setRowSelection((prev: number[]) =>
        prev.filter(item => item !== value)
      );
    }

    return setRowSelection((prev: number[]) => [...prev, value]);
  };

  const onCheckedAll = () => {
    if (!setRowSelection) return;

    if (rowSelected?.length !== dataSource.length) {
      return setRowSelection([...Array(dataSource.length).keys()]);
    }
    return setRowSelection([]);
  };

  return (
    <div className={styles["wrapper"]} ref={reference}>
      <RadixTable.Root size="2">
        <RadixTable.Header>
          <RadixTable.Row>
            {setRowSelection && (
              <RadixTable.ColumnHeaderCell
                key={"select-all"}
                className={styles["header-column"]}
                align="center"
                width="30px"
              >
                <Checkbox
                  checked={rowSelected?.length === dataSource.length}
                  onCheckedChange={onCheckedAll}
                />
              </RadixTable.ColumnHeaderCell>
            )}
            {columns.map(column => (
              <RadixTable.ColumnHeaderCell
                key={column.key}
                className={styles["header-column"]}
              >
                <div className="d-flex align-center gap--12">
                  <span>{column.label}</span>
                  <span className={styles["header-column__addon"]}>
                    {column?.addon}
                  </span>
                </div>
              </RadixTable.ColumnHeaderCell>
            ))}
          </RadixTable.Row>
        </RadixTable.Header>

        <RadixTable.Body>
          {!isLoading &&
            dataSource.map((row: any, index: number) => {
              return (
                <RadixTable.Row key={index}>
                  {setRowSelection && (
                    <RadixTable.RowHeaderCell align="center" width="10px">
                      <Checkbox
                        checked={!!rowSelected?.includes(index)}
                        onCheckedChange={() => onCheckedChange(index)}
                      />
                    </RadixTable.RowHeaderCell>
                  )}
                  {Object.values(row).map((value: any, index) => (
                    <RadixTable.RowHeaderCell key={`${value}-${index}`}>
                      {value}
                    </RadixTable.RowHeaderCell>
                  ))}
                </RadixTable.Row>
              );
            })}
        </RadixTable.Body>
      </RadixTable.Root>

      {isLoading && (
        <div className={styles["loading"]}>
          <Spinner />
        </div>
      )}
      {!isLoading && dataSource.length === 0 && (
        <div className={styles["loading"]}>There are no result</div>
      )}

      <div className={styles["bottom"]}>
        <div>{additionalSection}</div>
        <Pagination
          rowsPerPage={rowsPerPage}
          filterCriteria={filterCriteria}
          totalItems={totalItems}
          setFilterCriteria={setFilterCriteria}
        />
      </div>
    </div>
  );
};

export default Table;
