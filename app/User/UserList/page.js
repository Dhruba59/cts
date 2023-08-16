import { Suspense } from "react";
import PaginationButtons from "@/components/PaginationButtons";

// http://localhost:5148/api/User/Get/?PageNumber=1&PageSize=10
export async function getUsers(pageNumber, pageSize) {
  const res = await fetch(
    `http://localhost:5148/api/User/Get?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  if (!res.ok) {
    throw new Error("failed to fetch");
  }

  return res.json();
}

export default async function UserList({ searchParams }) {
  const pageNumber = searchParams["pageNumber"] ?? "1";
  const pageSize = searchParams["pageSize"] ?? "20";

  const userdata = getUsers(pageNumber, pageSize);
  const users = await userdata;
  const totalPages = users.totalPages;
  return (
    <div className="w-full flex flex-col">
      <section class=" w-[80vw] rounded-md shadow-mdmt-2">
        <h1 class="text-xl font-bold  capitalize">Search Users</h1>
        <form>
          <div class="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-2">
            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-center align-middle"
                for="username"
              >
                First Name:
              </label>
              <input
                id="username"
                type="text"
                class="h-10 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-center align-middle"
                for="email"
              >
                Email:
              </label>
              <input
                id="email"
                type="text"
                class="h-10 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-center align-middle"
                for="middlename"
              >
                Middle Name:
              </label>
              <input
                id="middlename"
                type="text"
                class="h-10 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-center align-middle"
                for="usertype"
              >
                User Type:
              </label>
              <select class="h-10 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring">
                <option>Surabaya</option>
                <option>Jakarta</option>
                <option>Tangerang</option>
                <option>Bandung</option>
              </select>
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-1 py-1 text-center align-middle"
                for="date"
              >
                Date
              </label>
              <input
                id="date"
                type="date"
                class="h-10 w-9/12 px-1 py-1 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-row gap-1">
              <label
                class="w-3/12 px-4 py-2 text-center align-middle"
                for="matchType"
              >
                Match Type:
              </label>
              <select class="h-10 w-9/12 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500  focus:outline-none focus:ring">
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
        <div class="w-full mt-4 overflow-scroll shadow rounded mr-10 border-b border-gray-200">
          <table class="bg-white table-auto w-full">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  First Name
                </th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Last Name
                </th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Email
                </th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  System Login
                </th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  User Type
                </th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Sponsor
                </th>

                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Match Type
                </th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Assigned Sites
                </th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              {users.items.map((user, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}
                >
                  <td class="text-left py-2 px-2">{user.firstName}</td>
                  <td class="text-left py-2 px-2">{user.lastName}</td>
                  <td class="text-left py-2 px-2">
                    <a
                      class="hover:text-blue-500"
                      href="mailto:jonsmith@mail.com"
                    >
                      {user.email}
                    </a>
                  </td>
                  <td class="text-left py-2 px-2">{user.userName}</td>
                  <td class="text-left py-2 px-2">{user.userName}</td>
                  <td class="text-left py-2 px-2">{user.userName}</td>
                  <td class="text-left py-2 px-2">{user.userName}</td>
                  <td class="text-left py-2 px-2 text-blue-900">
                    <a href="">Assign Sites</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationButtons totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
