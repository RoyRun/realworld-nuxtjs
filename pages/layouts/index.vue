<template>
    <div>
        <nav class="navbar navbar-light">
            <div class="container">
            <a class="navbar-brand" href="index.html">conduit</a>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                <!-- Add "active" class when you're on that page" -->
                <nuxt-link class="nav-link" to="/home" exact>Home</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/editor">New Post</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/settings">Settings</nuxt-link>
                </li>
                <template v-if="user">
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/profile/123">
                            <img class="user-pic" :src="user.image">
                            {{ user.username }}
                        </nuxt-link>
                    </li>
                </template>
                <template v-else>
                     <li class="nav-item">
                        <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
                    </li>
                   
                </template>
                
            </ul>
            </div>
        </nav>
        <!-- 子路由 -->
        <nuxt-child />
        <!-- 子路由 -->
        <footer>
            <div class="container">
                <a href="/" class="logo-font">conduit</a>
                <span class="attribution">
                An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                </span>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'LayoutIndex',
    computed: {
        ...mapState(['user'])
    }
}
</script>

<style>

</style>