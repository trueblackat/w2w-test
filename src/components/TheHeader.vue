<script setup lang="ts">
import {RouteRecordRaw} from "vue-router";
import {useUsersStore} from "@/stores/users.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const usersStore = useUsersStore();
const { isLoading } = storeToRefs(usersStore);

interface Link {
  label: string;
  to: RouteRecordRaw['name'];
  isLoading: boolean;
}

const links = computed<Link[]>(() => ([
  {
    label: 'Врачи',
    to: 'Doctors',
    isLoading: isLoading.value.doctors,
  },
  {
    label: 'Медсестры',
    to: 'Nurses',
    isLoading: isLoading.value.nurses,
  },
]));
</script>

<template>
  <header class="header">
    <RouterLink
      v-for="link in links"
      :key="link.to"
      :class="[
        'button is-link',
        {
          'is-loading': link.isLoading,
        }
      ]"
      :active-class="!link.isLoading ? 'is-inverted' : ''"
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
