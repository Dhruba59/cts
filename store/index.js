import { configureStore } from "@reduxjs/toolkit";
import userSearchSlice from "@/store/userSearchSlice";
import { userSearchApi } from "@/store/userSearchApi";
export const store = configureStore({
  reducer: {
    userSearch: userSearchSlice,
    userSearchApi: userSearchApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(userSearchApi.middleware);
  }
});
