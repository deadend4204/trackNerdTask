import { createAsyncThunk } from "@reduxjs/toolkit";
import { _GET } from "../../services/axios.method";
import { API_URLS } from "../../utils/apiConstant";
import { ActionType } from "../types";

export const fetchVehicles = createAsyncThunk(ActionType.GET_VEHICLES, () => {
  return _GET(API_URLS.GET_VEHICLES).then((res) => res.data.data);
});
