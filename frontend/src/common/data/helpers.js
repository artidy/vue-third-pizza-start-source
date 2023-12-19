export const getValueByID = (id, values) => values[id];

export const getImage = (image) => {
  // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  return new URL(`@/assets/img/${image}`, import.meta.url).href;
};
