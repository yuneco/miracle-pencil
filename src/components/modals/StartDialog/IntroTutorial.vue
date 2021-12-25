<template>
  <div class="IntroTutorial">
    <CircleButton
      class="prevNext prev"
      :border="0"
      v-show="pageIndex >= 1"
      @click="pageIndex--"
    >
      ◀︎
    </CircleButton>
    <div class="frame">
      <div
        class="pages"
        :style="{
          transform: `translateX(${pageIndex * -100}%)`,
        }"
      >
        <div class="page page1">1ページ目</div>
        <div class="page page1">2ページ目</div>
        <div class="page page1">3ページ目</div>
      </div>
      <div class="dots">
        <span
          class="dot"
          v-for="pageNo in 3"
          :key="pageNo"
          :class="{ active: pageNo - 1 === pageIndex }"
          >●</span
        >
      </div>
    </div>
    <CircleButton
      class="prevNext next"
      :border="0"
      v-show="pageIndex < PAGE_COUNT - 1"
      @click="pageIndex++"
    >
      ▶︎
    </CircleButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CircleButton from '../../common/CircleButton.vue'
const PAGE_COUNT = 3
const pageIndex = ref(0)
</script>

<style lang="scss" scoped>
.IntroTutorial {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  .prevNext {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    &.prev {
      left: 0;
    }
    &.next {
      right: 0;
    }
  }
  .frame {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // background-color: #ffffff11;
    // border: 1px solid #fff;
    border-radius: 4px;
    .pages {
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      transition: transform 0.3s;
      .page {
        width: 100%;
        height: 100%;
        padding: 8px 16px;
        overflow-y: scroll;
        flex-shrink: 0;
        font-size: 12px;
      }
    }
    .dots {
      position: absolute;
      z-index: 1;
      width: 100%;
      bottom: 0;
      text-align: center;
      .dot {
        opacity: 0.3;
        &.active {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
