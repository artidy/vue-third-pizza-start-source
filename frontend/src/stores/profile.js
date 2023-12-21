import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";
import { normalizeAddresses } from "@/common/normalize";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: addressesJSON.map(normalizeAddresses),
  }),
  getters: {},
  actions: {},
});
