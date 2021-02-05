<template>
<div class="header-wrap">
      <div class="toggle-theme" @click="toggleTheme()" :style="getTheme()" v-if="activeComponent==='catalogue-wall'"></div>
      <h1>Resource Catalogue</h1>
      <nav class="nav-wrap">
        <div v-for="item in tabItems" :key="item" class="item" :class="{'item-active': item.component === activeComponent}" @click="passActiveComponent(item.component)">{{ item.name }}</div>
      </nav>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tabItems: [
        {name: 'Catalogue', component: 'catalogue-wall'},
        {name: 'Add Resource', component: 'add-resource'},
      ],
    }
  },
  emits:['passedComponent'],
  inject:['toggleTheme'],
  props:{
    activeComponent: String,
    isLight: Boolean
  },
  methods:{
    getTheme(){
      return !this.isLight ? {'background-image': `url(${require('./../../assets/day.png')})`} : {'background-image': `url(${require('./../../assets/night.png')})`}
    },
    passActiveComponent(component){
      this.$emit('passedComponent', component)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  position: relative;
  padding-left: 2rem;
  background-color: #262626;

  .toggle-theme {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 3rem;
    height: 1.6rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  h1 {
    margin: 0;
    padding: 2rem 0 1rem 0;
  }
  .nav-wrap {
    display: flex;
    align-items: flex-end;

    .item {
      padding: 1rem;
      color: #999;
      cursor: pointer;

      &:hover {
        background-color: #2c2c2c;
      }
    }

    .item-active {
      color: inherit;
      font-weight: bold;
      background-image: url('./../../assets/px_orange.png');
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: (100% 0.2rem);
    }
  }
}

@media only screen and (max-width: 375px) {
  // mobile
  .header-wrap {
    padding: 0;
    h1 {
      text-align: center;
    }
    .nav-wrap {
      justify-content: center;
    }
  }
}
</style>
