<template>
    <div class="block__item-content block__item-content--bg">
        <p v-if="item.ВидСрока"><b> {{ item.ВидСрока }} </b></p>
        <p v-if="item.СрокДата"> {{ item.СрокДата }} </p>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        item: Object,
    },
}
</script>
