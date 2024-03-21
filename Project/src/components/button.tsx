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
      ? "px-12 py-4 w-fit font-medium "
      : "flex justify-center items-center rounded-full w-[50px] h-[50px] bg-light-text hover:bg-green text-white text-[32px] ";
  if (disabled) {
    className += "cursor-default text-light-text border-2 border-light-text";
  } else {
    if (variant === "normal") {
      className += "bg-light-green hover:bg-green text-white";
    } else if (variant === "danger") {
      className += "text-white bg-light-red hover:bg-red";
    }
  }
  return (
    <button
      disabled={disabled}
      className={className}
      onClick={!disabled ? onClick : () => {}}
    >
      {text}
    </button>
  );
}
