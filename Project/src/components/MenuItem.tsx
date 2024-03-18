export function MenuItem({
  IconComponent,
  title,
  disabled,
  onClick,
}: {
  IconComponent: React.FunctionComponent<{ className: string }>;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const currentDisable = disabled || !onClick;
  return (
    <div
      className={`flex justify-center px-4 py-2 font-light ${
        currentDisable ? "cursor-default" : "cursor-pointer hover:bg-light-gray"
      }`}
      onClick={() => {
        !currentDisable && onClick();
      }}
    >
      <div className="flex items-center justify-center">
        <IconComponent
          className={`${
            currentDisable ? "text-light-text" : "text-light-green"
          }`}
        />
      </div>
      <div className="grow px-3 text-light-text font-light">{title}</div>
    </div>
  );
}
