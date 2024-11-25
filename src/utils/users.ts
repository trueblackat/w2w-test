import {Doctor, Institution, Nurse, Post} from "../types/Users.ts";

export const getPostTranslate = (post: Post, isHeadOfInstitution: Doctor['isHeadOfInstitution'] = false) => {
  switch (post) {
    case 'nurse':
      return 'медсестра';
    case 'doctor':
      return isHeadOfInstitution ? 'главврач' : 'врач';
    default:
      throw new Error('Неизвестная должность!');
  }
}
export const getInstituteTranslate = (institution: Institution) => {
  switch (institution) {
    case 'cardio':
      return 'кардиология';
    case 'surgery':
      return 'хирургия';
    default:
      throw new Error('Неизвестное отделение!');
  }
}

export const getUsersPost = (user: Doctor | Nurse) => getPostTranslate(
  user.post,
  user.post === 'doctor' && user.isHeadOfInstitution,
);

export const getUsersInstitution = (user: Doctor | Nurse) => getInstituteTranslate(user.institution);
