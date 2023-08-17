"use client";

import { useRef } from "react";
import { store } from "@/store";
import { setStartupUsers, setTotalPages } from "@/store/userSearchSlice";

function Preloader({ users, totalPages }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setStartupUsers(users));
    store.dispatch(setTotalPages(totalPages));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
