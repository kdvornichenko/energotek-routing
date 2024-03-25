<template>
    <nav class="nav container">
        <router-link to="/contacts" class="nav__link" :class="{'is-active': $route.name === 'contact'}">
            <SvgIcon :name="'contacts'"/>
            <span>Контакты</span>
        </router-link>
        <router-link to="/partners" class="nav__link" :class="{'is-active': $route.name === 'partner'}">
            <SvgIcon :name="'clients'"/>
            <span>Клиенты</span>
        </router-link>
        <router-link to="/projects" class="nav__link" :class="{'is-active': $route.name === 'project'}">
            <SvgIcon :name="'projects'"/>
            <span>Проекты</span>
        </router-link>
        <router-link to="/documents" class="nav__link">
            <SvgIcon :name="'documents'"/>
            <span>Документы</span>
        </router-link>
        <router-link to="/add" class="nav__link">
            <SvgIcon :name="'add'"/>
            <span>Добавить</span>
        </router-link>
    </nav>
</template>
