import {Doctor, Nurse} from "../types/Users.ts";

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Дядькина Дарья Николаевна',
    institution: 'cardio',
    isHeadOfInstitution: true,
    post: 'doctor',
  },
  {
    id: '2',
    name: 'Смирнов Сергей Петрович',
    institution: 'cardio',
    isHeadOfInstitution: false,
    post: 'doctor',
  }
];

export const nurses: Nurse[] = [
  {
    id: '3',
    name: 'Иванов Иван Иванович',
    institution: "surgery",
    post: 'nurse',
  }
];
