import { Button } from "../../../components/Button";

export function Timer() {
  const currentTime = "25:00";
  return (
    <div className="pt-24 grid grid-cols-4 align-middle">
      <div className="col-start-2 col-span-2">
        <span className="font-extralight text-[150px] leading-[126px]">
          {currentTime}
        </span>
      </div>
      <div className="justify-self-start self-center pl-8">
        <Button variant="round" text="+"></Button>
      </div>
    </div>
  );
}
