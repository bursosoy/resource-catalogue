<template>
  <div>
    <!-- <div id="dialogue-container"></div> -->
    <base-dialog :dialogueSize="dialogueMessage.size" @dismiss="acknowledgeDialogue" v-if="isDialagueOn" :dialogueMessage="dialogueMessage">
    </base-dialog>
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
      isLight: true,
      isLoading: true,
      resourceInfo: [],
      activeComponent: 'catalogue-wall',
      tabItems: [
        {name: 'Catalogue', component: 'catalogue-wall'},
        {name: 'Add Resource', component: 'add-resource'},
      ],
      nietzsche:
        'Nietzsche spoke of “the death of God,” and foresaw the dissolution of traditional religion and metaphysics. Some interpreters of Nietzsche believe he embraced nihilism, rejected philosophical reasoning, and promoted a literary exploration of the human condition, while not being concerned with gaining truth and knowledge in the traditional sense of those terms. However, other interpreters of Nietzsche say that in attempting to counteract the predicted rise of nihilism, he was engaged in a positive program to reaffirm life, and so he called for a radical, naturalistic rethinking of the nature of human existence, knowledge, and morality. On either interpretation, it is agreed that he suggested a plan for “becoming what one is” through the cultivation of instincts and various cognitive faculties, a plan that requires constant struggle with one’s psychological and intellectual inheritances. When he was a student in Leipzig, Nietzsche met Richard Wagner, and after his move to Basel, he became a frequent guest in the Wagner household at Villa Tribschen in Lucerne. Nietzsche’s friendship with Wagner (and Cosima Liszt Wagner) lasted into the mid-1870s, and that friendship—together with their ultimate break—were key touchstones in his personal and professional life. His first book, The Birth of Tragedy out of the Spirit of Music (1872), was not the careful work of classical scholarship the field might have expected, but a controversial polemic combining speculations about the collapse of the tragic culture of fifth century Athens with a proposal that Wagnerian music-drama might become the source of a renewed tragic culture for contemporary Germany. The work was generally ill received within classical studies—and savagely reviewed by Ulrich Wilamovitz-Möllendorff, who went on to become one of the leading classicists of the generation—even though it contained some striking interpretive insights (e.g., about the role of the chorus in Greek tragedy). Following the first book, Nietzsche continued his efforts to influence the broader direction of German intellectual culture, publishing essays intended for a wide public on David Friedrich Strauss, on the “use of history for life”, on Schopenhauer, and on Wagner. These essays are known collectively as the Untimely Meditations.',
      linkURLs: ['', 'http://www.tipidpc.com', 'http://www.medium.com', 'http://www.engadget.com', 'http://www.dailystoic.com', 'http://www.188bet.com', 'http://www.youtube.com'],
      bgThemes: [
        {
          name: 'none',
          style: {},
        },
        {
          name: 'dotted',
          style: {backgroundImage: `url(${require('./../assets/theme-dotted.png')})`},
        },
        {
          name: 'pattern',
          style: {backgroundImage: `url(${require('./../assets/theme-pattern.png')})`},
        },
        {
          name: 'smoke',
          style: {backgroundImage: `url(${require('./../assets/theme-smoke.png')})`},
        },
        {
          name: 'wood',
          style: {backgroundImage: `url(${require('./../assets/theme-wood.png')})`},
        },
      ],
      isDialagueOn: false,
      dialogueMessage: {
        title: '',
        desc: '',
        cta: {
          negative: {label: '', action: null},
          positive: {label: '', action: null},
        },
        priority: true,
      },
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
      loadData: this.loadData,
      toggleTheme: this.toggleTheme,
      resourceInfo: this.resourceInfo,
      bgThemes: this.bgThemes,
      isDialagueOn: this.isDialagueOn,
      throwDialogue: this.throwDialogue,
      dialogueMessage: this.dialogueMessage,
      acknowledgeDialogue: this.acknowledgeDialogue,
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
    // locally generated
    // for (let i = 0; i <= this.randomize(16, 4); i++) {
    //   let item = {title: this.generateTitle(), desc: this.generateDesc(), link: this.generateLink(), iconURL: this.generateIconURL(), theme: this.generateTheme(), isPinned: this.randomize(2, 0)}
    //   this.processData(item, this.activeComponent)
    // }

    // from firebase
    this.loadData()
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
      return this.bgThemes[this.randomize(this.bgThemes.length)]
    },
    // deleteResource(item) {
    //   this.resourceInfo = this.resourceInfo.filter((resource) => resource.title !== item)
    // },
    generateHashItems() {
      let hashRaw = this.nietzsche.split(' ')
      let hashArray = []
      for (let i = 0; i < this.randomize(5, 2); i++) {
        let threeWordedHash = []
        for (let i = 0; i < 3; i++) {
          let rng = this.randomize(hashRaw.length)
          threeWordedHash.unshift(
            hashRaw[rng]
              .toLowerCase()
              .charAt(0)
              .toUpperCase() + hashRaw[rng].slice(1)
          )
        }
        hashArray.unshift(threeWordedHash.join('').replace(/[^\w\s]|_/g, ''))
      }
      return hashArray
    },
    loadData() {
      this.throwDialogue({
        title: 'Loading...',
        desc: 'Please wait while we are loading your resources',
        cta: {},
        priority: false,
      })

      fetch('https://resource-catalogue-default-rtdb.firebaseio.com/catalogue.json', {
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
        })
        .then((data) => {
          this.acknowledgeDialogue()
          !data &&
            this.throwDialogue({
              size: 'dialog25',
              title: 'No resources found',
              desc: 'Please add new entries to fill up the catalogue wall.',
              cta: {
                negative: {label: 'Dismiss', action: 'dismiss'},
                positive: {
                  label: 'Add Now',
                  action: () => {
                    this.activeComponent = 'add-resource'
                    this.acknowledgeDialogue()
                  },
                },
              },
              priority: false,
            })
          this.resourceInfo.length = 0 // clears the array
          for (let index in data) {
            this.processData(index, data[index], 'catalogue-wall')
          }
        }).catch((error) => {
          this.throwDialogue({
            title: error,
            desc: 'Please refresh your browser and if issues persist, please contact your Systems Administrator.',
            priority: true
          })
        })
    },
    processData(index, info, setComponent) {
      this.resourceInfo.unshift({
        indexKey: index, // pass unique index
        title: info.title,
        desc: info.desc,
        link: info.link,
        iconURL: this.generateIconURL(),
        theme: info.theme,
        isPinned: info.isPinned,
        toBeDeleted: 0,
        hash: info.hash ? info.hash : this.generateHashItems(),
      })
      this.activeComponent = setComponent
      this.$forceUpdate()
    },
    toggleTheme() {
      this.isLight = !this.isLight
    },
    throwDialogue(error) {
      this.isDialagueOn = true
      Object.assign(this.dialogueMessage, error)
    },
    acknowledgeDialogue() {
      this.isDialagueOn = false
    },
  },
}
</script>
