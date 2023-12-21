<script setup></script>

<template>
  <div class="popup__button">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.popup__button {
  :deep(a) {
    padding: 16px 32px;
  }
}
</style>
