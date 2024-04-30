import { useSelector } from "react-redux";
import { currentTask } from "store";

export function TaskDescription() {
  const task = useSelector(currentTask);
  return (
    <div className="flex justify-center pt-4 font-light">
      {task ? (
        <>
          <span className="font-light text-light-text">Задача</span>
          <span className="text-light-text">&nbsp;-&nbsp;</span>
          <span>{task.name}</span>
        </>
      ) : (
        <span className="font-light text-light-text">&nbsp;</span>
      )}
    </div>
  );
}
