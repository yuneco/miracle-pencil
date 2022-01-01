<template>
  <div class="StartDialog">
    <PlaneBox :backgroundColor="theme.themeDark">
      <div class="close">
        <CloseButton
          @click="emit('close')"
          :bgColor="theme.themeDark"
          foreColor="#fff"
        />
      </div>
      <div class="content">
        <div class="title">Miracle Pencil</div>
        <div class="body">
          <dl>
            <div class="item">
              <dd>Version</dd>
              <dt>{{INFO.VERSION}}</dt>
            </div>
            <div class="item">
              <dd>Release</dd>
              <dt>{{INFO.RELEASE_DATE}}</dt>
            </div>
            <div class="item">
              <dd>Made by</dd>
              <dt><a :href="INFO.AUTHOR_TW" target="blank" rel="noopener">{{INFO.AUTHOR}}</a></dt>
            </div>
          </dl>
          <div class="repo">
            See <a :href="INFO.REPOSITORY" target="blank" rel="noopener">GitHub repository</a> for more information.
          </div>
          <div class="new" v-if="hasNew">
            🌟 New version available. Reload to update 🌟
          </div>
        </div>
        <div class="buttons">
          <PureButton @click="emit('close')">OK</PureButton>
          <PureButton v-if="shouldShowReload" @click="reload">Reload App</PureButton>
        </div>
      </div>
    </PlaneBox>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import CloseButton from '../../common/CloseButton.vue'
import PlaneBox from '../../common/PlaneBox.vue'
import PureButton from '../../common/PureButton.vue'
import { theme } from '../../../consts/theme'
import *  as INFO from '../../../consts/appInfo'
import { useConfirmStore } from '../../../stores/ConfirmStore'
import { hasNewVersion } from '../../../logics/versionCheck/hasNewVersion'
import { isInPwa } from '../../../logics/versionCheck/isInPwa'
const {confirm} = useConfirmStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const shouldShowReload = isInPwa()
const reload = async () => {
  const isOk = (await confirm('Reloading screen will clear the canvas. Is it ok with you?', 'RELOAD', 'Cancel', 'danger')) === 'yes'
  if (!isOk) return
  window.location.reload()
}

const hasNew = ref(false)
onMounted(async () => {
  hasNew.value = await hasNewVersion()
})
</script>

<style lang="scss" scoped>
.StartDialog {
  width: min(90vw, 640px);
  height: min(80vh, 480px);
  .close {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .content {
    min-height: 400px;
    display: grid;
    grid-template-rows: 2em 1fr 50px;
    .title {
      font-weight: bold;
      color: #fff;
      padding-bottom: 16px;
      padding-top: 16px;
      font-size: 22px;
      letter-spacing: 0.2em;
      text-align: center;
    }
    .body {
      padding-top: 24px;
      color: #fff;
      .item {
        display: flex;
        gap: 16px;
        dd {
          width: 30%;
          text-align: right;
          font-weight: bold;
        }
      }
      .repo {
        text-align: center;
      }
      a {
        color: rgb(253, 220, 113);
      }

      .new {
        text-align: center;
      }

}
    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding-top: 20px;
    }
  }
}
</style>
