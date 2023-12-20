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

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

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

.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}

.radio {
  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: $black;

    &:hover:not(:active):not(:disabled) {
      color: $red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: $white;
    color: $green-500;
  }
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
