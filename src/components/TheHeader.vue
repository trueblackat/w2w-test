<script setup lang="ts">
import {RouteRecordRaw, useRoute} from "vue-router";
const route = useRoute();

interface Link {
  label: string;
  to: RouteRecordRaw['name'];
}
const links: Link[] = [
  {
    label: 'Доктора',
    to: 'Doctors',
  },
  {
    label: 'Медсестры',
    to: 'Nurses',
  },
]
</script>

<template>
  <header class="header">
    <RouterLink
      v-for="link in links"
      :key="link.to"
      class="button is-link"
      active-class="is-inverted"
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
