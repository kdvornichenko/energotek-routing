<template>
    <div class="block__item-content block__item-content--bg">
        <p><b> {{ item.Номенклатура }} </b></p>
        <p class="block__item-row" v-if="count">
            <span>Количество: </span>
            <span><b> {{ count + ' ' + item.ЕдиницаИзмерения}} </b></span>
        </p>
        <p class="block__item-row" v-if="total">
            <span>Сумма: </span>
            <span><b> {{ total }} </b></span>
        </p>
        <p class="block__item-row" v-if="price">
            <span>Цена: </span>
            <span><b> {{ price }} </b></span>
        </p>
    </div>
</template>

<script lang="ts">
import { getFormattingPrice } from '../assets/ts/helpers'

export default {
    props: {
        item: Object,
    },
    computed: {
        count() {
            return this.item.Количество ? getFormattingPrice(this.item.Количество) : null
        },
        total() {
            return this.item.Сумма ? getFormattingPrice(this.item.Сумма) : null
        },
        price() {
            return this.item.Цена ? getFormattingPrice(this.item.Цена) : null
        },
    },
}
</script>
