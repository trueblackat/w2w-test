import {doctors, nurses} from "../../data";
import httpClient from "./httpClient.ts";
import {Doctor, Nurse} from "../../types/Users.ts";

export const getDoctors = () => httpClient.get<Doctor[]>('').then(() => doctors);

export const getNurses = () => httpClient.get<Nurse[]>('').then(() => nurses);
