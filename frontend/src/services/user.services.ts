import { message } from "antd";
import { AxiosInstance } from "axios";

import User, {
  UserResponse,
  UsersResponse,
  defaultUser
} from "@/types/user.type";

/**
 * Retrieves a specific user from backend by its ID.
 *
 * @param client The axios client to retrieve data from.
 * @param id The ID of the user object to retrieve.
 *
 * @returns Promise of user object.
 */
export async function fetchUser(client: AxiosInstance, id: string) {
  try {
    const response = await client.get<UserResponse>(
      `/user/${id}`,
      { withCredentials: true }, // route is protected; must use credentials
    );
    const { __v, password, ...rest } = response.data.data;
    const user: User = { ...rest };
    return user;
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving user: ${err}`);
    return defaultUser;
  }
};

/**
 * Retrieve all users from backend.
 *
 * @param client The axios client to retrieve data from.
 *
 * @returns Promise of list of users.
 */
export async function fetchUsers(client: AxiosInstance) {
  try {
    const responses = await client.get<UsersResponse>(
      '/user',
      { withCredentials: true }, // route is protected; must use credentials
    );
    return responses.data.data.map(response => {
      const { __v, password, ...rest } = response;
      const user: User = { ...rest };
      return user;
    });
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving users: ${err}`);
    return [];
  }
};
