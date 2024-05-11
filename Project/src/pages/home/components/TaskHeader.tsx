import { useSelector } from "react-redux";
import { RootState, currentTask, getMode, taskPomodoroCount } from "store";

const modeColor = {
  prepare: "bg-gray",
  work: "bg-red",
  pause: "bg-light-green",
};

export function TaskHeader() {
  const mode = useSelector(getMode);
  const task = useSelector(currentTask);
  const pomodoroCount = useSelector((state: RootState) =>
    taskPomodoroCount(state, task.id)
  );

  return (
    <div
      className={`${modeColor[mode]} py-4 px-9 flex justify-between text-white`}
    >
      <div className="place-self-start">{task.name}</div>
      <div className="place-self-end">
        <span className="font-light">{`Помидор ${pomodoroCount}`}</span>
      </div>
    </div>
  );
}
