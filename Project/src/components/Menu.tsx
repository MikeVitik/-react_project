import { MenuIcon } from "./icons/menu";
import styles from "./menu.module.css";
export function Menu({ children }: React.PropsWithChildren) {
  return (
    <div className={styles["menu-button"]}>
      <div className={`flex items-center justify-center}`}>
        <MenuIcon />
      </div>
      <div className={styles["drop-down-menu"]}>{children}</div>
    </div>
  );
}
