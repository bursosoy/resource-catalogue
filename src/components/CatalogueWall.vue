<template>
  <div class="catalogue-wrap">
    <component :is="activeCard" v-for="item in resourceInfo" :key="item.title">
      <template v-slot:title>{{ item.title }}</template>
      <template v-slot:desc>{{ item.desc }}</template>
      <template v-slot:button><button @click="visitLink(item.link)">Visit Link</button></template>
      <template v-slot:delete><div class="delete" @click="deleteResource(item.title)">X</div></template>
    </component>
  </div>
</template>

<script>
import catalogueCardLight from './../components/catalogue-wall/CatalogueCardLight.vue'
export default {
  data() {
    return {
      activeCard: 'catalogue-cardlight',
    }
  },
  inject:['deleteResource'],
  props: {
    resourceInfo: Array,
  },
  components: {
    'catalogue-cardlight': catalogueCardLight,
  },
  methods:{
    visitLink(link){
      window.open(link, '_blank')
    }
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.catalogue-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  button{
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

      &:hover{
        background-color: #111;
        transform: scale(1.2);
      }
    }
}
</style>
