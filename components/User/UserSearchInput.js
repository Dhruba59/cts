/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { store } from "@/store/index";
import {
  setPage,
  setSearch,
  setStartupUsers,
  setTotalPages
} from "@/store/userSearchSlice";
import { userSearchApi } from "@/store/userSearchApi";
import PaginationButtons from "@/components/PaginationButtons";
import axios from "axios";

export async function getUsers({ firstName, pageNumber, pageSize }) {
  try {
    const res = await axios.get(
      `http://localhost:5148/api/User/Get?pageNumber=${pageNumber}&pageSize=${pageSize}&firstName=${firstName}`
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

const UserSearchInput = ({ children }) => {
  const router = useRouter();
  const dispatch = store.dispatch;
  //const firstName = useSelector((state) => state.userSearch.search);
  //let users = useSelector((state) => state.userSearch.startupUsers);
  console.log("UserSearchInput");
  //const [users, setUsers] = useState(null);
  //const [totalPages, setTotalPages] = useState(ttlp);
  const [firstName, setFirstName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toggle, setToggle] = useState(false);
  const [remountComponent, setRemountComponent] = useState(0);
  // const filtered_users = useSelector(
  //   (state) =>
  //     state.userSearchApi.queries[
  //       `search(${JSON.stringify({
  //         firstName: firstName,
  //         pageNumber: pageNumber,
  //         pageSize: 20
  //       })})`
  //     ]?.data
  // );

  const handleSearch = (e) => {
    e.preventDefault();

    router.push(
      `/UserList/?pageNumber=${1}&pageSize=${10}&firstName=${firstName}`
    );

    setPageNumber(1);
    setToggle((prev) => !prev);

    // dispatch(setPage(1));
    // router.push(`/User/UserList/?pageNumber=${pageNumber}&pageSize=${20}`);
    // dispatch(
    //   userSearchApi.endpoints.search.initiate({
    //     firstName: firstName,
    //     pageNumber: pageNumber,
    //     pageSize: 20
    //   })
    // );
  };

  const clearSearchInput = (e) => {
    e.preventDefault();

    router.push(`/UserList/?pageNumber=${1}&pageSize=${20}`);

    setFirstName("");
    setPageNumber(1);
    setToggle((prev) => !prev);

    // dispatch(
    //   userSearchApi.endpoints.search.initiate({
    //     firstName: firstName,
    //     pageNumber: pageNumber,
    //     pageSize: 20
    //   })
    // );
  };

  useEffect(() => {
    console.log(`dp: ${pageNumber}`);
    router.push(
      `/UserList/?pageNumber=${pageNumber}&pageSize=${10}&firstName=${firstName}`
    );
    if (pageNumber === 1) {
      setRemountComponent(Math.random());
    }
  }, [pageNumber, toggle]);

  // useEffect(() => {
  //   router.push(`/User/UserList/?pageNumber=${pageNumber}&pageSize=${20}`);
  // });

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
                onChange={(e) => setFirstName(e.target.value)}
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
            <button
              onClick={clearSearchInput}
              class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Clear
            </button>
            <button
              onClick={handleSearch}
              class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-gray-600"
            >
              Search
            </button>
          </div>
        </form>
      </section>
      {children}
      <div key={remountComponent}>
        <PaginationButtons
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
};

export default UserSearchInput;
