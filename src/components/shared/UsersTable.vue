<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useUsersStore} from "@/stores/users.ts";
import {Doctor, Nurse, User} from "@/types/Users.ts";
import eventBus from "@/services/EventBus.ts";
import {getUsersInstitution, getUsersPost} from "@/utils/users.ts";

defineProps<{
  users: Doctor[] | Nurse[];
}>();

const usersStore = useUsersStore();
const { removeUser } = usersStore;
const { isLoading, activeUser } = storeToRefs(usersStore);

const editUser = (user: User) => {
  activeUser.value = user;

  eventBus.emit('openUserDetailsModal');
}
</script>

<template>
  <progress v-if="isLoading" class="progress is-primary" max="100"></progress>

  <table v-else class="table is-striped is-hoverable is-fullwidth">
    <thead>
    <tr>
      <th>ФИО</th>
      <th>Должность</th>
      <th>Отделение</th>
      <th></th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="user in users"
      :key="user.id"
      @click="editUser(user)"
    >
      <td>{{ user.name }}</td>
      <td>{{ getUsersPost(user) }}</td>
      <td>{{ getUsersInstitution(user)}}</td>
      <td>
        <button @click.stop="removeUser(user)" class="delete is-medium"></button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
