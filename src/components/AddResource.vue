<template>
  <div class="main-wrap">
    <div class="form">
      <div><input class="title" type="text" v-model="title" placeholder="Title here..." /></div>
      <div><textarea rows="4" cols="70" v-model="desc" placeholder="Description here..."/></div>
      <div><input type="text" v-model="link" /></div>
      <div class="buttons">
        <button @click="clearFields()">Clear</button>
        <button @click="throwFormData()">Add New</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.randomTitle(),
      desc: this.randomDesc(),
      link: this.randomLink(),
    }
  },
  inject: ['randomTitle', 'randomDesc', 'randomLink'],
  props: {
    foo2: String,
  },
  methods: {
    clearFields(){
      this.title = '',
      this.desc = '',
      this.link = 'http://www.'
    },
    throwFormData() {
      if (!this.title || !this.desc) return
      this.$emit(
        'throw-data',
        {
          title: this.title,
          desc: this.desc,
          link: this.link,
        },
        'catalogue-wall'
      )
    },
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
    .buttons {
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
</style>
