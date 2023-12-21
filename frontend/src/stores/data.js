import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeMisc,
  normalizeSauces,
  normalizeSizes,
} from "@/common/normalize";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import miscJSON from "@/mocks/misc.json";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughs: doughJSON.map(normalizeDough),
    ingredients: ingredientsJSON.map(normalizeIngredients),
    sauces: saucesJSON.map(normalizeSauces),
    sizes: sizesJSON.map(normalizeSizes),
    misc: miscJSON.map(normalizeMisc),
  }),
  getters: {},
  actions: {},
});
