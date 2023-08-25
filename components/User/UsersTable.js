import React from "react";

const UsersTable = ({ users }) => {
  return (
    <div class="w-full mt-4 overflow-auto shadow rounded mr-10 border border-gray-100 dark:bg-boxdark  text-black dark:text-white">
      <table class=" w-full bg-white dark:bg-boxdark table-auto">
        <thead class="bg-gray-800 text-black dark:text-white">
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
          {!users.length ? (
            <p>No data available</p>
          ) : (
            users.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 == 0 ? "bg-blue-50 dark:bg-boxdark " : "bg-pink-50 dark:bg-boxdark "
                } border-t border-gray-100`}
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
                  <a href="" className="text-blue-700">
                    Assign Sites
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
