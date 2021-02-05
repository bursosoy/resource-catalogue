<template>
  <button :class="btnType"><slot></slot></button>
</template>

<script>
export default {
  props: {
    btnType: String,
  },
}
</script>

<style lang="scss" scoped>
.blue {
  padding: 0.5rem 1rem;
  font-weight: bold;
  background-color: #009fd9;
  color: #fff;

  &:hover {
    background-color: #009fd9cc;
  }
}

.disabled {
  background-color: #444;
  color: #555;
  &:hover {
    background-color: #444;
  }
}

.url {
  padding: 0.5rem 0.8rem;
  color: #aaa;
  background-color: #1a1a1a;

  &:hover {
    background-color: #222;
    color: #eee;
  }
}

.close {
  background-color: #222;
  color: #eee;
  border: 1px #444 dashed;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: Alte Haas Grotesk;
  font-size: 0.5rem;

  &:hover {
    background-color: #111;
    transform: scale(1.2);
  }
}

.top-right {
  position: absolute;
  right: 0;
  top: 0;
}

button {
  font-family: inherit;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }

  &:active:hover {
    transform: scale(0.97);
  }
}
</style>
