<template>
    <div class="block__item-content block__item-content--bg">
        <p v-if="item.Наименование"><b> {{ item.Наименование }} </b></p>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        item: Object,
    },
}
</script>
  