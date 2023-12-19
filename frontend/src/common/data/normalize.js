import { getValueByID } from "@/common/data/helpers";
import doughSizes from "@/common/data/doughSizes";
import ingredientTypes from "@/common/data/ingredients";
import saucesTypes from "@/common/data/sauces";
import sizesTypes from "@/common/data/sizes";

export const normalizeDough = (doughItem) => {
  return {
    ...doughItem,
    type: getValueByID(doughItem.id, doughSizes),
  };
};

export const normalizeIngredients = (ingredientItem) => {
  return {
    ...ingredientItem,
    type: getValueByID(ingredientItem.id, ingredientTypes),
  };
};

export const normalizeSauces = (sauceItem) => {
  return {
    ...sauceItem,
    type: getValueByID(sauceItem.id, saucesTypes),
  };
};

export const normalizeSizes = (sizeItem) => {
  return {
    ...sizeItem,
    type: getValueByID(sizeItem.id, sizesTypes),
  };
};
