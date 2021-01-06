import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7ac556e3 = () => interopDefault(import('../pages/layouts' /* webpackChunkName: "" */))
const _7e4cf6c5 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _5199b950 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))
const _6acf7603 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _192f41d3 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _4b8a2a43 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _ff4149ee = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _7ac556e3,
    children: [{
      path: "/home",
      component: _7e4cf6c5,
      name: "home"
    }, {
      path: "/article/:slug",
      component: _5199b950,
      name: "article"
    }, {
      path: "/profile/:username",
      component: _6acf7603,
      name: "profile"
    }, {
      path: "/editor",
      component: _192f41d3,
      name: "editor"
    }, {
      path: "/login",
      component: _4b8a2a43,
      name: "login"
    }, {
      path: "/register",
      component: _4b8a2a43,
      name: "register"
    }, {
      path: "/settings",
      component: _ff4149ee,
      name: "settings"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
