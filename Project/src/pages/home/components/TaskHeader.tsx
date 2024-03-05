const modeColor = {
  prepare: "bg-gray",
  work: "bg-red",
  pause: "bg-light-green",
};

export function TaskHeader({
  mode,
  taskName,
  pomodoroCount,
}: {
  mode: keyof typeof modeColor;
  taskName: string;
  pomodoroCount: number;
}) {
  return (
    <div
      className={`${modeColor[mode]} py-4 px-9 flex justify-between text-white`}
    >
      <div className="place-self-start">{taskName}</div>
      <div className="place-self-end">
        <span className="font-light">{`Помидор ${pomodoroCount}`}</span>
      </div>
    </div>
  );
}
