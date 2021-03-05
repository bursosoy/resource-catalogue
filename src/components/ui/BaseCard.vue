<template>
  <div :class="cardType" :style="bgTheme"><slot></slot></div>
</template>

<script>
export default {
  props: {
    cardType: Object,
    bgTheme: Object
  },
}
</script>

<style lang="scss" scoped>
div {
  border-radius: 0.75rem 0.75rem 0.75rem 0;
  padding: min(1rem);
  margin: min(0.5rem);
}

.dark {
  background-color: #262626;
  color: #eee;

}

.light {
  background-color: #eee;
  color: #262626;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
}

// changed below class names to style so that images can be taken from DB
// .smoke{
//   background-image: url('./../../assets/theme-smoke.png');
// }

// .dotted{
//   background-image: url('./../../assets/theme-dotted.png');
// }

// .pattern{
//   background-image: url('./../../assets/theme-pattern.png');
// }
</style>
