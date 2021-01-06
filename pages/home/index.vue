<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link class="nav-link" 
                :class="{
                  active: tab === 'your_feed'
                }"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }}"
                  >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" 
              exact
              :class="{
                active: tab === 'global_feed'
              }"
              :to="{
                name: 'home',
                query: {
                  tab: 'global_feed'
                }
              }">Global Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
              exact
              class="nav-link" 
               :class="{
                active: tab === 'tag'
              }"
              :to="{
                name: 'home',
                query: {
                  tag: tag,
                  tab: 'tag'
                }}"
                >#{{$route.query.tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview"
          v-for="article in articles"
          :key="article.slug"
        >
          <div class="article-meta">
            <nuxt-link :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }">
              <img :src="article.author.image" />
            </nuxt-link>
           
            <div class="info">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                {{ article.author.username }}
              </nuxt-link>
              <span class="date">{{ article.createAt | date }}</span>
            </div>
            <button 
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{active: article.favorited}"
              @click.prevent="onFavorate(article)"
              :disabled="article.favoriteDisabled"
            >
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link
            class="preview-link"
            :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }"
          >
             <h1>{{ article.title }}</h1>
             <p>{{ article.description }}</p>
          </nuxt-link>
          
        </div>
        <nav>
          <ul class="pagination">
            <li 
              :class="{
                active: item === page
              }"
              class="page-item" 
              v-for="item in totalPage" 
              :key="item"
            >
              <nuxt-link class="page-link ng-binding" :to="{
                name: 'home',
                query: {
                  page: item,
                  tag: $route.query.tag,
                  tab
                }
              }">{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list" >
            <nuxt-link v-for="item in tags" :key="item" :to="{
              name: 'home',
              query: {
                tag: item,
                tab: 'tag',
                page: 1
              }
            }" class="tag-pill tag-default">{{ item }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '@/api/article';
import { getTags } from '@/api/tags'
import { mapState } from 'vuex'
export default {
    name: 'home',
    watchQuery: ['page', 'tag', 'tab'],
    async asyncData({ query, store }) {
      const page = Number.parseInt(query.page || 1);
      const tag = query.tag || undefined;
      const limit = 10;
      const tab = query.tab || 'global_feed';
      const loadArticles = store.state.user && tab === 'your_feed' 
      ? getFeedArticles : getArticles;
        const { data: tagData } = await getTags();
          const [ articleRes, tagRes ] = await Promise.all([
            loadArticles({
              limit,
              offset: (page - 1) * limit,
            }),
            getTags()
          ])
          const { articles = [], articlesCount = 0} = articleRes ? articleRes.data : {};
          const { tags } = tagRes ? tagRes.data : [];
          articles.forEach( articles => articles.favoriteDisabled = false);
            return {
              articles,
              articlesCount,
              limit,
              page,
              tags,
              tag,
              tab
          }
      
    },
    methods: {
      async onFavorate(article){
        article.favoriteDisabled = true;
        if(article.favorited) {
          await deleteFavorite(article.slug);
          article.favorited = false;
          article.favoritesCount += -1;

        } else {
          await addFavorite(article.slug);
          article.favorited = true;
          article.favoritesCount += 1;
        }
        article.favoriteDisabled = false;
      }
    },
    data() {
      return {
        tags: [],
        articlesCount: 0,
        limit: 10,
        articles: []
      }
    },
    computed: {
      ...mapState(['user']),
      totalPage() {
        return Math.ceil(this.articlesCount / this.limit)
      }
    }
}
</script>

<style>

</style>