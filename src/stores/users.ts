import {defineStore} from "pinia";
import {Doctor, Nurse, User} from "../types/Users.ts";
import {computed, ref} from "vue";
import api from "../services/api";

export const useUsersStore = defineStore('users', () => {
  const isLoading = ref(false);
  const users = ref<User[]>([]);
  const doctors = computed<Doctor[]>(() => users.value.filter(user => user.post === 'doctor') as Doctor[]);
  const nurses = computed<Nurse[]>(() => users.value.filter(user => user.post === 'nurse') as Nurse[]);
  const activeUser = ref<Doctor | Nurse | null>(null);

  const getUsers = async () => {
    try {
      isLoading.value = true;

      users.value = await api.users.getUsers();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  const addUser = (user: Doctor | Nurse) => {
    users.value = [...users.value, user];
  }

  const editUser = (user: Doctor | Nurse) => {
    users.value = users.value.map(u => u.id === user.id ? user : u);
  }

  const removeUser = (user: Doctor | Nurse) => {
    users.value = users.value.filter(({id}) => id !== user.id);
  }

  return {
    isLoading,
    doctors,
    nurses,
    activeUser,

    getUsers,
    addUser,
    removeUser,
    editUser,
  };
})
