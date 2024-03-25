<template>
    <div class="block__item-content block__item-content--bg">
        <p><b> {{ item.Наименование }} </b></p>
        <p v-if="item.Роль"> {{ item.Роль }} </p>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        item: Object,
    },
}
</script>
  