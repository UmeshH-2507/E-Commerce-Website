import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "../../models/AuthSlice";

interface LoginProps {
  phone: string;
  otp: string;
}

const initialState: AuthSlice = {
  isLoggedIn: localStorage.getItem("phone") !== null && localStorage.getItem("phone") !== "",
  modalOpen: false,
  phone: localStorage.getItem("phone") ?? "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
    doLogin: (state, action: PayloadAction<LoginProps>) => {
      if (action.payload.phone === "8050570067" && action.payload.otp === "000000") {
        localStorage.setItem("phone", "8050570067");
        state.phone = "8050570067";
        state.modalOpen = false;
        state.isLoggedIn = true;
      }
    },
    doLogout: (state) => {
      localStorage.removeItem("phone");
      state.phone = "";
      state.isLoggedIn = false;
    },
  },
});

export const { updateModal, doLogin, doLogout } = authSlice.actions;
export default authSlice.reducer;