<template>
  <div class="catalogue-wrap">
    <component :is="activeCard" v-for="item in resourceInfo" :key="item.title">
      <template v-slot:thumbnail><div class="circle" :style="item.iconURL"></div></template>
      <template v-slot:title>{{ item.title }}</template>
      <template v-slot:desc>{{ item.desc }}</template>
      <template v-slot:url><div @click="visitLink(item.link)">{{ item.link }}</div></template>
      <template v-slot:visitButton><button @click="visitLink(item.link)">Visit Link</button></template>
      <template v-slot:delete><div class="delete" @click="deleteResource(item.title)">X</div></template>
    </component>
  </div>
</template>

<script>
function randomize(upperLimit, lowerLimit = 0) {
  return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit // proper random
}
import catalogueCardLight from './../components/catalogue-wall/CatalogueCardLight.vue'
import catalogueCardDark from './../components/catalogue-wall/CatalogueCardDark.vue'
export default {
  data() {
    return {
      
    }
  },
  // emits:['throw-data'], // need to declare even though not emitting due to dynamic component on its parent
  inject: ['deleteResource'],
  props: {
    resourceInfo: Array,
    iconURL: Array,
    isLight: Boolean
  },
  computed:{
    activeCard(){ return this.isLight ? 'catalogue-cardlight' : 'catalogue-carddark'}
  },
  components: {
    'catalogue-cardlight': catalogueCardLight,
    'catalogue-carddark': catalogueCardDark,
  },
  methods: {
    visitLink(link) {
      window.open(link, '_blank')
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.catalogue-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 3rem;
    min-height: 3rem;
    border-radius: 50%;
    color: #999;
    background: #fff;
    font-weight: bold;
    // background-image: url('./../assets/ico1.png');
    background-size: 2rem;
    background-position: center;
    background-repeat: no-repeat;
  }
  button {
    align-self: flex-end;
  }
  .delete {
    background-color: #222;
    border: 1px #444 dashed;
    position: absolute;
    right: 0;
    top: 0;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-family: Alte Haas Grotesk;
    font-size: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #111;
      transform: scale(1.2);
    }
  }
}
</style>
