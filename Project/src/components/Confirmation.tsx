import { Button } from "./button";

export function Confirmation({
  text = "Удалить задачу?",
  visible = false,
  onVisibleChange,
  onConfirm,
}: {
  text?: string;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onConfirm: () => void;
}) {
  const classNames = [
    "bg-black bg-opacity-50 h-screen w-screen absolute top-0 left-0 z-10",
  ];
  if (!visible) {
    classNames.push("invisible");
  }
  const closeHandler = () => {
    onVisibleChange(false);
  };
  return (
    <div className={classNames.join(" ")}>
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-2 w-[350px] h-[175px] relative">
          <button
            className="absolute right-1 w-4 h-4 text-lg text-gray"
            onClick={closeHandler}
          >
            <div className="rotate-45">+</div>
          </button>
          <div className="flex flex-col items-center">
            <div className="text-text text-base font-normal py-6">{text}</div>
            <Button
              text="Удалить"
              variant="danger"
              onClick={() => {
                closeHandler();
                onConfirm?.();
              }}
            ></Button>
            <button
              className="font-light mt-2 hover:underline"
              onClick={() => {
                closeHandler();
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
