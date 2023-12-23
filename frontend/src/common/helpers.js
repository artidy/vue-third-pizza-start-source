import { useDataStore } from "@/stores";

export const getValueByID = (id, values) => values[id];

export const getImage = (image) => {
  // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};

/* Функция вернёт объект { ингредиент: количество } */
export const ingredientsQuantity = (pizza) => {
  const data = useDataStore();
  return data.ingredients.reduce((acc, val) => {
    acc[val.id] =
      pizza.ingredients.find((item) => item.ingredientId === val.id)
        ?.quantity ?? 0;
    return acc;
  }, {});
};

export const pizzaPrice = (pizza) => {
  const data = useDataStore();
  const ingredients = ingredientsQuantity(pizza);

  const sizeMultiplier =
    data.sizes.find((item) => item.id === pizza.sizeId)?.multiplier ?? 1;

  const doughPrice =
    data.doughs.find((item) => item.id === pizza.doughId)?.price ?? 0;

  const saucePrice =
    data.sauces.find((item) => item.id === pizza.sauceId)?.price ?? 0;

  /*
   * Здесь мы при помощи метода map превращаем массив ингредиентов
   * в массив значений, соответствующих итоговой стоимости каждого ингредиента — просто умножаем известную цену на количество.
   * После чего методом reduce вычисляем сумму всех элементов массива, что даст нам общую стоимость всех ингредиентов.
   */
  const ingredientsPrice = data.ingredients
    .map((item) => ingredients[item.id] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};

export const getPublicImage = (path) => {
  const publicUrl = "/api";
  const divider = path.startsWith("/") ? "" : "/";
  return [publicUrl, path].join(divider);
};
