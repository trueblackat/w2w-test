<script setup lang="ts">
import {RouteRecordRaw} from "vue-router";
import {useUsersStore} from "@/stores/users.js";
import {storeToRefs} from "pinia";

const usersStore = useUsersStore();
const { isLoading } = storeToRefs(usersStore);

interface Link {
  label: string;
  to: RouteRecordRaw['name'];
}

const links: Link[] = [
  {
    label: 'Врачи',
    to: 'Doctors',
  },
  {
    label: 'Медсестры',
    to: 'Nurses',
  },
];
</script>

<template>
  <header class="header">
    <RouterLink
      v-for="link in links"
      :key="link.to"
      :class="[
        'button is-link',
        {
          'is-loading': isLoading,
        }
      ]"
      :active-class="!isLoading ? 'is-inverted' : ''"
      :to="{ name: link.to }"
    >
      {{ link.label }}
    </RouterLink>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  gap: $base-gap;
  padding: $base-gap;
}
</style>
