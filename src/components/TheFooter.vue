<script setup lang="ts">
import UserDetails from "@/components/shared/UserDetails.vue";
import {ref} from "vue";

const isCEModalShowed = ref(false);
</script>

<template>
  <footer class="footer">
    <button class="button is-success" @click="isCEModalShowed = true">
      Добавить сотрудника
    </button>

    <UserDetails v-model="isCEModalShowed" />
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: $base-gap;
}
</style>
