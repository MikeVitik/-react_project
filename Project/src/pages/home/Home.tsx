import { Description } from "./components/Description";
import { TaskActions } from "./components/TaskActions";
import { TaskDescription } from "./components/TaskDescription";
import { TaskHeader } from "./components/TaskHeader";
import { Tasks } from "./components/Tasks";
import { Timer } from "./components/Timer";

export function Home() {
  return (
    <>
      <div className="grid grid-cols-home gap-4">
        <div>
          <Description></Description>
          <Tasks />
        </div>
        <div className="bg-light-gray">
          <TaskHeader />
          <Timer />
          <TaskDescription />
          <TaskActions />
        </div>
      </div>
    </>
  );
}
