<template>
    <div class="select" :class="classList" :name="select.name">
        <button class="select__btn" type="button" @click="toggleSelect">
            <SvgIcon class="select__btn-icon" v-if="select.icon" :name="select.icon" />
            <span class="select__btn-text">
                <SvgIcon v-if="btnIcon" :name="btnIcon" />
                <span>{{ btnText }}</span>
            </span>
            <SvgIcon class="select__btn-arrow" :name="'arrow-down'" />
        </button>
        <div class="select__content" :style="{ 'height': height + 'px' }">
            <div class="select__content-inner" ref="content">
                <div class="select__option" v-for="option in options" :key="option.value">
                    <input type="radio" :name="select.name" :value="option.value" :id="option.value" :checked="option.value === value" @change="checkOption(option)">
                    <label :for="option.value"> 
                        <SvgIcon v-if="option.icon" :name="option.icon" />
                        <span>{{ option.text }}</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        select: Object,
        value: String,
    },
    data() {
        return {
            isOpen: false,
            contentHeight: 0
        }
    },
    computed: {
        classList() {
            let str = 'select--' + this.select.type + ' ' + 'select--' + this.select.name
            if (this.isOpen) {
                str += ' select--open'
            }
            return str
        },
        options() {
            return this.select.options.filter(option => option.value !== this.value)
        },
        checkedOption() {
            return this.select.options.find(option => option.value === this.value)
        },
        btnText() {
            return this.checkedOption ? this.checkedOption.text : this.select.placeholder
        },
        btnIcon() {
            return this.checkedOption ? this.checkedOption.icon : null
        },
        height() {
            return this.isOpen ? this.contentHeight : 0
        },
    },
    emits: ['select:change'],
    mounted() {
        this.setHeight()
        document.addEventListener('click', e => {
            if (!e.target.closest('.select--' + this.select.name) && this.isOpen) {
                this.closeSelect()
            }
        })
    },
    watch: {
        value() {
            setTimeout(() => {
                this.setHeight()
            }, 300);
        }
    },
    methods: {
        setHeight() {
            this.contentHeight = this.$refs.content.offsetHeight
        },
        checkOption(option) {
            this.$emit('select:change', option.value)
            this.closeSelect()
        },
        openSelect() {
            this.isOpen = true
        },
        closeSelect() {
            this.isOpen = false
        },
        toggleSelect() {
            this.isOpen = !this.isOpen
        },
    }
})
</script>