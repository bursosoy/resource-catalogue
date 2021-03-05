<template>
  <div class="dialogue-wrap">
    <dialog open :class="dialogueSize" style="max-width: 50%">
      <base-card class="dialog-card" :cardType="{light: true}">
        <slot name="title">
          <div class="title" :class="{'custom-title' : dialogueMessage.priority}">{{ dialogueMessage.title }}</div>
          <!--this will be added if template for slot is not provided-->
        </slot>
        <div class="desc">{{ dialogueMessage.desc }}</div>
        <div class="buttons">
          <div v-if="dialogueMessage.cta.negative">
            <base-button btnType="link" @click="dialogueMessage.cta.negative.action === 'dismiss' ? $emit('dismiss') : dialogueMessage.cta.negative.action()">{{
              dialogueMessage.cta.negative.label
            }}</base-button>
          </div>
          <div v-if="dialogueMessage.cta.positive">
            <base-button v-if="dialogueMessage.cta.positive.action !== 'dismiss'" btnType="blue" @click="dialogueMessage.cta.positive.action">{{ dialogueMessage.cta.positive.label }}</base-button>
          </div>
        </div>
        <base-button btnType="close" class="btn-close" @click="$emit('dismiss')">X</base-button>
      </base-card>
    </dialog>
    <div class="scrim" @click="$emit('dismiss')"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  emits: ['dismiss'],
  props: {
    dialogueSize: String,
    dialogueMessage: Object,
  },
}
</script>

<style lang="scss" scoped>
.dialogue-wrap {
  display: flex;
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  justify-content: center;
  // align-items: center;
  dialog {
    // position: relative;
    z-index: 11;
    background: none;
    border: none;
    padding: 0;
    min-width: 16rem;
    margin-top: calc(100vh * 0.3);
    .dialog-card {
      margin: 0;
      padding: 1.5rem;

      .custom-title {
        color: rgb(236, 36, 36);
        font-weight: bold;
        font-size: 1.2rem;
      }

      .title {
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }

      .desc {
        margin-top: 0.5rem;
      }

      .btn-close {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
        div {
          margin-left: 0.5rem;
        }
      }
    }
  }
}

// dialogue box widths
.dialog25 {
  max-width: 25%;
}

.dialog50 {
  max-width: 50%;
}

.scrim {
  background-color: #000000e6;
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: grayscale(1) blur(3px) contrast(0.5);
}
</style>
