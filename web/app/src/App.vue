<template>
    <v-app id="attag">
        <v-app-bar
                app
                clipped-left
                color="amber"
                v-if="isLoggedIn"
        >
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <span class="title ml-3 mr-5">Bright&nbsp;<span class="font-weight-light">Attag</span></span>
            <v-text-field
                    solo-inverted
                    flat
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
            ></v-text-field>
            <div class="flex-grow-1"></div>

            <v-btn icon medium @click.stop="showNewBookmarkDialog">
                <v-avatar>
                    <v-icon>mdi-bookmark-plus</v-icon>
                </v-avatar>
            </v-btn>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon medium v-on="on">
                        <v-avatar>
                            <v-icon>mdi-account</v-icon>
                        </v-avatar>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                            v-for="(item, index) in menu"
                            :key="index"
                            @click=""
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
                color="grey lighten-4"
                v-if="isLoggedIn"
        >
            <v-list
                    dense
                    class="grey lighten-4"
            >
                <template v-for="(item, i) in items">
                    <v-layout
                            v-if="item.heading"
                            :key="i"
                            align-center
                    >
                        <v-flex xs6>
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-flex>
                        <v-flex
                                xs6
                                class="text-right"
                        >
                            <v-btn
                                    small
                                    text
                            >edit
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-divider
                            v-else-if="item.divider"
                            :key="i"
                            dark
                            class="my-4"
                    ></v-divider>
                    <v-list-item
                            v-else
                            :key="i"
                            :to="{name: item.route}"
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                {{item.text}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <NewBookmark/>
            <router-view></router-view>
        </v-content>

        <Footer/>

    </v-app>
</template>

<script>
    import Footer from '@/components/Footer.vue'
    import NewBookmark from '@/components/NewBookmark.vue'


    export default {
        name: 'App',
        components: {NewBookmark, Footer},
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            items: [
                {icon: 'bookmarks', text: 'Bookmarks', route: 'Index'},
                {icon: 'label', text: 'Labels', route: 'Labels'},
                {divider: true},
                {icon: 'archive', text: 'Archive', route: 'Archive'},
                {icon: 'delete', text: 'Trash', route: 'Trash'},
                {divider: true},
                {icon: 'settings', text: 'Settings', route: 'Settings'},
                {icon: 'help', text: 'Help', route: 'Help'},
                {icon: 'phonelink', text: 'App downloads', route: 'Apps'},
                {icon: 'keyboard', text: 'Keyboard shortcuts', route: 'Shortcuts'},
                {icon: 'logout', text: 'Logout', route: 'Logout'},
            ],
            menu: [
                {title: 'Click Me'},
                {title: 'Click Me'},
                {title: 'Click Me'},
                {title: 'Click Me 2'},
            ],
        }),
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn
            },
            NewBookmarkDialogVisible: function () {
                return this.$store.getters.showNewBookmarkDialog
            }
        },
        methods: {
            showNewBookmarkDialog: function () {
                this.$store.dispatch('showNewBookmarkDialog', true)
                    .then(() => {
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        created: function () {
            this.$http.interceptors.response.use(undefined, err => {
                let res = err.response;
                if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                    this.$toast("Unauthorized error " + res.status)
                    return new Promise((resolve, reject) => {
                        this.$store.dispatch('logout')
                            .then(() => this.$router.push({name: 'Login'}))
                            .catch(err => {
                            })
                    })
                }
                throw err;
            });
        }
    }
</script>

<style>
    #attag .v-navigation-drawer__border {
        display: none
    }
</style>