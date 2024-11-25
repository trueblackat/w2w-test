<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useUsersStore} from "@/stores/users.ts";
import {Doctor} from "@/types/Users.ts";
import {getUsersInstitution, getUsersPost} from "../utils/users.ts";

const usersStore = useUsersStore();
const { removeUser } = usersStore;
const { isLoading, doctors } = storeToRefs(usersStore);
</script>

<template>
  <div class="page">
    <progress v-if="isLoading.doctors" class="progress is-primary" max="100"></progress>

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
          v-for="doctor in doctors as Doctor[]"
          :key="doctor.id"
        >
          <td>{{ doctor.name }}</td>
          <td>{{ getUsersPost(doctor) }}</td>
          <td>{{ getUsersInstitution(doctor)}}</td>
          <td>
            <button @click="removeUser(doctor)" class="delete is-medium"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
