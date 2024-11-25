import users from "../../data";
import httpClient from "./httpClient.ts";
import {User} from "../../types/Users.ts";

export const getUsers = () => httpClient.get<User[]>('').then(() => users);
