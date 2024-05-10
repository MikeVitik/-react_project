import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureAppStore, generateStatistics, updateTime } from "store";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const store = configureAppStore(
  {
    statisticInfo: generateStatistics(),
  },
  document.getElementById("alarm") as HTMLAudioElement
);

(window as any).TIME_RATIO = 25;
(window as any).TIME_STOP = false;

let prevTime = Date.now();
setInterval(() => {
  if ((window as any).TIME_STOP) return;
  const delta = Date.now() - prevTime;
  prevTime = Date.now();
  if (
    store.getState().timer.state === "running" ||
    store.getState().timer.state === "pause"
  ) {
    store.dispatch(updateTime(delta * ((window as any).TIME_RATIO || 25)));
  }
}, 500);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/pomodoro">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
