import { weekDays } from "./const";

export function Days({ selectedDay }: { selectedDay: number }) {
  return (
    <div className="bg-light-dark grid grid-cols-8 justify-items-center">
      {weekDays.map((day, i) => {
        const color = selectedDay === i ? "text-light-red" : "text-black";
        return (
          <div key={day} className={color}>
            {day}
          </div>
        );
      })}
    </div>
  );
}
