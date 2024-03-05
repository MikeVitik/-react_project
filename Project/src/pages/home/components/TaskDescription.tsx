export function TaskDescription() {
  const taskNo = 1;
  const taskName = "Сверстать сайт";
  return (
    <div className="flex justify-center pt-4 font-light">
      <span className="font-light text-light-text">{`Задача ${taskNo}`}</span>
      <span className="text-light-text">&nbsp;-&nbsp;</span>
      <span>{taskName}</span>
    </div>
  );
}
