import { useSelector } from "react-redux";
import { taskActions, useAppDispatch } from "store";
import { Button } from "../../../components/button";

export const TaskActions = () => {
  const {
    primaryActionName,
    secondaryActionName,
    primaryAction,
    secondaryAction,
  } = useSelector(taskActions);

  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center gap-8 pt-6 pb-24">
      <Button
        text={primaryActionName}
        onClick={primaryAction ? () => dispatch(primaryAction()) : undefined}
        variant="normal"
      ></Button>
      <Button
        text={secondaryActionName}
        onClick={
          secondaryAction ? () => dispatch(secondaryAction()) : undefined
        }
        variant="danger"
      ></Button>
    </div>
  );
};
