import axios from "axios";
import Preloader from "@/components/Preloader";

export async function getUsers({ firstName, pageNumber, pageSize }) {
  try {
    const res = await axios.get(
      `http://localhost:5148/api/User/Get?pageNumber=${pageNumber}&pageSize=${pageSize}&firstName=${firstName}`
    );

    if (!res.status === 200) {
      // console.log(res);
      throw new Error("Unable to fetch data.");
    } else {
      //console.log(res.data);
    }
    return res;
  } catch (err) {
    console.log(err);
  }
}

export default async function UsersTable({ searchParams }) {
  const pageNumber = searchParams["pageNumber"] ?? "1";

  const pageSize = searchParams["pageSize"] ?? "10";
  const firstName = searchParams["firstName"] ?? "";

  const res = await getUsers({
    firstName: firstName,
    pageNumber: pageNumber,
    pageSize: pageSize
  });

  console.log(res);
  if (!res) {
    return (
      <>
        <p>No data available...</p>
      </>
    );
  }
  const users = res.data.items;
  const totalPages = res.data.totalPages;
  //console.log({ totalPages: totalPages });
  return (
    <>
      <Preloader totalPages={totalPages} />
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
              <tr>
                <td>
                  <p>No data available</p>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 == 0
                      ? "bg-blue-50 dark:bg-boxdark "
                      : "bg-pink-50 dark:bg-boxdark "
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
    </>
  );
}
