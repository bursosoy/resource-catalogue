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
              <option v-for="theme in themes" :key="theme" :value="theme">{{theme.charAt(0).toUpperCase() + theme.slice(1)}}</option>
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
                <input type="radio" id="no" name="pin" :value="0" v-model="resource.isPinned"/>
                <label for="no">No</label>
              </div>
            </div>
          </div>
          <div class="flex-wrapper">
            <label for="check-selections">Available tags:</label>
            <div id="check-selections" class="radio">
              <div v-for="hash in hashItems" :key="hash">
                <input type="checkbox" :id="hash" :name="hash" :value="hash" v-model="resource.hash"/>
                <label :for="hash">#{{hash}}</label>
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
    <base-dialog dialogSize="dialog25" @dismiss="acknowledgeError" v-if="isErrorExist" :errorMessage="errorMessage">
      <template #title v-if="errorMessage.priority">
        <div class="custom-title">{{ errorMessage.title }}</div>
      </template>
    </base-dialog>
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
        theme: 'select',
        isPinned: 0,
        hash: []
      },
      isErrorExist: false,
      isAdvanced: false,
      errorMessage: {
        title: '',
        desc: '',
        cta: {
          negative: {label: '', action: null},
          positive: {label: '', action: null},
        },
        priority: true,
      },
      hashItems: this.generateHashItems()
    }
  },
  // emits: ['throw-data'], not emitting anymore, just using injected method
  inject: ['generateTitle', 'generateDesc', 'generateLink', 'generateTheme', 'processData', 'resourceInfo','themes','generateHashItems'],
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
        theme: 'select',
        isPinned: 0,
        hash: []
      })
    },
    throwFormData() {
      // check if user did not enter domain name
      if (this.resource.link === 'http://www.') {
        const error = Object.assign({
          title: 'Not a valid URL!',
          desc: 'Please make sure to fill up the URL field after the www. word. Non-compliance will result in the termination of your contract.',
          cta: {
            negative: {label: 'Dismiss', action: 'dismiss'},
            positive: {label: 'OK, got it!', action: this.positiveAction},
          },
          priority: false,
        })
        this.throwError(error)
        return
      }

      // check if user included domain name extension
      if (this.resource.link && this.resource.link.toLowerCase().indexOf('.com') === -1) {
        const error = Object.assign({
          title: `'${this.resource.link}' has no domain extension`,
          desc: 'Please add ".com" for every website URL that you enter!',
          cta: {
            negative: {label: 'Dismiss', action: 'dismiss'},
            positive: {label: 'OK, got it!', action: this.addDomainExt},
          },
          priority: true,
        })
        this.throwError(error)
        return
      }

      // check if user has not selected any theme
      if (this.isAdvanced) {
        if (this.resource.theme === 'select') {
          const error = Object.assign({
            title: 'No themes?',
            desc: 'Please select at least one from the theme dropdown',
            cta: {
              negative: {label: 'Dismiss', action: 'dismiss'},
              positive: {label: 'OK, got it!', action: 'dismiss'},
            },
            priority: false,
          })
          this.throwError(error)
          this.resource.theme = this.generateTheme()
          return
        }
      }

      // if all checks are good
      this.processData(this.resource, 'catalogue-wall')
      this.clearFields()
    },
    refreshData() {
      this.hashItems = this.generateHashItems()
      return (this.resource = {
        title: this.generateTitle(),
        desc: this.generateDesc(),
        link: this.generateLink(),
        theme: 'select',
        isPinned: 0,
        hash: []
      })
    },
    throwError(error) {
      this.isErrorExist = true
      Object.assign(this.errorMessage, error)
    },
    acknowledgeError() {
      this.isErrorExist = false
    },
    positiveAction() {
      this.resource.link = 'http://www.fuckyou.com'
      this.acknowledgeError()
      this.$refs.titleInput.focus()
    },
    addDomainExt() {
      this.resource.link = this.resource.link + '.com'
      this.acknowledgeError()
      this.$refs.titleInput.focus()
    },
    negativeAction() {
      return 'dismiss'
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
  .custom-title {
    color: salmon;
    font-weight: bold;
    font-size: 1.2rem;
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
