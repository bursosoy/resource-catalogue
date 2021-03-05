<template>
  <div class="card-wrap">
    <slot name="confirmation"></slot>
    <base-card class="card" :cardType="{light : true}" :bgTheme="theme.style">
      <div class="icons">
        <div class="pin">
          <slot name="pin"></slot>
        </div>
        <slot name="thumbnail"></slot>
      </div>
      <div class="content-wrap">
        <h3 class="title"><slot name="title"></slot></h3>
        <h1 class="desc"><slot name="desc"></slot></h1>
        <slot name="hash"></slot>
        <div class="button-wrap"><slot name="visitButton"></slot></div>
      </div>
    </base-card>
    <slot name="delete"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    theme: Object,
  },
  methods: {
    // checkCardType() {
    //   let cardType = ''
    //   if (this.theme.name === 'smoke') {
    //     cardType = {light: true, smoke: true}
    //   } else if (this.theme.name === 'dotted') {
    //     cardType = {light: true, dotted: true}
    //   } else if (this.theme.name === 'pattern') {
    //     cardType = {light: true, pattern: true}
    //   } else cardType = {light: true}
    //   return cardType
    // },
  },
}
</script>

<style lang="scss" scoped>
.card-wrap {
  display: flex;
  width: calc(100% / 3);
  position: relative;
  min-width: -webkit-min-content; // don't shrink beyond content

  .card {
    display: flex;
    flex: 1;
    min-height: 10rem;

    .icons {
      position: relative;
      .pin {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: -0.3rem;
        right: -0.3rem;
      }
    }

    .content-wrap {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      flex: 1;

      h1,
      div {
        flex: 1;
      }

      .title {
        margin: 0;
        padding-top: 0.5rem;
        font-size: 1.2rem;
        color: #262626;
      }
      .desc {
        margin: 0.5rem 0;
        color: #444;
        font-size: 0.9rem;
        font-weight: normal;
      }
      .button-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        margin-top: 1rem;
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  .card-wrap {
    width: calc(100% / 2);
  }
}

@media only screen and (max-width: 550px) {
  .card-wrap {
    width: 100%;
  }
}
</style>
