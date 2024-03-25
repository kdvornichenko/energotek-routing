<template>
    <component :is="component" class="project-card" :to="component === 'router-link' ? '/projects/' + project.GUID : null">
        <div class="project-card__name"> {{ project.Наименование }} </div>
        <div class="project-card__row">
            <div class="project-card__status">
                <SvgIcon :name="'time'"/>
                <span> {{ project.Статус }} </span>
            </div>
            <div class="project-card__price">
                <SvgIcon :name="'price'"/>
                <span> {{ price }} </span>
            </div>
        </div>
        <div class="project-card__place">
            <span v-if="project.Город" class="project-card__city"> {{ project.Город }} </span>
            <!-- <span v-if="project.ФедеральныйОкруг" class="project-card__region"> {{ project.ФедеральныйОкруг }} </span> -->
            <span v-if="project.Автор" class="project-card__author"> {{ project.Автор }} </span>
        </div>
    </component>
</template>

<script type="ts">
import { getFormattingPrice } from '../assets/ts/helpers'

export default {
    props: {
        project: Object,
        component: String,
    },
    computed: {
        price() {
            return getFormattingPrice(this.project.Стоимость)
        },
    },
}
</script>