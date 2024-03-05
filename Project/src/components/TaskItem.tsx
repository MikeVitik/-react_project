export function TaskItem({
  taskName,
  pomodoroCount,
  children,
}: React.PropsWithChildren<{
  taskName: string;
  pomodoroCount: number;
}>) {
  return (
    <div className="flex justify-center py-5 font-light border-light-text border-t">
      <div className="rounded-full border-light-text border w-6 h-6 flex items-center justify-center">
        {pomodoroCount}
      </div>
      <div className="grow px-3">{taskName}</div>
      {children}
    </div>
  );
}
