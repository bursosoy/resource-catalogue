<template>
  <div class="card-wrap">
    <base-card class="card" cardType="light">
      <div><slot name="thumbnail"></slot></div>
      <div class="content-wrap">
        <h3 class="title"><slot name="title"></slot></h3>
        <h1 class="desc"><slot name="desc"></slot></h1>
        <div class="button-wrap"><slot name="visitButton"></slot></div>
      </div>
    </base-card>
    <slot name="delete"></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.card-wrap {
  display: flex;
  width: calc(100% / 3);
  position: relative;
  min-width: -webkit-min-content; // don't shrink beyond content

  .card {
    display: flex;
    margin: 0.5rem;
    padding: 1rem;
    min-height: 10rem;

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
