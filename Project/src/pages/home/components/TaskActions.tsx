import { useDispatch } from "react-redux";
import { Button } from "../../../components/Button";
import { timerSlice } from "../../../store/slicies/timer-slice";

export function TaskActions() {
  const primaryActionName = "Старт";
  const secondaryActionName = "Стоп";
  const secondaryActionDisabled = true;
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center gap-8 pt-6 pb-24">
      <Button
        text={primaryActionName}
        onClick={() => {
          dispatch(timerSlice.actions.toggle());
        }}
        variant="normal"
      ></Button>
      <Button
        text={secondaryActionName}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        disabled={secondaryActionDisabled}
        variant="danger"
      ></Button>
    </div>
  );
}
