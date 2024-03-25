<template>
  <main class="main">
    <Header>
      <template v-slot:title><slot name="title"></slot></template>
      <template v-slot:crumbs><slot name="crumbs"></slot></template>
    </Header>

    <div class="main__content container">
      <slot></slot>
    </div>

    <Nav />
  </main>
</template>

<script>
import Header from '../components/Header.vue'
import Nav from '../components/Nav.vue'

export default {
  components: {
    Header,
    Nav,
  },
}
</script>
  