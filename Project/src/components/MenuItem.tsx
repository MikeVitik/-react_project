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
  return (
    <div
      className={`flex justify-center px-4 py-2 font-light ${
        disabled ? "" : "hover:bg-light-gray"
      }`}
    >
      <div className="flex items-center justify-center">
        <IconComponent
          className={`${disabled ? "text-light-text" : "text-light-green"}`}
        />
      </div>
      <div className="grow px-3 text-light-text font-light">{title}</div>
    </div>
  );
}
