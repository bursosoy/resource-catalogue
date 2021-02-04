<template>
  <div class="card-wrap">
    <div class="card">
      <div class="content-wrap">
        <h3 class="title"><slot name="title"></slot></h3>
        <h1 class="desc"><slot name="desc"></slot></h1>
      </div>
      <div class="bottom">
        <!-- <div class="button"><slot name="visitButton"></slot></div> -->
        <div class="url"><slot name="url"></slot></div>
        <div class="thumbnail"><slot name="thumbnail"></slot></div>
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
    flex-direction: column;
    background-color: #262626;
    color: #eee;
    margin: 0.5rem;
    padding: 1.2rem;
    border-radius: 0.75rem 0.75rem 0.75rem 0;
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
      .thumbnail {
        width: 3rem;
        height: 3rem;
      }
      .button {
        display: flex;
        align-self: center;
      }
      .url{
        align-self: center;
        cursor: pointer;
        padding: 0.5rem 0.8rem;
        background-color: #1a1a1a;
        border-radius: 0.25rem;
        color: #aaa;
        &:hover{
          background-color: #222;
          color: #eee;
        }
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
