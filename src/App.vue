<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script lang="ts">
import Layout from './layouts/default.vue'

export default {
  components: {
    Layout,
  }
}
</script>
