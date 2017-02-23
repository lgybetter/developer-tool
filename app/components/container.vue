<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="less">
.container {
  margin: 20px 20px 20px 20px;
}

@media (min-width: 1204px) {
  .container {
    margin: 25px 25px 25px 25px;
  }
}

@media (min-width: 1920px) {
  .container {
    margin: 60px 60px 60px 60px;
  }
}
</style>