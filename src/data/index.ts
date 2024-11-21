import {Doctor, Institution, Nurse} from "../types/Users.ts";

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Дядькина Дарья Николаевна',
    institution: Institution.cardio,
    isHeadOfInstitution: true,
  },
  {
    id: 2,
    name: 'Смирнов Сергей Петрович',
    institution: Institution.cardio,
    isHeadOfInstitution: false,
  }
];

export const nurses: Nurse[] = [
  {
    id: 3,
    name: 'Иванов Иван Иванович',
    institution: Institution.surgery,
  }
];
