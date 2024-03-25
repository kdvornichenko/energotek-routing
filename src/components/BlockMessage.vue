<template>
    <component
        :is="item.Ссылка ? 'a' : 'div'"
        @click="getFile" ref="pdf"
        :class="{'block__item-content--link': !!item.Ссылка}"
        class="block__item-content block__item-content--bg"
    >
        <SvgIcon v-if="item.Ссылка" class="block__item-icon" :name="'download'" />
        <p v-if="item.Текст"><b> {{ item.Текст }} </b></p>
        <p> {{ date }} - {{ item.Автор }} </p>
    </component>
</template>

<script lang="ts">
import { getFormattingDate } from '../assets/ts/helpers'
import { useDocumentStore } from '../stores/document'

export default {
    setup() {
        const documentStore = useDocumentStore()
        const { getDocument } = documentStore
        return { getDocument }
    },
    props: {
        item: Object,
    },
    computed: {
        date() {
            return getFormattingDate(this.item.Дата)
        }
    },
    methods: {
        getFile() {
            const link = this.$refs.pdf
            if (!this.item.Ссылка || link.getAttribute('href')) return;
            this.getDocument({url: this.item.Ссылка})
                .then(data => {
                    const fileURL = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' })); 
                    link.setAttribute('href', fileURL);
                    link.setAttribute('target', '_blank');
                    link.click();
                })
        },
    },
}
</script>
  