export function Button({
  text,
  onClick,
  disabled = false,
  variant,
}: {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant: "normal" | "danger" | "round";
}) {
  let className =
    variant !== "round"
      ? "px-12 py-4 w-fit "
      : "cursor-pointer flex justify-center items-center rounded-full w-[50px] h-[50px] bg-light-text hover:bg-green text-white text-[32px] font-light";
  if (disabled) {
    className += "cursor-default text-light-text border-2 border-light-text";
  } else {
    if (variant === "normal") {
      className += "cursor-pointer bg-light-green hover:bg-green text-white";
    } else if (variant === "danger") {
      className += "cursor-pointer bg-light-red hover:bg-red";
    }
  }
  return (
    <div className={className} onClick={!disabled ? onClick : () => {}}>
      {text}
    </div>
  );
}
