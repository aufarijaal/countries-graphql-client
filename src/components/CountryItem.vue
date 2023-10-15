<script setup lang="ts">
defineProps<{
  country: {
    name: string;
    emoji: string;
  };
}>();
</script>
<template>
  <div class="country-item" v-bind="$attrs">
    <div class="country-item__emoji">
      {{ country.emoji }}
    </div>
    <div class="country-item__name">
      {{ country.name }}
    </div>
  </div>
</template>

<style lang="stylus">
.country-item
  background-color var(--gray--50)
  width 16rem
  height 10rem
  border-radius 0.4rem
  border 1px solid var(--gray--300)
  box-shadow 0px 10px 15px rgba(0,0,0,0.07)
  cursor pointer
  display flex
  flex-direction column
  justify-content center
  align-items center
  gap 1rem
  font-weight 600
  transition background-color 100ms linear, box-shadow 100ms linear
  user-select none

  &:hover
    background-color var(--gray--100)
    box-shadow 0px 10px 10px rgba(0,0,0,0.07)
  &:active
    background-color var(--gray--50)

  &__emoji
    font-size 4rem
</style>
