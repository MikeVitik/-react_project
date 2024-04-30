export function Bars({
  values,
  currentSelectDay,
  minInPercent,
  internalOnSelectDayChanged,
}: {
  values: number[];
  currentSelectDay: number;
  minInPercent: number;
  internalOnSelectDayChanged: (selectedDay: number) => void;
}) {
  return (
    <>
      {values.map((value, i) => {
        const color = currentSelectDay === i ? "bg-red" : "bg-light-red";
        if (value !== 0) {
          return (
            <div
              key={i}
              className={`${color} w-1/2`}
              style={{ height: value * minInPercent + "%" }}
              onClick={() => {
                internalOnSelectDayChanged(i);
              }}
            ></div>
          );
        } else {
          return <div key={i} className="bg-gray h-1 w-1/2"></div>;
        }
      })}
    </>
  );
}
