import { Suspense } from "react";
import PaginationButtons from "@/components/PaginationButtons";
import UsersTable from "@/components/UsersTable";
import { store } from "@/store";
import { setStartupUsers, setTotalPages } from "@/store/userSearchSlice";
import axios from "axios";
import UserSearchInput from "@/components/UserSearchInput";
import Providers from "@/context/Provider";
import Preloader from "@/components/Preloader";

// http://localhost:5148/api/User/Get/?PageNumber=1&PageSize=10
export async function getUsers(pageNumber, pageSize) {
  try {
    // const res = await fetch(
    //   `http://localhost:5148/api/User/Get?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    //   { cace: "no-store" }
    // );

    const res = await axios.get(
      `http://localhost:5148/api/User/Get?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    if (!res.status === 200) {
      //console.log(res);
      throw new Error("Unable to fetch data.");
    } else {
      //console.log(res.data);
    }
    return res;
  } catch (err) {
    console.log(err);
  }
}

export default async function UserList({ searchParams }) {
  const pageNumber = searchParams["pageNumber"] ?? "1";
  const pageSize = searchParams["pageSize"] ?? "20";

  const data = getUsers(pageNumber, pageSize);
  const users = await data;
  store.dispatch(setStartupUsers(users.data.items));
  store.dispatch(setTotalPages(users.data.totalPages));
  const _users = store.getState().userSearch.startupUsers;
  const _totalPages = store.getState().userSearch.totalPages;
  return (
    <>
      <Preloader users={_users} totalPages={_totalPages} />
      <Providers>
        <UserSearchInput />
      </Providers>
    </>
  );
}
