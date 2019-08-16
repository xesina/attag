import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex, axios);

const store = new Vuex.Store({
    state: {
        status: '',
        bookmarks: [],
        token: localStorage.getItem('token') || '',
        user: {}
    },
    mutations: {
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
    },
    actions: {
        loadBookmarks({commit}) {
            axios
                .get('http://127.0.0.1:8585/api/v1/bookmarks')
                .then(data => {
                    let bookmarks = data.data;
                    commit('SET_BOOKMARKS', bookmarks)
                })
                .catch(error => {
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
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        LoginStatus: state => state.status,
    }
});

export default store;