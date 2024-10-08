import { message } from "antd";
import { AxiosInstance } from "axios";

import User, {
  ExtendUser,
  UserResponse,
  UsersResponse,
  defaultUser
} from "@/types/user.type";

export const USER_ROUTE = '/user/';

export function cleanUser(extendUser: ExtendUser) {
  const { __v, password, ...rest } = extendUser;
  const user: User = rest;
  return user;
};

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
      `${USER_ROUTE}${id}`,
      { withCredentials: true },
    );
    return cleanUser(response.data.data);
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
      USER_ROUTE,
      { withCredentials: true },
    );
    return responses.data.data.map(cleanUser);
  }
  catch (err) {
    message.error('Something went wrong. Please try again later.');
    console.error(`Error while retrieving users: ${err}`);
    return [];
  }
};
