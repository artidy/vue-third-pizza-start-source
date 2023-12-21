<script setup>
import DefaultHeader from "@/layouts/DefaultHeader.vue";
</script>

<template>
  <div class="default-layout">
    <default-header />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
