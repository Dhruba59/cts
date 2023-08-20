import React from "react";

const UsersTable = ({ users }) => {
  return (
    <div class="w-full mt-4 overflow-scroll shadow rounded mr-10 border-b border-gray-200">
      <table class="w-full bg-white table-auto">
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
          {!users.length ? (
            <p>No data available</p>
          ) : (
            users.map((user, index) => (
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
