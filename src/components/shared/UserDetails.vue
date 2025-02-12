<script setup lang="ts">
import {Doctor, Institution, Nurse, Post} from "@/types/Users.ts";
import {computed, onMounted, reactive, ref, toRaw, watch} from "vue";
import generateId from "@/utils/generateId.ts";
import {getInstituteTranslate, getPostTranslate} from "@/utils/users.ts";
import {useUsersStore} from "@/stores/users.ts";
import {storeToRefs} from "pinia";
import eventBus from "@/services/EventBus.ts";

const usersStore = useUsersStore();
const {addUser, editUser} = usersStore;
const { activeUser } = storeToRefs(usersStore);

const isVisible = defineModel();

const hiddenSubmit = ref<HTMLButtonElement>();
const save = () => {
  hiddenSubmit.value?.click(); // for default validation
}

interface Option<T> {
  value: T;
  label: string;
}
const postOptions = ref<Option<Post>[]>([
  {
    label: getPostTranslate('doctor'),
    value: 'doctor',
  },
  {
    label: getPostTranslate('nurse'),
    value: 'nurse',
  }
]);
const institutionOptions = ref<Option<Institution>[]>([
  {
    label: getInstituteTranslate('cardio'),
    value: 'cardio',
  },
  {
    label: getInstituteTranslate('surgery'),
    value: 'surgery',
  }
]);

const isEditMode = computed(() => !!activeUser.value);
const isCreateMode = computed(() => !isEditMode.value);

const user = reactive<Doctor | Nurse>({
  name: '',
  post: '',
  institution: '',
  isHeadOfInstitution: false,
});
const initUser = () => {
  user.id = isEditMode.value ? activeUser.value?.id : generateId();
  user.name = isEditMode.value ? activeUser.value?.name : '';
  user.post = isEditMode.value ? activeUser.value?.post : '';
  user.institution = isEditMode.value ? activeUser.value?.institution : '';
  user.isHeadOfInstitution = isEditMode.value ? activeUser.value?.isHeadOfInstitution : false;
}

const onSubmit = () => {
  if (isEditMode.value) {
    editUser(structuredClone(toRaw(user)));
  } else {
    addUser(structuredClone(toRaw(user)));
  }

  close();
}

const close = () => {
  isVisible.value = false;
  activeUser.value = null;

  delete user.id;
  user.name = '';
  user.post = '';
  user.institution = '';
  user.isHeadOfInstitution = false;
}

onMounted(() => {
  initUser();

  eventBus.on('openUserDetailsModal', () => {
    isVisible.value = true;
    initUser();
  });
})

watch(
  () => user,
  () => {
    if (isCreateMode.value) {
      user.isHeadOfInstitution = false;
    }
  },
  {
    deep: true,
  }
)
</script>

<template>
  <div
    :class="[
      'modal',
      {
        'is-active': isVisible,
      }
    ]">
    <div class="modal-background"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ isEditMode ? 'Редактировать сотрудника' : 'Добавить сотрудника' }}
        </p>

        <button @click="close" class="delete" aria-label="close"></button>
      </header>

      <section class="modal-card-body">
        <form class="user-details" @submit.prevent="onSubmit">
          <input required v-model="user.name" class="input" type="text" placeholder="ФИО" />

          <div class="select">
            <select required v-model="user.institution">
              <option selected disabled value="">Выберите отделение</option>
              <option
                v-for="option in institutionOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="select">
            <select required v-model="user.post">
              <option selected disabled value="">Выберите должность</option>
              <option
                v-for="option in postOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <label class="checkbox" v-if="user.post === 'doctor'">
            <input
              type="checkbox"
              v-model="user.isHeadOfInstitution"
            />

            Глава отделения
          </label>

          <button type="submit" class="is-hidden" ref="hiddenSubmit"></button>
        </form>
      </section>

      <footer class="modal-card-foot">
        <div class="buttons">
          <button class="button is-primary" @click="save">
            {{ isEditMode ? 'Сохранить' : 'Добавить' }}
          </button>

          <button class="button" @click="close">Отмена</button>
        </div>
      </footer>
    </div>

    <button class="modal-close is-large" aria-label="close" @click="close"></button>
  </div>
</template>

<style scoped lang="scss">
.user-details {
  display: flex;
  flex-direction: column;
  gap: 10px;

  select {
    width: 100%;
  }

  .is-hidden {
    display: none;
  }
}
</style>
