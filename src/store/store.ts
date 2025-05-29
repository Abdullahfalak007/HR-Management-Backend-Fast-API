import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice";
import attendanceReducer from "./slices/attendanceSlice";
import leaveReducer from "./slices/leaveSlice";
import projectReducer from "./slices/projectSlice";
import notificationReducer from "./slices/notificationSlice";
import userReducer from "./slices/userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      employees: employeeReducer,
      attendance: attendanceReducer,
      leaves: leaveReducer,
      projects: projectReducer,
      notifications: notificationReducer,
      users: userReducer,
    },
    // optional: add middleware, devTools, etc.
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
