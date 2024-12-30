<script setup>
import TopPanel from './components/TopPanel.vue'
</script>
<template>
  <div class="p-4" style="height: 20000px;">
    <!-- 顶部 card  -->
    <!-- <top-panel class="row-container" /> -->
    <!-- 中部图表  -->
    <!-- <middle-chart class="row-container" /> -->
    <!-- 列表排名 -->
    <!-- <rank-list class="row-container" /> -->
    <!-- 出入库概览 -->
    <!-- <output-overview class="row-container" /> -->
  </div>
</template>


<style scoped lang="scss">
.row-container:not(:last-child) {
  margin-bottom: 16px;
}
</style>