<template>
  <NFlex align="center" justify="center" size="small" :vertical="true">
    <NFloatButton shape="square" height="60" width="60" position="relative" >
      Teste
    </NFloatButton>
    <NFloatButton shape="square" height="60" width="60" position="relative">Peste</NFloatButton>
    <NFloatButton shape="square" height="60" width="60" position="relative">
      <NIcon><Balloon /></NIcon>
    </NFloatButton>
    <NFloatButton shape="square" height="60" width="60" position="relative">
      Teste
    </NFloatButton>
    <NFloatButton shape="square" height="60" width="60" position="relative">Peste</NFloatButton>
    <NFloatButton shape="square" height="60" width="60" position="relative">
      <NIcon><Balloon /></NIcon>
    </NFloatButton>
  </NFlex>
</template>

<script setup lang="ts">
import { NFloatButton, NIcon, NFlex } from 'naive-ui';
import { Balloon } from '@vicons/ionicons5';
</script>

<style>
.n-float-button {
  font-size: small;
}
</style>