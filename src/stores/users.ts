import {defineStore} from "pinia";
import {Doctor, Nurse} from "../types/Users.ts";
import {computed, ref} from "vue";
import api from "../services/api";

export const useUsersStore = defineStore('users', () => {
  const isLoading = ref({
    doctors: false,
    nurses: false
  });
  const doctors = ref<Doctor[]>([]);
  const nurses = ref<Nurse[]>([]);
  const activeUser = ref<Doctor | Nurse | null>(null);

  const cantAddNewHeadOfCardio = computed(
    () => doctors.value
      .filter(({institution}) => institution === 'cardio')
      .some(({isHeadOfInstitution}) => isHeadOfInstitution));

  const cantAddNewHeadOfSurgery = computed(
    () => doctors.value
      .filter(({institution}) => institution === 'surgery')
      .some(({isHeadOfInstitution}) => isHeadOfInstitution));

  const getDoctors = async () => {
    try {
      isLoading.value.doctors = true;

      doctors.value = await api.users.getDoctors();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value.doctors = false;
    }
  }

  const getNurses = async () => {
    try {
      isLoading.value.nurses = true;

      nurses.value = await api.users.getNurses();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value.nurses = false;
    }
  }

  const removeUser = (user: Doctor | Nurse) => {
    if (user.post === 'doctor') {
      doctors.value = doctors.value.filter(({id}) => id !== user.id);
    } else {
      nurses.value = nurses.value.filter(({id}) => id !== user.id);
    }
  }

  return {
    isLoading,
    doctors,
    nurses,
    activeUser,

    cantAddNewHeadOfCardio,
    cantAddNewHeadOfSurgery,

    getDoctors,
    getNurses,
    removeUser,
  };
})
