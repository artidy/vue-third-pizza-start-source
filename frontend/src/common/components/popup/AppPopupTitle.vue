<script setup></script>

<template>
  <div class="popup__title">
    <h2 class="title">
      <slot />
    </h2>
  </div>
</template>

<style scoped lang="scss">
.popup__title {
  text-align: center;

  font-size: 1.3em;
}
</style>
