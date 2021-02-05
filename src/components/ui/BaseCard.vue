<template>
  <div :class="cardType"><slot></slot></div>
</template>

<script>
export default {
  props: {
    cardType: String,
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
}
</style>
