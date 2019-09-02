<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="11">
                <v-row justify="start" align="center">
                    <v-col
                            cols="12"
                            lg="3"
                            sm="6"
                            md="4"
                            xs="1"
                            xl="2"
                            v-for="bookmark in bookmarks"
                            :key="bookmarks.name"
                    >
                        <v-card>
                            <v-card-title
                                    class="fill-height align-end"
                                    v-text="bookmark.name"
                            ></v-card-title>
                            <v-card-text v-text="bookmark.url"></v-card-text>

                            <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn icon>
                                    <v-icon>mdi-share-variant</v-icon>
                                </v-btn>

                                <v-menu offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon medium v-on="on">
                                            <v-avatar>
                                                <v-icon>mdi-dots-vertical</v-icon>
                                            </v-avatar>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title>item</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>

                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Index',
        data() {
            return {
                headers: [
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                    },
                    {text: 'URL', value: 'url'},
                    {text: 'Tags', value: 'tags'},
                ]
            }
        },
        mounted() {
            this.$store.dispatch('getBookmarks')
        },
        computed: {
            bookmarks() {
                return this.$store.state.bookmarks
            }
        }
    }
</script>

<style scoped>
</style>