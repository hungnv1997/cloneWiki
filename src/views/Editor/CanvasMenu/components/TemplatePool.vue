<template>
  <div>
    <el-row class="layout-search">
      <el-input
        :prefix-icon="Search"
        :placeholder="MULTILANG.content_thumb.template.search_placeholder"
      ></el-input>
    </el-row>
    <el-tabs v-model="activeTemplate" class="layout-tabs">
      <el-tab-pane
        :label="MULTILANG.content_thumb.template.recomment_template"
        name="data"
      >
        <div class="layout-templates">
          <div
            v-for="(item, index) in Templates"
            :key="index"
            class="thumbnail"
          >
            <img :src="item.url" alt="" style="width: 124px; height: 74.4px" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="MULTILANG.content_thumb.template.my_template"
        name="self"
      >
        <el-radio-group
          v-model="activeSelfTemplate"
          size="large"
          class="full-ratio"
        >
          <el-radio-button
            value="buy"
            :label="MULTILANG.content_thumb.template.bought_template"
          />
          <el-radio-button
            value="collect"
            :label="MULTILANG.content_thumb.template.shared_template"
          />
        </el-radio-group>
      </el-tab-pane>
      <el-tab-pane
        :label="MULTILANG.content_thumb.template.team_teamplate"
        name="team"
        >{{ MULTILANG.content_thumb.template.team_teamplate }}</el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
// import { storeToRefs } from 'pinia'
// import { useSlidesStore } from '@/store'
import { Templates } from "@/mocks/templates";
import { MULTILANG } from "@/constants/multilang";
// import { TemplateAPIData } from '@/api/types'

const activeTemplate = ref("data");
const activeSelfTemplate = ref("buy");
// const selectSlideTemplate = (tid: string) => {
//   const templateDetail = templateInfo.value.filter(template => template.template_id === tid)[0]
//   emit('select', JSON.parse(templateDetail.template_data))
// }

// onMounted(async () => {
//   const queryData = await getTemplateInfoData()
//   templateInfo.value = queryData.data.data
// })
</script>

<style lang="scss" scoped>
.layout-search {
  margin: 0 auto;
  width: 68%;
  padding: 20px 10px 10px;
}
.layout-tabs {
  width: 90%;
  margin: 0 auto;
}
.layout-templates {
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
  .thumbnail {
    display: flex;
    width: 124px;
    margin: 2px;
  }
  .thumbnail img {
    outline: 1px solid $borderColor;
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      outline-color: $themeColor;
    }
  }
}
.full-ratio {
  display: flex;
  flex: 1;
  .el-radio-button {
    width: 50%;
  }
  .el-radio-button__inner {
    width: 100%;
  }
}
:deep(.full-ratio .el-radio-button__inner) {
  width: 100%;
}
</style>
<style>
.el-tabs .el-tabs__nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 100%;
}
</style>
