<template>
  <div class="catalogue-wrap">
    <component :is="activeCardTheme" v-for="item in resourceInfo" :key="item.title">
      <template v-slot:thumbnail><base-thumbnail :style="item.iconURL"></base-thumbnail></template>
      <template v-slot:title>{{ item.title }}</template>
      <template v-slot:desc>{{ item.desc }}</template>
      <template v-if="item.link && item.link !== 'http://www.'" v-slot:url><base-button btnType="url" @click="visitLink(item.link)">{{ item.link }}</base-button></template>
      <template v-if="item.link && item.link !== 'http://www.'" v-slot:visitButton><base-button btnType="blue" @click="visitLink(item.link)">Visit Link</base-button></template>
      <template v-slot:delete><base-button btnType="close top-right" @click="deleteResource(item.title)">X</base-button></template>
    </component>
  </div>
</template>

<script>
import BaseButton from './ui/BaseButton.vue'
import BaseCard from './ui/BaseCard.vue'
import BaseThumbnail from './ui/BaseThumbnail.vue'
export default {
  components: { BaseButton, BaseThumbnail, BaseCard },
  data() {
    return {
      
    }
  },
  // emits:['throw-data'], // need to declare even though not emitting due to dynamic component on its parent
  inject: ['deleteResource'],
  props: {
    resourceInfo: Array,
    isLight: Boolean
  },
  computed:{
    activeCardTheme(){ return this.isLight ? 'catalogue-cardlight' : 'catalogue-carddark'}
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
}
</style>
