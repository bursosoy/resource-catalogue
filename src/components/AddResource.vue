<template>
  <div class="main-wrap">
    <base-card class="form" :cardType="isLight ? {light: 1} : {dark: 1}">
      <div class="data-wrap">
        <div class="segment-wrap">
          <div class="flex-wrapper">
            <label for="title" @click="refreshData">Title:</label>
            <input id="title" class="title" type="text" v-model="resource.title" placeholder="Go on, be declarative..." ref="titleInput" />
            <!-- <base-button v-model="resource.title" btnType="blue"></base-button> -->
          </div>
          <div class="flex-wrapper">
            <label for="description">Description:</label>
            <textarea id="description" rows="5" cols="70" v-model="resource.desc" placeholder="Description here..." />
          </div>
          <div class="flex-wrapper">
            <label for="website">Website:</label>
            <input id="website" type="text" v-model="resource.link" />
          </div>
        </div>
        <div class="segment-wrap" v-if="isAdvanced">
          <div class="flex-wrapper">
            <label for="theme">Theme:</label>
            <select id="theme" name="theme" v-model="resource.theme">
              <option value="select" disabled selected>Select your option</option>
              <option v-for="theme in bgThemes" :key="theme" :value="theme">{{ theme.name.charAt(0).toUpperCase() + theme.name.slice(1) }}</option>
            </select>
          </div>
          <div class="flex-wrapper">
            <label for="radio-selections">Pin this item?:</label>
            <div id="radio-selections" class="radio">
              <div>
                <input type="radio" id="yes" name="pin" :value="1" v-model="resource.isPinned" />
                <label for="yes">Yes</label>
              </div>
              <div>
                <input type="radio" id="no" name="pin" :value="0" v-model="resource.isPinned" />
                <label for="no">No</label>
              </div>
            </div>
          </div>
          <div class="flex-wrapper">
            <label for="check-selections">Available tags:</label>
            <div id="check-selections" class="radio">
              <div v-for="hash in hashItems" :key="hash">
                <input type="checkbox" :id="hash" :name="hash" :value="hash" v-model="resource.hash" />
                <label :for="hash">#{{ hash }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <base-button class="btn-advanced" btnType="link" @click="isAdvanced = !isAdvanced">
          <span v-if="!isAdvanced">Advanced &rarr;</span>
          <span v-else>Basic &larr;</span>
        </base-button>
        <base-button class="clear" :btnType="resource.title || resource.desc ? 'blue' : 'blue disabled'" @click="clearFields">Clear</base-button>
        <base-button class="add" :btnType="formStatus ? 'blue' : 'blue disabled'" :disabled="!formStatus" @click="throwFormData">Add New</base-button>
      </div>
    </base-card>
    <!-- <teleport to="#dialogue-container">
      <base-dialog dialogueSize="dialog25" @dismiss="acknowledgeDialogue" v-if="isDialagueOn" :dialogueMessage="dialogueMessage">
        <template #title v-if="dialogueMessage.priority">
          <div class="custom-title">{{ dialogueMessage.title }}</div>
        </template>
      </base-dialog>
    </teleport> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      resource: {
        title: this.generateTitle(),
        desc: this.generateDesc(),
        link: this.generateLink(),
        theme: this.bgThemes[0],
        isPinned: 0,
        hash: [],
      },
      isAdvanced: false,
      hashItems: this.generateHashItems(),
      // isDialagueOn: false,
      // dialogueMessage: {
      //   title: '',
      //   desc: '',
      //   cta: {
      //     negative: {label: '', action: null},
      //     positive: {label: '', action: null},
      //   },
      //   priority: true,
      // },
    }
  },
  // emits: ['throw-data'], not emitting anymore, just using injected method
  inject: ['generateTitle', 'generateDesc', 'generateLink', 'generateTheme', 'processData', 'loadData', 'resourceInfo', 'generateHashItems', 'bgThemes', 'isDialagueOn', 'throwDialogue', 'dialogueMessage', 'acknowledgeDialogue'],
  props: {
    isLight: Boolean,
  },
  computed: {
    formStatus() {
      return !(!this.resource.title.trim() || !this.resource.desc.trim())
    },
  },
  methods: {
    clearFields() {
      this.resource = Object.assign({
        title: '',
        desc: '',
        link: '',
        theme: this.bgThemes[0],
        isPinned: 0,
        hash: [],
      })
    },
    throwFormData() {
      // check if user did not enter domain name
      if (this.resource.link === 'http://www.') {
        this.throwDialogue({
          title: 'Not a valid URL!',
          desc: 'Please make sure to fill up the URL field after the www. word. Non-compliance will result in the termination of your contract.',
          cta: {
            negative: {label: 'Dismiss', action: 'dismiss'},
            positive: {label: 'OK, got it!', action: this.positiveAction},
          },
          priority: false,
        })
        return
      }

      // check if user included domain name extension
      if (this.resource.link && this.resource.link.toLowerCase().indexOf('.com') === -1) {
        this.throwDialogue({
          title: `'${this.resource.link}' has no domain extension`,
          desc: 'Please add ".com" for every website URL that you enter! Prototype and test end-to-end with the Local Emulator Suite, now with Firebase Authentication Prototype and test end-to-end with the Local Emulator Suite, now with Firebase Authentication',
          cta: {
            negative: {label: 'Dismiss', action: 'dismiss'},
            positive: {label: 'Add Domain Ext', action: this.addDomainExt},
          },
          priority: true,
        })
        return
      }

      // if all checks are good
      // this.processData(this.resource, 'catalogue-wall')

      // send data to firebase
      fetch('https://resource-catalogue-default-rtdb.firebaseio.com/catalogue.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.resource),
      })

      this.clearFields()

      setTimeout(() => {
        this.refreshData()
        this.loadData()
      }, 1000)
    },
    refreshData() {
      this.hashItems = this.generateHashItems()
      return (this.resource = {
        title: this.generateTitle(),
        desc: this.generateDesc(),
        link: this.generateLink(),
        theme: this.generateTheme(),
        isPinned: 0,
        hash: [],
      })
    },
    positiveAction() {
      this.resource.link = 'http://www.forgetyou.com'
      this.acknowledgeDialogue()
      this.$refs.titleInput.focus()
    },
    addDomainExt() {
      this.resource.link = this.resource.link + '.com'
      this.acknowledgeDialogue()
      this.$refs.titleInput.focus()
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.main-wrap {
  display: flex;
  margin: 1rem;
  .form {
    display: flex;
    flex-direction: column;
    .data-wrap {
      display: flex;
      .segment-wrap {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        .flex-wrapper {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          .radio {
            display: flex;
            flex-direction: column;
            margin: 0;
            div {
              display: flex;
              align-items: center;
              margin: 0;
              padding: 0.2rem 0 0.2rem 0.75rem;
              cursor: pointer;
              border-radius: 0.25rem;
              &:hover {
                background-color: #5555554d;
              }

              label {
                margin: 0 0 0 0.2rem;
                padding: 0.5rem 0;
                flex: 1;
              }
              input {
                width: auto;
                margin-top: 0;
              }
            }
          }
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          cursor: pointer;
          // font-size: 0.75rem;
        }
        div {
          margin: 0.5rem 0;
        }
        input,
        textarea,
        select {
          font-family: inherit;
          font-size: inherit;
          padding: 1rem;
          width: 20rem;
          color: #262626;
          resize: none;
          border-radius: 0.25rem;
          border: 1px solid #ccc;
          margin: 0;
        }
        select {
          min-width: 18rem;
          width: auto;
        }
        .title {
          font-weight: bold;
        }
      }
    }
    .button-wrap {
      display: flex;
      margin: 1rem;

      .btn-advanced {
        margin-right: auto;
      }
      .clear {
        margin-left: auto;
      }
      .add {
        margin-left: 0.5rem;
      }
    }
  }
}

@media only screen and (max-width: 375px) {
  .main-wrap {
    justify-content: center;
    .form {
      flex: 1;
      padding: 1rem;

      input,
      textarea {
        width: 100%;
        box-sizing: border-box; // fits it inside the box having 100% width minus paddings
      }
      // padding-top: 2rem;
    }
  }
}
</style>
