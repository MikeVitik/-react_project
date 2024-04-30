import { useSelector } from "react-redux";
import { currentTask, getMode } from "store";

const modeColor = {
  prepare: "bg-gray",
  work: "bg-red",
  pause: "bg-light-green",
};

export function TaskHeader() {
  const mode = useSelector(getMode);
  const task = useSelector(currentTask);

  return (
    <div
      className={`${modeColor[mode]} py-4 px-9 flex justify-between text-white`}
    >
      <div className="place-self-start">{task.name}</div>
      <div className="place-self-end">
        <span className="font-light">{`Помидор ${task.pomodoroCount}`}</span>
      </div>
    </div>
  );
}
