<script setup>
import { computed, reactive } from "vue";

import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import AppDough from "@/modules/constructor/components/AppDough.vue";
import AppDiameter from "@/modules/constructor/components/AppDiameter.vue";
import AppSauce from "@/modules/constructor/components/AppSauce.vue";
import AppIngredients from "@/modules/constructor/components/AppIngredients.vue";
import AppPizza from "@/modules/constructor/components/AppPizza.vue";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSizes,
} from "@/common/normalize";

const doughItems = doughJSON.map(normalizeDough);
const ingredientItems = ingredientsJSON.map(normalizeIngredients);
const sauceItems = saucesJSON.map(normalizeSauces);
const sizeItems = sizesJSON.map(normalizeSizes);

const pizza = reactive({
  name: "",
  doughType: doughItems[0].type,
  sizeType: sizeItems[0].type,
  sauceType: sauceItems[0].type,
  ingredients: ingredientItems.reduce((acc, item) => {
    acc[item.type] = 0;

    return acc;
  }, {}),
});

const price = computed(() => {
  const { doughType, sizeType, sauceType, ingredients } = pizza;

  const sizeMultiplier =
    sizeItems.find((item) => item.type === sizeType)?.multiplier ?? 1;

  const doughPrice =
    doughItems.find((item) => item.type === doughType)?.price ?? 0;

  const saucePrice =
    sauceItems.find((item) => item.type === sauceType)?.price ?? 0;

  const ingredientsPrice = ingredientItems
    .map((item) => ingredients[item.type] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});
const disableSubmit = computed(() => {
  return pizza.name.length === 0 || price.value === 0;
});
const addIngredient = (ingredient) => {
  pizza.ingredients[ingredient.type]++;
};
const updateIngredientAmount = (ingredient, count) => {
  pizza.ingredients[ingredient] = count;
};
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <app-dough v-model="pizza.doughType" :dough-items="doughItems" />

        <app-diameter v-model="pizza.sizeType" :size-items="sizeItems" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <app-sauce v-model="pizza.sauceType" :sauce-items="sauceItems" />

              <app-ingredients
                v-model="pizza.ingredients"
                :ingredient-items="ingredientItems"
                @update="updateIngredientAmount"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              :value="pizza.name"
              placeholder="Введите название пиццы"
            />
          </label>

          <app-pizza
            :dough-type="pizza.doughType"
            :sauce-type="pizza.sauceType"
            :ingredients="pizza.ingredients"
            @drop="addIngredient"
          />

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" :disabled="disableSubmit">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
