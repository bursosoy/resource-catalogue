<template>
  <div>
    <div class="header-wrap">
      <div class="toggle" @click="toggleTheme()" :style="getTheme()"></div>
      <h1>Resource Catalogue</h1>
      <nav class="nav-wrap">
        <div v-for="item in tabItems" :key="item" class="item" :class="{'item-active': item.component === activeComponent}" @click="activeComponent = item.component">{{ item.name }}</div>
      </nav>
    </div>
    <keep-alive>
    <component :is="activeComponent" @throw-data="processData" v-bind="componentProps"></component>
    </keep-alive>
  </div>
</template>

<script>
function randomize(upperLimit, lowerLimit = 0) {
  return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit // proper random
}
// check eslint rule on registering components but not using here
import catalogueWall from './../components/CatalogueWall'
import addResource from './../components/AddResource'
export default {
  name: 'CatalogueHome',
  data() {
    return {
      isLight: true,
      resourceInfo: [],
      activeComponent: 'catalogue-wall',
      tabItems: [
        {name: 'Catalogue', component: 'catalogue-wall'},
        {name: 'Add Resource', component: 'add-resource'},
      ],
      nietzsche:
        'That which does not kill us makes us stronger. Sometimes people don’t want to hear the truth because they don’t want their illusions destroyed. It is not a lack of love, but a lack of friendship that makes unhappy marriages. Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you. The higher we soar, the smaller we appear to those who cannot fly',
      linkURLs: ['http://www.tipidpc.com', 'http://www.medium.com', 'http://www.engadget.com', 'http://www.dailystoic.com','http://www.188bet.com','http://www.youtube.com'],
    }
  },
  provide() {
    return {
      randomTitle: this.generateTitle,
      randomDesc: this.generateDesc,
      randomLink: this.generateLink,
      deleteResource: this.deleteResource,
    }
  },
  components: {
    'catalogue-wall': catalogueWall,
    'add-resource': addResource,
  },
  computed: {
    iconURL() {
      let iconArray = []
      for (let i = 1; i <= 10; i++) {
        iconArray.push({'background-image': `url(${require('./../assets/ico'+i+'.png')})`,})
      }
      return iconArray
    },
    componentProps() {
      return this.activeComponent === 'catalogue-wall'
        ? {
            resourceInfo: this.resourceInfo,
            isLight: this.isLight,
          }
        : {}
    },
  },
  mounted() {
    for (let i = 0; i <= randomize(10, 4); i++) {
      let item = {title: this.generateTitle(), desc: this.generateDesc(), link: this.generateLink(), iconURL: this.generateIconURL()}
      this.processData(item, this.activeComponent)
    }
  },
  methods: {
    generateTitle() {
      let titleRaw = this.nietzsche.split(' ')
      let titleArray = []
      let punctuations = ['.', '!', '?']
      for (let a = 0; a <= randomize(8, 3); a++) {
        titleArray.push(titleRaw[randomize(titleRaw.length)])
      }
      titleArray = titleArray.join(' ') // convert array to sentence
      let title = titleArray.replace(/[^\w\s]|_/g, '').toLowerCase() // remove punctuations
      title = title.charAt(0).toUpperCase() + title.slice(1) + punctuations[randomize(punctuations.length)] // capitalize and add punctuation

      return title
    },
    generateDesc() {
      let descRaw = this.nietzsche.split('.')
      return (descRaw[randomize(descRaw.length)] + '.').substring(0, 100) + '..'
    },
    generateLink() {
      return this.linkURLs[randomize(this.linkURLs.length)]
    },
    generateIconURL() {
      return this.iconURL[randomize(this.iconURL.length)]
    },
    deleteResource(item) {
      this.resourceInfo = this.resourceInfo.filter((resource) => resource.title !== item)
    },
    processData(info, setComponent) {
      this.resourceInfo.unshift({title: info.title, desc: info.desc, link: info.link, iconURL: this.generateIconURL()})
      this.activeComponent = setComponent
      this.$forceUpdate()
    },
    toggleTheme() {
      this.isLight = !this.isLight
    },
    getTheme(){
      return !this.isLight ? {'background-image': `url(${require('./../assets/day.png')})`} : {'background-image': `url(${require('./../assets/night.png')})`}
    }
  },
}
</script>
<style lang="scss" scoped>
.header-wrap {
  position: relative;
  padding-left: 2rem;
  background-color: #262626;

  .toggle {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 3rem;
    height: 1.6rem;
    // background-image: url('./../assets/night.png');
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
      background-image: url('./../assets/px_orange.png');
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
