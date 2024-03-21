import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Confirmation } from "../../../components/Confirmation";
import { Menu } from "../../../components/Menu";
import { MenuItem } from "../../../components/MenuItem";
import { DeleteIcon } from "../../../components/icons/Delete";
import { EditIcon } from "../../../components/icons/Edit";
import { MinusIcon } from "../../../components/icons/Minus";
import { PlusIcon } from "../../../components/icons/Plus";
import { editTask } from "../../../store/slicies/task-editor";
import {
  decrementPomodoro,
  deleteTask,
  getTaskIndex,
  incrementPomodoro,
  selectCanDecrement,
} from "../../../store/slicies/tasks-slice";
import { RootState } from "../../../store/store";

export function TaskMenu({ taskId }: { taskId: number }) {
  const dispatch = useDispatch();
  const canDecrement = useSelector((state: RootState) =>
    selectCanDecrement(state, taskId)
  );
  const taskName = useSelector((state: RootState) => {
    return state.tasks[getTaskIndex(state, taskId)].name;
  });
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
