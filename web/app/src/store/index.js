import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex, axios);

export const state = {
    showNewBookmarkDialog: false,
    status: '',
    bookmarks: [],
    token: localStorage.getItem('token') || '',
    user: {}
};

export const mutations = {
    SET_SHOW_NEW_BOOKMARK_DIALOG(state, show) {
        state.showNewBookmarkDialog = show
    },
    SET_BOOKMARKS(state, bookmarks) {
        state.bookmarks = bookmarks
    },
    LOGIN_REQUEST(state) {
        state.status = 'logging in'
    },
    LOGIN_SUCCESS(state, token, user) {
        state.status = 'logged in'
        state.token = token
        state.user = user
    },
    LOGIN_ERROR(state) {
        state.status = 'error'
    },
    LOGOUT(state) {
        state.status = ''
        state.token = ''
        state.user = {}
    },
    NEW_BOOKMARK(state, bookmark) {
        state.bookmarks.push(bookmark)
    },
    DELETE_BOOKMARK(state, id) {
        state.bookmarks.forEach(function (bookmark, index) {
            if (bookmark.id === id) {
                state.bookmarks.splice(index, 1)
            }
        })
    }
};

export const actions = {
    getBookmarks({commit}) {
        axios
            .get('http://127.0.0.1:8585/api/v1/bookmarks')
            .then(data => {
                let bookmarks = data.data;
                commit('SET_BOOKMARKS', bookmarks)
            })
            .catch(error => {
                commit('SET_BOOKMARKS', []);
                console.log(error)
            })
    },
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            commit('LOGIN_REQUEST')
            axios
                .post('http://127.0.0.1:8585/api/v1/login', user)
                .then(resp => {
                    const token = resp.data.token
                    // call /me endpoint to get user info
                    //const user = resp.data.user
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = "Bearer " + token
                    commit('LOGIN_SUCCESS', token, user)
                    resolve(resp)
                })
                .catch(err => {
                    commit('LOGIN_ERROR')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout({commit}) {
        return new Promise((resolve, reject) => {
            commit('LOGOUT');
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
    showNewBookmarkDialog({commit}, show) {
        commit('SET_SHOW_NEW_BOOKMARK_DIALOG', show);
    },
    saveBookmark({commit}, bookmark) {
        return new Promise((resolve, reject) => {
            axios
                .post('http://127.0.0.1:8585/api/v1/bookmarks', bookmark)
                .then(resp => {
                    const saveBookmark = resp.data
                    commit('NEW_BOOKMARK', saveBookmark)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    deleteBookmark({commit}, id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`http://127.0.0.1:8585/api/v1/bookmarks/${id}`)
                .then(resp => {
                    commit('DELETE_BOOKMARK', id)
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
};

export const getters = {
    isLoggedIn: state => !!state.token,
    LoginStatus: state => state.status,
    showNewBookmarkDialog: state => state.showNewBookmarkDialog,
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})