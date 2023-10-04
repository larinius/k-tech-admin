import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { LocaleType } from '@/locales';

export type ThemeMode = 'dark' | 'light';
export type SidebarMode = 'vertical' | 'horizontal' | 'blend';

export interface AppConfigMode {
  collapsed: boolean;
  locale: LocaleType;
  themeMode: ThemeMode;
  sidebarMode: SidebarMode;
  color: string;
  selectedPost: number | null;
  editMode: boolean;
}

const initialState: AppConfigMode = {
  collapsed: false,
  locale: 'en-US',
  themeMode: 'light',
  sidebarMode: 'vertical',
  color: '#409eff',
  selectedPost: null,
  editMode: false,
};

export const appSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setAppCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setAppLocale: (state, action: PayloadAction<LocaleType>) => {
      state.locale = action.payload;
    },
    setAppThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setAppSidebarMode: (state, action: PayloadAction<SidebarMode>) => {
      state.sidebarMode = action.payload;
    },
    setAppColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<number>) => {
      state.selectedPost = action.payload;
    },
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;

      if (!action.payload) {
        state.selectedPost = null;
      }
    },
  },
});

export const {
  setAppCollapsed,
  setAppColor,
  setAppLocale,
  setAppSidebarMode,
  setAppThemeMode,
  setSelectedPost,
  setEditMode,
} = appSlice.actions;

export default appSlice.reducer;
