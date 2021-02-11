<template>
  <div class="card-wrap">
    <slot name="confirmation"></slot>
    <base-card class="card" :cardType="{dark: true, fiesta: theme === 'xmas'}">
      <div class="content-wrap">
        <h3 class="title"><slot name="title"></slot></h3>
        <h1 class="desc"><slot name="desc"></slot></h1>
        <slot name="hash"></slot>
      </div>
      <div class="bottom">
        <div class="url-wrap">
          <div class="pin" v-if="url">
            <slot name="pin"></slot>
          </div>
          <slot name="url"></slot>
        </div>
        <slot name="thumbnail"></slot>
      </div>
    </base-card>
    <div class="close"><slot name="delete"></slot></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    theme: String,
    url: String
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
    flex-direction: column;
    min-height: 10rem;

    .content-wrap {
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
        font-size: 1.5rem;
      }
      .desc {
        margin: 0.5rem 0;
        color: #999;
        font-size: 0.9rem;
        font-weight: normal;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;

      .url-wrap {
        align-self: flex-end;
        position: relative;
        .pin{
          position: absolute;
          width: 1.2rem;
          height: 1.2rem;
          right: -0.5rem;
          top: -0.5rem;
        }
      }
    }
  }

  .close {
    position: absolute;
    top: 0;
    left: 1.5rem;
  }
}

@media only screen and (max-width: 930px) {
  .card-wrap {
    width: calc(100% / 2);
  }
}

@media only screen and (max-width: 630px) {
  .card-wrap {
    width: 100%;
  }
}
</style>
