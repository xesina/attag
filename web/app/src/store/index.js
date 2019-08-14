import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex, axios);

const store = new Vuex.Store({
    state: {
        bookmarks: [],
        msg: 'Test'
    },
    mutations: {
        SET_BOOKMARKS (state, bookmarks) {
            state.bookmarks = bookmarks
        }
    },
    actions: {
        loadBookmarks({commit}) {
            console.log('load bookmarks');
            axios
                .get('http://127.0.0.1:8585/api/v1/bookmarks')
                .then(data => {
                    let bookmarks = data.data;
                    commit('SET_BOOKMARKS', bookmarks)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
});

export default store;