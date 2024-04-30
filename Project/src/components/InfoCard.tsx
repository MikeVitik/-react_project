import { FC } from "react";

const BGColors = {
  inactive: "bg-light-gray",
  focus: "bg-light-focus",
  pause: "bg-light-pause",
  stop: "bg-light-stop",
};

const IconColors = {
  inactive: "stroke-gray",
  focus: "stroke-focus",
  pause: "stroke-pause",
  stop: "stroke-stop",
};
export const InfoCard = ({
  type,
  text,
  data,
  icon: Icon,
}: {
  type: keyof typeof BGColors;
  text: string;
  data: string;
  icon: FC<{ className: string }>;
}) => {
  return (
    <div className={`p-5 font-bold flex justify-between ${BGColors[type]}`}>
      <div className="flex flex-col place-content-between">
        <div className="">{text}</div>
        <div className="text-7xl">{data}</div>
      </div>
      <div className="m-2">
        <Icon className={IconColors[type]}></Icon>
      </div>
    </div>
  );
};
