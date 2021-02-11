<template>
  <div>
    <div id="dialogue-container"></div>
    <the-header
      :activeComponent="activeComponent"
      :isLight="isLight"
      @passedComponent="
        (component) => {
          activeComponent = component
        }
      "
    ></the-header>
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
      isLight: false,
      resourceInfo: [],
      activeComponent: 'catalogue-wall',
      tabItems: [
        {name: 'Catalogue', component: 'catalogue-wall'},
        {name: 'Add Resource', component: 'add-resource'},
      ],
      nietzsche:
        'Nietzsche spoke of “the death of God,” and foresaw the dissolution of traditional religion and metaphysics. Some interpreters of Nietzsche believe he embraced nihilism, rejected philosophical reasoning, and promoted a literary exploration of the human condition, while not being concerned with gaining truth and knowledge in the traditional sense of those terms. However, other interpreters of Nietzsche say that in attempting to counteract the predicted rise of nihilism, he was engaged in a positive program to reaffirm life, and so he called for a radical, naturalistic rethinking of the nature of human existence, knowledge, and morality. On either interpretation, it is agreed that he suggested a plan for “becoming what one is” through the cultivation of instincts and various cognitive faculties, a plan that requires constant struggle with one’s psychological and intellectual inheritances',
      linkURLs: ['', 'http://www.tipidpc.com', 'http://www.medium.com', 'http://www.engadget.com', 'http://www.dailystoic.com', 'http://www.188bet.com', 'http://www.youtube.com'],
      themes: ['smoke', 'dotted', 'pattern', 'none']
    }
  },
  provide() {
    return {
      generateTitle: this.generateTitle,
      generateDesc: this.generateDesc,
      generateLink: this.generateLink,
      generateTheme: this.generateTheme,
      generateHashItems: this.generateHashItems,
      deleteResource: this.deleteResource,
      processData: this.processData,
      toggleTheme: this.toggleTheme,
      resourceInfo: this.resourceInfo,
      themes: this.themes,
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
        iconArray.push({'background-image': `url(${require('./../assets/ico' + i + '.png')})`})
      }
      return iconArray
    },
    componentProps() {
      return this.activeComponent === 'catalogue-wall'
        ? {
            resourceInfo: this.resourceInfo,
            isLight: this.isLight,
          }
        : {
            isLight: this.isLight,
          }
    },
  },
  mounted() {
    for (let i = 0; i <= this.randomize(16, 4); i++) {
      let item = {title: this.generateTitle(), desc: this.generateDesc(), link: this.generateLink(), iconURL: this.generateIconURL(), theme: this.generateTheme(), isPinned: this.randomize(2, 0)}
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
      return (descRaw[this.randomize(descRaw.length)] + '.').substring(0, 200) + '..'
    },
    generateLink() {
      return this.linkURLs[this.randomize(this.linkURLs.length)]
    },
    generateIconURL() {
      return this.iconURL[this.randomize(this.iconURL.length)]
    },
    generateTheme() {
      return this.themes[this.randomize(this.themes.length)]
    },
    // deleteResource(item) {
    //   this.resourceInfo = this.resourceInfo.filter((resource) => resource.title !== item)
    // },
    generateHashItems() {
      let hashRaw = this.nietzsche.split(' ')
      let hashArray = []
      for (let i = 0; i < this.randomize(5,2); i++) {
        let threeWordedHash = []
        for (let i = 0; i < 3; i++) {
          let rng = this.randomize(hashRaw.length)
          threeWordedHash.unshift(hashRaw[rng].toLowerCase().charAt(0).toUpperCase() + hashRaw[rng].slice(1))
        }
        hashArray.unshift(
          threeWordedHash
            .join('')
            .replace(/[^\w\s]|_/g, '')
        )
      }
      return hashArray
    },
    processData(info, setComponent) {
      this.resourceInfo.unshift({
        title: info.title,
        desc: info.desc,
        link: info.link,
        iconURL: this.generateIconURL(),
        theme: info.theme,
        isPinned: info.isPinned,
        toBeDeleted: 0,
        hash: info.hash ? info.hash : this.generateHashItems()
      })
      this.activeComponent = setComponent
      this.$forceUpdate()
    },
    toggleTheme() {
      this.isLight = !this.isLight
    },
  },
}
</script>
