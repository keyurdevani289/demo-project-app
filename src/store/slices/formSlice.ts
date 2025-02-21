// src/store/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState, userData } from "../../types/types";
import SHA256 from "crypto-js/sha256";


const initialState: FormState = {
  users: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // This reducer can be used to update form data partially if needed.
    updateForm: (state, action: PayloadAction<Partial<userData>>) => {
      // Here you might want to update a specific user or form field.
      // This example returns a new state with merged payload.
      return { ...state, ...action.payload };
    },
    // New reducer to add a user to the users array
    addUser: (state, action: PayloadAction<userData>) => {
      const { password, ...rest } = action.payload;
      const hashedPassword = SHA256(password).toString();
      state.users.push({ ...rest, password: hashedPassword });
    },
  },
});

export const { updateForm, addUser } = formSlice.actions;
export default formSlice.reducer;
