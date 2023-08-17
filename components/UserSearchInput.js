"use client";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/store/index";
import { setSearch } from "@/store/userSearchSlice";
import { userSearchApi } from "@/store/userSearchApi";
import UsersTable from "./UsersTable";
import PaginationButtons from "./PaginationButtons";

const UserSearchInput = () => {
  const dispatch = store.dispatch;
  const firstName = useSelector((state) => state.userSearch.search);
  let users = useSelector((state) => state.userSearch.startupUsers);
  let totalPages = useSelector((state) => state.userSearch.totalPages);

  const filtered_users = useSelector(
    (state) => state.userSearchApi.queries[`search("${firstName}")`]?.data
  );

  useEffect(() => {
    dispatch(userSearchApi.endpoints.search.initiate(firstName));
  }, [dispatch, firstName]);
  if (filtered_users) {
    users = filtered_users.items;
    totalPages = filtered_users.totalPages;
  }
  return (
    <div className="w-full flex flex-col">
      <section class="rounded-md shadow-mdmt-2 border border-solid border-gray-300 p-2">
        <h1 class="text-xl font-bold  capitalize text-center">Search Users</h1>
        <form>
          <div class="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-right align-middle"
                for="username"
              >
                First Name
              </label>
              <input
                id="username"
                type="text"
                value={firstName}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-right align-middle"
                for="email"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-right align-middle"
                for="middlename"
              >
                Middle Name
              </label>
              <input
                id="middlename"
                type="text"
                class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-right align-middle"
                for="usertype"
              >
                User Type
              </label>
              <select class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring">
                <option>Surabaya</option>
                <option>Jakarta</option>
                <option>Tangerang</option>
                <option>Bandung</option>
              </select>
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-right align-middle"
                for="date"
              >
                Date
              </label>
              <input
                id="date"
                type="date"
                class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-right align-middle"
                for="matchType"
              >
                Match Type
              </label>
              <select class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring">
                <option>Surabaya</option>
                <option>Jakarta</option>
                <option>Tangerang</option>
                <option>Bandung</option>
              </select>
            </div>
          </div>

          {/* button */}
          <div class="flex justify-end gap-2 mt-3">
            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Clear
            </button>
            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-gray-600">
              Search
            </button>
          </div>
        </form>
      </section>

      <Suspense fallback={<h1>Loading....</h1>}>
        <UsersTable users={users ?? []} />
        <PaginationButtons totalPages={totalPages} />
      </Suspense>
    </div>
  );
};

export default UserSearchInput;
