import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./style.css";
import { ScheduleProvider } from "./schedules/ScheduleProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ScheduleProvider>
      <App />
    </ScheduleProvider>
  </React.StrictMode>
);
