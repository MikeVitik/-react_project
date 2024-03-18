import { useSelector } from "react-redux";
import { Button } from "../../../components/Button";
import { getTimerValue } from "../../../store/slicies/timer-slice";

export function Timer() {
  const { m, s } = useSelector(getTimerValue);
  return (
    <div className="flex pt-24 font-extralight text-[150px] leading-[126px]">
      <div className="w-1/2 flex flex-row justify-end">
        <div>{m}</div>
      </div>
      <div className="leading-[50%]">:</div>
      <div className="w-1/2 flex items-center">
        <div className="w-[200px]">{s}</div>
        <Button variant="round" text="+"></Button>
      </div>
    </div>
  );
}
