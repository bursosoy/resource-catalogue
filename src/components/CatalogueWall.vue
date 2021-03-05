<template>
  <div class="catalogue-wrap">
    <component :is="activeCardTheme" v-for="item in resourceInfo" :key="item.title" :theme="item.theme" :url="item.link">
      <template #thumbnail><base-thumbnail :style="item.iconURL"></base-thumbnail></template>
      <template #pin v-if="item.isPinned">
        <div class="pin"></div>
      </template>
      <template #title>{{ item.title }} </template>
      <template #desc>{{ item.desc }}</template>
      <template v-if="item.link && item.link.trim() && item.link !== 'http://www.'" #url>
        <base-button btnType="url" @click="visitLink(item.link)">{{ item.link }}</base-button>
      </template>
      <template v-if="item.link && item.link.trim() && item.link !== 'http://www.'" #visitButton>
        <base-button btnType="blue" @click="visitLink(item.link)">Visit {{ item.link.slice(11) }}</base-button>
      </template>
      <template #delete v-if="!item.toBeDeleted">
        <base-button btnType="close top-right" @click="removeResource(item.title)">X</base-button>
      </template>
      <template #confirmation>
        <div class="overlay" v-if="item.isPinned && item.toBeDeleted" @click="item.toBeDeleted = 0" tabindex="0">
          <h3>Item pinned!</h3>
          <div>You have pinned this item. Are you sure you want to remove this pinned item?</div>
          <div class="cta">
            <div><base-button btnType="link" @click="item.toBeDeleted = 0">Cancel</base-button></div>
            <div><base-button btnType="blue" @click="confirmPinnedDelete(item.title)">Confirm Delete</base-button></div>
          </div>
        </div>
      </template>
      <template #hash>
        <div class="hash-wrap">
          <span v-for="hashes in item.hash" :key="hashes">
            <span class="hashtag">#{{ hashes }}</span>
          </span>
        </div>
      </template>
    </component>
  </div>
  <!-- i'm a ninja -->
</template>

<script>
export default {
  data() {
    return {
      isDialagueOn: false,
      confirmDelete: 0,
    }
  },
  // emits:['throw-data'], // need to declare even though not emitting due to dynamic component on its parent
  inject: ['deleteResource', 'resourceInfo'],
  props: {
    isLight: Boolean,
  },
  computed: {
    activeCardTheme() {
      return this.isLight ? 'catalogue-cardlight' : 'catalogue-carddark'
    },
  },
  methods: {
    handleFocus() {
      console.log('focus')
    },
    visitLink(link) {
      window.open(link, '_blank')
    },
    confirmPinnedDelete(title) {
      this.confirmDelete = 1
      this.removeResource(title)
      this.confirmDelete = 0
    },
    removeResource(itemTitle) {
      // this works without using the injected deleteResource because we are not assigning new value to resourceInfo, we are just merely altering its content
      // itemToBeDeleted = 1
      const index = this.resourceInfo.findIndex((resource) => resource.title === itemTitle)
      this.resourceInfo[index].toBeDeleted = 1
      if (this.confirmDelete || !this.resourceInfo[index].isPinned || !this.isLight) {
        this.resourceInfo.splice(index, 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.catalogue-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;

  .hash-wrap {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.85rem;
    align-items: flex-start;
    .hashtag {
      background-color: #44444438;
      display: inline-block;
      padding: 0.1rem 0.5rem;
      border-radius: 0.25rem;
      margin: 0.15rem;
    }
  }

  .pin {
    background-image: url('./../assets/pin.png');
    background-size: contain;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .overlay {
    display: flex;
    flex-direction: column;
    background-color: #11111199;
    position: absolute;
    z-index: 11;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    border-radius: 0.5rem 0.5rem 0.5rem 0;
    backdrop-filter: grayscale(1) blur(3px) contrast(0.5);
    color: #eee;
    padding: 2rem;

    h3 {
      margin: 0 0 1rem 0;
    }

    .cta {
      display: flex;
      align-self: flex-end;
      margin-top: auto;
      div {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
