export function AxesInteval({
  intervalCount,
  intervalAxis,
  interval,
}: {
  intervalCount: number;
  intervalAxis: number;
  interval: number;
}) {
  return (
    <div className="place-self-start pl-4 w-20">
      {Array(intervalCount)
        .fill(0, 1)
        .map((_, index) => (
          <div
            key={index}
            className={`absolute  bg-light-gray`}
            style={{
              top: `${Math.floor(100 - intervalAxis * index)}%`,
            }}
          >
            <div className="-mt-3">{index * interval}&nbsp;мин</div>
          </div>
        ))}
    </div>
  );
}

export const AxisLines = ({
  intervalCount,
  intervalAxis,
}: {
  intervalCount: number;
  intervalAxis: number;
}) => {
  return (
    <div className="flex absolute w-full h-full -z-10">
      <div className="relative" style={{ width: "calc(100%* 7 / 8)" }}>
        {Array(intervalCount)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={`absolute -z-10 w-full bg-light-gray`}
              style={{ top: `${Math.floor(100 - intervalAxis * index)}%` }}
            >
              <div className="flex-grow border-t border-gray h-0.5 pt-1"></div>
            </div>
          ))}
      </div>
    </div>
  );
};
