<script setup lang="ts">
import router from '@/router';
const goToRoute = (path: string) => router.push(path);
</script>

<template>
    <div class="home-container">
      <div class="option import-data" @click="goToRoute('/import')">
        Hampiditra akora
      </div>
      <div class="option vote" @click="goToRoute('/vote')">
        Fifidianana
      </div>
    </div>
</template>

<style scoped lang="scss">
.home-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  .option {
    border: 2px solid $primary-border-color;
    border-radius: 10px;
    cursor: pointer;
    padding: 20px;
    margin: 0 30px;
    width: 300px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    font-size: 20px;
    transition: all 0.4s ease;

    &:hover {
      background-color: $accent-background-color;
    }
  }
}
</style>
