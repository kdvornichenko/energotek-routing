<template>
    <div class="pagination">
        <div class="pagination__page" :class="{'is-active': page.link === pagination.pagenum}" v-for="page in pages" :key="page.text">
            <router-link v-if="page.component === 'router-link'" :to="link + `${this.queryString ? '&pagenum=' : 'pagenum='}` + page.link">
                <SvgIcon v-if="page.text === 'prev' || page.text === 'next'" :name="'arrow-down'" />
                <span v-else> {{ page.text }} </span>
            </router-link>
            <span v-if="page.component === 'span'"> {{ page.text }}</span>
        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router'
import { getQueryString } from '../../assets/ts/helpers'

export default {
    setup() {
        const router = useRouter()
        return { router }
    },
    props: {
        pagination: Object,
        name: String,
    },
    computed: {
        queryString() {
            const query = {...this.router.currentRoute.value.query}
            delete query.pagenum
            return getQueryString(query)
        },
        link() {
            return this.router.currentRoute.value.path + '?' + this.queryString
        },
        pages() {
            const { pagenum, total } = this.pagination
            const pages = []
            const ellipsis = {
                component: 'span',
                text: '...',
            }

            if (pagenum > 0) {
                pages.push({
                    component: 'router-link',
                    text: 'prev',
                    link: pagenum - 1
                })
            }

            for (let i = 1; i <= total; i++) {

                if (i === total && total - 3 > pagenum) {
                    pages.push(ellipsis)
                }

                if (i === 1 || 
                    i === total ||
                    i === pagenum ||
                    i === pagenum + 1 || 
                    i === pagenum + 2
                ) {
                    pages.push({
                        component: i === pagenum + 1 ? 'span' : 'router-link',
                        text: i,
                        link: i - 1
                    })
                }

                if (i === 1 && pagenum > 2 ) {
                    pages.push(ellipsis)
                }
            }

            if (pagenum + 1 < total) {
                pages.push({
                    component: 'router-link',
                    text: 'next',
                    link: pagenum + 1
                })
            }
            
            return pages
        }
    }
}
</script>
  