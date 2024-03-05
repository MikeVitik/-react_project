import { Button } from "../../../components/Button";

export function TaskActions() {
  const primaryActionName = "Старт";
  const secondaryActionName = "Стоп";
  const secondaryActionDisabled = true;

  return (
    <div className="flex justify-center gap-8 pt-6 pb-24">
      <Button
        text={primaryActionName}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        variant={"normal"}
      ></Button>
      <Button
        text={secondaryActionName}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        variant={secondaryActionDisabled ? "pseudo" : "danger"}
      ></Button>
    </div>
  );
}
