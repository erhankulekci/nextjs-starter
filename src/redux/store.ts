import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sidebarReducer from "@/redux/slices/sidebarSlice";
import customizationReducer from "@/redux/slices/customizationSlice";

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        customization: customizationReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
