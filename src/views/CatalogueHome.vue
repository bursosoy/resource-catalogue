<template>
  <div>
    <the-header :activeComponent="activeComponent" :isLight="isLight" @passedComponent="(component) => {activeComponent=component}"></the-header>
    <keep-alive><component :is="activeComponent" v-bind="componentProps"></component></keep-alive>
  </div>
</template>

<script>
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
      linkURLs: ['','http://www.tipidpc.com', 'http://www.medium.com', 'http://www.engadget.com', 'http://www.dailystoic.com','http://www.188bet.com','http://www.youtube.com'],
    }
  },
  provide() {
    return {
      randomTitle: this.generateTitle,
      randomDesc: this.generateDesc,
      randomLink: this.generateLink,
      deleteResource: this.deleteResource,
      processData: this.processData,
      toggleTheme: this.toggleTheme
    }
  },
  components: {
    'catalogue-wall': catalogueWall,
    'add-resource': addResource
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
    componentEvents(){
      return {
        knownEvents: {processData : 'throw-data'}
        }
    },
  },
  mounted() {
    for (let i = 0; i <= this.randomize(10, 4); i++) {
      let item = {title: this.generateTitle(), desc: this.generateDesc(), link: this.generateLink(), iconURL: this.generateIconURL()}
      this.processData(item, this.activeComponent)
    }
  },
  methods: {
    generateTitle() {
      let titleRaw = this.nietzsche.split(' ')
      let titleArray = []
      let punctuations = ['.', '!', '?']
      for (let a = 0; a <= this.randomize(8, 3); a++) {
        titleArray.push(titleRaw[this.randomize(titleRaw.length)])
      }
      titleArray = titleArray.join(' ') // convert array to sentence
      let title = titleArray.replace(/[^\w\s]|_/g, '').toLowerCase() // remove punctuations
      title = title.charAt(0).toUpperCase() + title.slice(1) + punctuations[this.randomize(punctuations.length)] // capitalize and add punctuation

      return title
    },
    generateDesc() {
      let descRaw = this.nietzsche.split('.')
      return (descRaw[this.randomize(descRaw.length)] + '.').substring(0, 100) + '..'
    },
    generateLink() {
      return this.linkURLs[this.randomize(this.linkURLs.length)]
    },
    generateIconURL() {
      return this.iconURL[this.randomize(this.iconURL.length)]
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
  },
}
</script>
