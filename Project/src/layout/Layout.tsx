import { Link, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { NavItem } from "../components/NavItem";
import { PomodoroIcon } from "../components/icons/Pomodoro";
import { StatisticIcon } from "../components/icons/Statistic";

export function Layout() {
  return (
    <>
      <Header>
        <Link to="/">
          <div className="flex gap-3">
            <PomodoroIcon></PomodoroIcon>
            <NavItem>
              <span className="font-light text-2xl pt-1">pomodoro_box</span>
            </NavItem>
          </div>
        </Link>
        <Link to="/Statistic">
          <NavItem IconComponent={StatisticIcon}>
            <span className="pl-1 pt-1">Статистика</span>
          </NavItem>
        </Link>
      </Header>
      <div>
        <Outlet />
      </div>
    </>
  );
}
