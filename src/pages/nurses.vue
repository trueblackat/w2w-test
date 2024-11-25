<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useUsersStore} from "@/stores/users.ts";
import UsersTable from "@/components/shared/UsersTable.vue";

const usersStore = useUsersStore();
const { nurses } = storeToRefs(usersStore);
</script>

<template>
  <div class="page">
    <UsersTable :users="nurses" />
  </div>
</template>
