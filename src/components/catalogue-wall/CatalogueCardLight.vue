<template>
  <div class="card-wrap">
    <div class="card">
      <div class="circle">CP</div>
      <div class="content-wrap">
        <h3 class="title"><slot name="title"></slot></h3>
        <h1 class="desc"><slot name="desc"></slot></h1>
        <div class="button"><slot name="button"></slot></div>
      </div>
    </div>
    <slot name="delete"></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.card-wrap {
  width: calc(100% / 3);
  position: relative;

  .card {
    display: flex;
    background-color: #eee;
    color: #262626;
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 0.75rem 0.75rem 0.75rem 0;
    min-height: 10rem;

    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 3rem;
      height: 3rem;
      border-radius: 50%;
      color: #999;
      background: #fff;
      font-weight: bold;
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
      }
      .desc {
        margin: 0.5rem 0;
        color: #444;
        font-size: 0.9rem;
        font-weight: normal;
      }
      .button {
        display: flex;
        align-self: flex-end;
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
