import { PropsWithChildren } from "react";

export function NavItem({
  IconComponent,
  children,
}: PropsWithChildren<{
  IconComponent?: React.FC<{ className?: string }>;
}>) {
  return (
    <div className="font-light text-light-red hover:text-red flex items-center">
      {IconComponent && <IconComponent className="size-4 m-1" />}
      {children}
    </div>
  );
}
