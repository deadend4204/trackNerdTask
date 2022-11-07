import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchVehicles } from "../actions/vehicleActions";
// import type { RootState } from "../../app/store";

// Define a type for the slice state
interface CounterState {
  value: number;
  name: string;
  error: string;
  loading: boolean;
  vehicleList: any[];
}

// Define the initial state using that type
const baseState: CounterState = {
  value: 1,
  name: "",
  error: "",
  loading: false,
  vehicleList: [],
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: baseState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVehicles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVehicles.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleList = action.payload;
      state.error = "";
    });
    builder.addCase(fetchVehicles.rejected, (state, action) => {
      state.loading = false;
      state.vehicleList = [];
      state.error =
        action.error?.message || "Error occurred while fetching vehicles list";
    });
  },
});

export const { increment, decrement, incrementByAmount, changeName } =
  counterSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
