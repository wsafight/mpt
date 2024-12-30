<script setup>
const PANE_LIST = [
  {
    title: 'pages.dashboardBase.topPanel.card1',
    number: '¥ 28,425.00',
    upTrend: '20.5%',
    leftType: 'echarts-line',
  },
  {
    title: 'pages.dashboardBase.topPanel.card2',
    number: '¥ 768.00',
    downTrend: '20.5%',
    leftType: 'echarts-bar',
  },
  {
    title: 'pages.dashboardBase.topPanel.card3',
    number: '1126',
    upTrend: '20.5%',
    leftType: 'icon-usergroup',
  },
  {
    title: 'pages.dashboardBase.topPanel.card4',
    number: 527,
    downTrend: '20.5%',
    leftType: 'icon-file-paste',
  },
];

</script>
<template>
    <el-row :gutter="8">
        <el-col v-for="val in PANE_LIST" class="my-2" :xs="6" :lg="3">
            <el-card >
                <div>总收入</div>
            </el-card>
        </el-col>
    </el-row>
</template>