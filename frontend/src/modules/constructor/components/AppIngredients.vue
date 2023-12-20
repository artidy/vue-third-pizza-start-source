<script setup>
import { toRef } from "vue";

import { MAX_INGREDIENT_COUNT } from "@/common/constants";
import { getImage } from "@/common/helpers";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/modules/constructor/components/AppCounter.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  ingredientItems: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update"]);
const values = toRef(props, "modelValue");

const getValue = (ingredient) => {
  return values.value[ingredient] ?? 0;
};

const setValue = (ingredient, count) => {
  emit("update", ingredient, Number(count));
};

const decrementValue = (ingredient) => {
  setValue(ingredient, getValue(ingredient) - 1);
};

const incrementValue = (ingredient) => {
  setValue(ingredient, getValue(ingredient) + 1);
};

const inputValue = (ingredient, count) => {
  return setValue(ingredient, Math.min(MAX_INGREDIENT_COUNT, Number(count)));
};
</script>

<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredientItems"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <app-drag
          :data-transfer="ingredient"
          :draggable="getValue(ingredient.type) < MAX_INGREDIENT_COUNT"
        >
          <div class="filling">
            <img :src="getImage(ingredient.image)" :alt="ingredient.name" />
            {{ ingredient.name }}
          </div>
        </app-drag>

        <app-counter
          class="ingredients__counter"
          :value="getValue(ingredient.type)"
          :minus-disabled="getValue(ingredient.type) === 0"
          :plus-disabled="getValue(ingredient.type) === MAX_INGREDIENT_COUNT"
          @decrement="decrementValue(ingredient.type)"
          @increment="incrementValue(ingredient.type)"
          @update="(count) => inputValue(ingredient.type, count)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__filling {
  width: 100%;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include r-s14-h16;
  position: relative;
  display: block;
  padding-left: 36px;

  img {
    @include p_center-v;
    display: block;
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    padding: 4px;
    border-radius: 50%;
  }
}
</style>
