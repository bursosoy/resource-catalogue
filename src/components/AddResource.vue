<template>
  <div class="main-wrap">
    <div class="form">
      <div><input class="title" type="text" v-model="resource.title" placeholder="Title here..." /></div>
      <div><textarea rows="4" cols="70" v-model="resource.desc" placeholder="Description here..."/></div>
      <div><input type="text" v-model="resource.link" /></div>
      <div class="button-wrap">
        <base-button :btnType="resource.title || resource.desc ? 'blue' : 'blue disabled'"  @click="clearFields()">Clear</base-button>
        <base-button :btnType="formStatus ? 'blue' : 'blue disabled'" :disabled="!formStatus" @click="throwFormData()">Add New</base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resource:{
      title: this.randomTitle(),
      desc: this.randomDesc(),
      link: this.randomLink()}
    }
  },
  emits:['throw-data'],
  inject: ['randomTitle', 'randomDesc', 'randomLink','processData'],
  props: {
    foo2: String,
  },
  computed:{
    formStatus(){
      return !(!this.resource.title || !this.resource.desc)
    }
  },
  methods: {
    clearFields(){
      this.resource.title = '',
      this.resource.desc = '',
      this.resource.link = 'http://www.'
    },
    throwFormData(){
      this.processData(this.resource,'catalogue-wall')
      this.clearFields()
    }
    // throwFormData() {
    //   if (!this.title || !this.desc) return
    //   this.$emit(
    //     'throw-data',
    //     {
    //       title: this.title,
    //       desc: this.desc,
    //       link: this.link,
    //     },
    //     'catalogue-wall'
    //   )
    //   this.clearFields()
    // },
  },
}
</script>

<style lang="scss" scoped>
.main-wrap {
  display: flex;
  .form {
    display: flex;
    flex-direction: column;
    padding: 2rem;

    div {
      margin: 0.5rem 0;
    }
    .button-wrap {
      align-self: flex-end;
      margin-top: 1.5rem;
      button{
        margin-left: 0.5rem;
      }
    }
    input,
    textarea {
      font-family: inherit;
      font-size: inherit;
      padding: 0.5rem;
      width: 20rem;
      color: #262626;
      resize: none;
    }
    .title {
      font-weight: bold;
    }
  }
}

@media only screen and (max-width: 375px) {
  .main-wrap{
    justify-content: center;
    .form{
    padding: 0;
    padding-top: 2rem;
    }
  }
}
</style>
