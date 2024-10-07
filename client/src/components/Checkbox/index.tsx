import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { DividerHorizontalIcon, CheckIcon } from "@radix-ui/react-icons";

import styles from "./Checkbox.module.css";

const Checkbox = ({
  onCheckedChange,
  checked,
}: {
  onCheckedChange: (checked: RadixCheckbox.CheckedState) => void;
  checked: boolean | string;
}) => {
  return (
    <RadixCheckbox.Root
      className={styles["CheckboxRoot"]}
      onCheckedChange={onCheckedChange}
      checked={!!checked}
    >
      <RadixCheckbox.Indicator className={styles["CheckboxIndicator"]}>
        {checked === "indeterminate" && <DividerHorizontalIcon />}
        {checked === true && <CheckIcon />}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
};

export default Checkbox;
