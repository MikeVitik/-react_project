import { Button } from "../../../components/Button";
import { TaskItem } from "../../../components/TaskItem";
import { TaskMenu } from "../Home";

export function Tasks() {
  const pomodoroCount = 1;
  const taskName = "TODO";
  const fullTime = 25;
  return (
    <div className="w-3/4">
      <input
        className="my-5 py-4 px-9 bg-light-gray  font-light"
        type="text"
        placeholder="Название задачи"
      ></input>
      <Button text="Добавить" variant="normal"></Button>
      <div className="pt-6 w-full">
        <TaskItem pomodoroCount={pomodoroCount} taskName={taskName}>
          <TaskMenu />
        </TaskItem>
        <TaskItem pomodoroCount={pomodoroCount} taskName={taskName}>
          <TaskMenu />
        </TaskItem>
      </div>
      <div className="pt-4 text-light-text font-light border-light-text border-t">{`${fullTime} мин`}</div>
    </div>
  );
}
