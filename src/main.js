import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/common.scss'

// register global components
import theHeader from './components/ui/TheHeader.vue' 
import catalogueCardLight from './components/catalogue-wall/CatalogueCardLight.vue' 
import catalogueCardDark from './components/catalogue-wall/CatalogueCardDark.vue' 
import baseButton from './components/ui/BaseButton.vue' 
import baseThumbnail from './components/ui/BaseThumbnail.vue' 
import baseCard from './components/ui/BaseCard.vue'

const app = createApp(App)
app.component('the-header', theHeader)
app.component('catalogue-cardlight', catalogueCardLight)
app.component('catalogue-carddark', catalogueCardDark)
app.component('base-button', baseButton)
app.component('base-thumbnail', baseThumbnail)
app.component('base-card', baseCard)

// register global functions through mixin
app.mixin({
    methods: {
        randomize(upperLimit, lowerLimit = 0) {
            return Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit // proper random
          }
    }
  })

app.use(router).mount('#app')
