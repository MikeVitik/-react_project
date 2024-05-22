import { useState } from "react";
import { useSelector } from "react-redux";
import {
  RootState,
  currentTask,
  decrementPomodoro,
  deleteTask,
  editTask,
  incrementPomodoro,
  selectCanDecrement,
  useAppDispatch,
} from "store";
import { Confirmation } from "../../../components/Confirmation";
import { Menu } from "../../../components/Menu";
import { MenuItem } from "../../../components/MenuItem";
import { DeleteIcon } from "../../../components/icons/delete";
import { EditIcon } from "../../../components/icons/edit";
import { MinusIcon } from "../../../components/icons/minus";
import { PlusIcon } from "../../../components/icons/plus";

export function TaskMenu({ taskId }: { taskId: number }) {
  const dispatch = useAppDispatch();
  const canDecrement = useSelector((state: RootState) =>
    selectCanDecrement(state, taskId)
  );
  const taskName = useSelector(currentTask).name;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Menu>
        <MenuItem
          IconComponent={PlusIcon}
          title={"Увеличить"}
          onClick={() => dispatch(incrementPomodoro(taskId))}
        ></MenuItem>
        <MenuItem
          IconComponent={MinusIcon}
          title={"Уменьшить"}
          disabled={!canDecrement}
          onClick={() => {
            dispatch(decrementPomodoro(taskId));
          }}
        ></MenuItem>
        <MenuItem
          IconComponent={EditIcon}
          title={"Редактировать"}
          onClick={() => {
            dispatch(editTask(taskId, taskName));
          }}
        ></MenuItem>
        <MenuItem
          IconComponent={DeleteIcon}
          title={"Удалить"}
          onClick={() => {
            setVisible(true);
          }}
        ></MenuItem>
      </Menu>
      <Confirmation
        visible={visible}
        onConfirm={() => {
          dispatch(deleteTask(taskId));
        }}
        onVisibleChange={(visible) => setVisible(visible)}
      ></Confirmation>
    </>
  );
}
