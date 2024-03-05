export function Button({
  text,
  onClick,
  variant,
}: {
  text: string;
  onClick?: () => void;
  variant: "normal" | "pseudo" | "danger" | "round";
}) {
  let className =
    variant !== "round"
      ? "cursor-pointer px-12 py-4 w-fit "
      : "cursor-pointer flex justify-center items-center rounded-full w-[50px] h-[50px] bg-light-text hover:bg-green text-white text-[32px] font-light";
  if (variant === "normal") {
    className += "bg-light-green hover:bg-green text-white";
  } else if (variant === "danger") {
    className += "bg-light-red hover:bg-red";
  } else if (variant === "pseudo") {
    className += "text-light-text border-2 border-light-text";
  }
  return (
    <div
      className={className}
      onClick={variant === "pseudo" ? onClick : () => {}}
    >
      {text}
    </div>
  );
}
