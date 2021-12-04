<template>
<button class="PureButton"><slot /></button>
</template>

<style lang="scss" scoped>
  .PureButton {
    appearance: none;
    border: 1px solid #fff;
    background-color: var(--theme-dark);
    color: #fff;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 3px;
    cursor: pointer;
    &:active {
      filter: brightness(0.8);
    }
    &:disabled {
      background-color: #aaa;
    }
  }
</style>