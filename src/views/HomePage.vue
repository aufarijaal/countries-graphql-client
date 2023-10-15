<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCountries, findCountries } from "../utils/countries";
import { watchDebounced, useClipboard } from "@vueuse/core";
import CountryItem from "../components/CountryItem.vue";

const countries = ref<{ name: string; emoji: string }[]>([]);
const countryNameQuery = ref<string>("");
const { text, copy, copied, isSupported } = useClipboard();

async function getAllCountries() {
  countries.value = await getCountries();
}

async function find() {
  if (countryNameQuery.value.trim() === "") {
    getAllCountries();
    return;
  }

  countries.value = await findCountries(countryNameQuery.value);
}

watchDebounced(countryNameQuery, find, { debounce: 500 });

onMounted(async () => {
  await getAllCountries();
});
</script>

<template>
  <div id="home-page">
    <div class="page-title">Countries.</div>
    <div class="page-summary">
      Browse collections of countries emoji. Click the card to copy the flag emoji.
    </div>
    <div class="country-finder">
      <div class="country-finder-form">
        <input
          autofocus
          class="country-finder-form__input-country-name"
          placeholder="Search country name"
          type="text"
          v-model="countryNameQuery"
        />
        <button class="country-finder-form__btn-submit" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="copied-emoji">Copied: {{ text || "none" }}</div>

    <div class="country-list">
      <CountryItem
        v-for="(country, index) in countries"
        :country="country"
        :style="{ animation: `slide-left ${30 * (index + 1)}ms linear both` }"
        :key="country.name + index"
        @click="copy(country.emoji)"
      />
    </div>
  </div>
</template>

<style lang="stylus">
font-damion = "Damion", sans-serif

.copied-emoji
  text-align center
  font-size 0.8rem
  margin-bottom 2rem

#home-page
  padding 1rem

.page-title
  font-size 2.5rem
  font-family font-damion
  text-align center

.page-summary
  font-size 0.8rem
  color var(--gray--600)
  text-align center
  margin-top 0.7rem

.country-list
  display flex
  flex-wrap wrap
  gap 2rem
  justify-content center

.country-finder
  display flex
  justify-content center

.country-finder-form
  display flex
  align-items center
  gap 0.4rem
  margin 2rem 0

.country-finder-form__input-country-name
  flex-grow 1
  border 1px solid var(--gray--300)
  appearance none
  height 3rem
  width 100%
  max-width 32rem
  padding 0 1.5rem
  outline none
  border-radius 0.5rem
  font-size 1rem
  transition all 0ms linear

  &:focus
    border 1px solid var(--blue--200)

.country-finder-form__btn-submit
  flex-shrink 0
  appearance none
  background-color var(--blue--400)
  border 1px solid var(--blue--300)
  color white
  height 3rem
  width @height
  border-radius 0.5rem
  cursor pointer
  transition all 100ms linear

  &:hover
    background-color var(--blue--500)

@keyframes slide-left
  from
    opacity 0%
    transform translateY(-10px)
  to
    opacity 100%
    transform translateY(0px)
</style>
