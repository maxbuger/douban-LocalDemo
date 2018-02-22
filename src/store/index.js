import Vue from 'vue'
import Vuex from 'vuex'

import book from './modules/book'
import activities from './modules/activities'
import user from './modules/user'
import movie from './modules/movie'
import group from './modules/group'
import search from './modules/search'
import subject from './modules/subject'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    activities,
    movie,
    group,
    search,
    subject,
    user
  }
})