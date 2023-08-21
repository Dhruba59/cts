"use client";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { store } from "@/store/index";
import { setPage, setSearch, setStartupUsers, setTotalPages } from "@/store/userSearchSlice";
import { userSearchApi } from "@/store/userSearchApi";
import UsersTable from "@/components/User/UsersTable";
import PaginationButtons from "@/components/PaginationButtons";

const UserSearchInput = () => {
  const router = useRouter();
  const dispatch = store.dispatch;
  const firstName = useSelector((state) => state.userSearch.search);
  let users = useSelector((state) => state.userSearch.startupUsers);
  let totalPages = useSelector((state) => state.userSearch.totalPages);
  const pageNumber = useSelector((state) => state.userSearch.page);

  const filtered_users = useSelector(
    (state) => state.userSearchApi.queries[`search(${JSON.stringify({firstName: firstName, pageNumber: pageNumber, pageSize: 20})})`]?.data
  );

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setPage(1));
    router.push(
      `/User/UserList/?pageNumber=${pageNumber}&pageSize=${20}`
    );
    dispatch(userSearchApi.endpoints.search.initiate({firstName: firstName, pageNumber: pageNumber, pageSize: 20}));    
  }

  const clearSearchInput = (e) => {
    e.preventDefault();
    router.push(
      `/User/UserList/?pageNumber=${pageNumber}&pageSize=${20}`
    );
    dispatch(setPage(1));
    dispatch(setSearch(""));
    dispatch(userSearchApi.endpoints.search.initiate({firstName: firstName, pageNumber: pageNumber, pageSize: 20}));
  }
  useEffect(() => {
    console.log(`dp: ${pageNumber}`)
    dispatch(userSearchApi.endpoints.search.initiate({firstName: firstName, pageNumber: pageNumber, pageSize: 20}));
  }, [pageNumber]);

  if (filtered_users) {
    console.log('from search page')
    users = filtered_users.items;
    totalPages = filtered_users.totalPages;

    store.dispatch(setStartupUsers(users));
    store.dispatch(setTotalPages(totalPages));
  }
  return (
    <div className="w-full flex flex-col dark:text-white">
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
                class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:outline-none focus:ring focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:outline-none focus:ring focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-right align-middle"
                for="usertype"
              >
                User Type
              </label>
              <select class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:outline-none focus:ring focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
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
                class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:outline-none focus:ring focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-right align-middle"
                for="matchType"
              >
                Match Type
              </label>
              <select class="h-8 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                <option>Surabaya</option>
                <option>Jakarta</option>
                <option>Tangerang</option>
                <option>Bandung</option>
              </select>
            </div>
          </div>

          {/* button */}
          <div class="flex justify-end gap-2 mt-3">
         
           <button onClick={clearSearchInput} class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
           Clear
         </button>
         <button onClick={handleSearch} class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-gray-600">
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
