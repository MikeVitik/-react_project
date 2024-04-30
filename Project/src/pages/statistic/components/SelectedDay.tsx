const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];
export const SelectedDay = ({
  workTime,
  selectedDay,
}: {
  workTime: number;
  selectedDay: number;
}) => {
  return (
    <div className="p-6 bg-light-gray h-[260px]">
      <div className="font-bold">{days[selectedDay]}</div>
      <div className="text-base">
        Вы работали над задачами в течение&nbsp;
        <span className="text-light-red">
          {Math.floor(workTime) + " минут(ы)"}
        </span>
      </div>
    </div>
  );
};
