<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import {onMounted} from "vue";
import {useUsersStore} from "@/stores/users.ts";
import TheFooter from "@/components/TheFooter.vue";

const usersStore = useUsersStore();
const { getDoctors, getNurses } = usersStore;

onMounted(() => {
  getDoctors();
  getNurses();
})
</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>
