import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface SidebarState {
    showSidebar?: boolean;
}

const initialState: SidebarState = {
    showSidebar: true
};

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setShowSidebar: (state, action: PayloadAction<boolean>) => {
            state.showSidebar = action.payload;
        }
    }
});

export const { setShowSidebar } = sidebarSlice.actions;

export const showSidebar = (state: RootState) => state.sidebar.showSidebar;

export default sidebarSlice.reducer;
