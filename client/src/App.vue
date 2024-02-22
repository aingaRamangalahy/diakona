<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router';
import { useDisplayStore } from "@/stores/display";
import { onBeforeMount } from 'vue';

const displayStore = useDisplayStore()

onBeforeMount(() => displayStore.setTittleText("DEFAULT"))
</script>

<template>
  <header>
    <div class="title" @click="router.push('/')">
      {{ displayStore.getTitleText }}
    </div>
  </header>

  <div class="main">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">

header {
  width: 100vw;
  height: 64px;
  background: $dark-background-color;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 30px;
    color: $white-text-color;
    cursor: pointer;
  }
}

.main {
  margin-top: 64px;
  height: 100%;
  overflow-y: auto;
}

</style>
