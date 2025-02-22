// import { configureStore } from "@reduxjs/toolkit";
// import formSlice from "./slices/formSlice";

// const store = configureStore({
//   reducer: {
//     form: formSlice,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import dashboardReducer from "./slices/dashboardSlice";
import userReducer from "./slices/userSlice";

export interface PersistedState {
  form: ReturnType<typeof formReducer>;
}

// Function to load state from localStorage
const loadState = (): PersistedState | undefined => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem("reduxState");
      return serializedState ? JSON.parse(serializedState) : undefined;
    }
  } catch (error) {
    console.error("Could not load state", error);
  }
  return undefined;
};

// Function to save state to localStorage
const saveState = (state: PersistedState) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("reduxState", serializedState);
    }
  } catch (error) {
    console.error("Could not save state", error);
  }
};
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    users: userReducer,
    dashboard: dashboardReducer,
    form: formReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
