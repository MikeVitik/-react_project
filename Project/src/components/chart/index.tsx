import { useState } from "react";
import { Bars } from "./Bars";
import { Days } from "./Days";
import { AxesInteval, AxisLines } from "./Line";

const INTERVAL = 25;

export const Chart = ({
  selectedDay = 1,
  onSelectDayChanged,
  values = [25, 50, 75, 0, 100, 95, 210],
}: {
  selectedDay?: number;
  onSelectDayChanged?: (selectedDay: number) => void;
  values?: number[];
}) => {
  let currentSelectDay = selectedDay;
  const [internalSelectDay, setSelectDay] = useState(selectedDay);
  let internalOnSelectDayChanged =
    onSelectDayChanged !== undefined ? onSelectDayChanged : setSelectDay;
  if (onSelectDayChanged === undefined) {
    currentSelectDay = internalSelectDay;
  }
  const maxValue = Math.max.apply(null, values);
  const intervalCount = Math.floor(maxValue / INTERVAL) + 1;
  const maxYAxisValue = intervalCount * INTERVAL;
  const minInPercent = 100 / maxYAxisValue;
  const intervalAxis = 100 / intervalCount;
  return (
    <div
      className="h-full min-w-72 min-h-72 grid grid-rows-2"
      style={{
        gridTemplateRows: "1fr auto",
      }}
    >
      <div className="relative grid grid-cols-8 justify-items-center items-end">
        <Bars
          values={values}
          currentSelectDay={currentSelectDay}
          minInPercent={minInPercent}
          internalOnSelectDayChanged={internalOnSelectDayChanged}
        />
        <div className="absolute -z-10 w-full h-full bg-light-gray"></div>
        <AxesInteval
          intervalCount={intervalCount}
          intervalAxis={intervalAxis}
          interval={INTERVAL}
        />
        <AxisLines
          intervalCount={intervalCount}
          intervalAxis={intervalAxis}
        ></AxisLines>
      </div>
      <Days selectedDay={currentSelectDay}></Days>
    </div>
  );
};
