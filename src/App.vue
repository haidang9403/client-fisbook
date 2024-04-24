<script setup>
import { computed, watch} from 'vue';
import {RouterView, useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Alert from '@/components/Alert.vue';
import { useAlert } from '@/stores/alert';
import { storeToRefs } from "pinia";
import { useLoading } from './stores/loading';
import Loading from '@/components/Loading.vue';
import { useTitle } from "@vueuse/core";

const title = useTitle()
title.value = "Trang chủ";


const route = useRoute();
const alert = useAlert();
const loading = useLoading();


const { showAlert, alertType, alertMessage } = storeToRefs(alert);
const { show } = storeToRefs(loading);

const layout = computed(() =>
  route.meta.layout || DefaultLayout
)
</script>

<template>
  <Alert :show-alert="showAlert" :alert-type="alertType" :alert-message="alertMessage">
  </Alert>
  <Loading :show="show" />
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
