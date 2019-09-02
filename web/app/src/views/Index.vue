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
                        <Bookmark :name="bookmark.name" :url="bookmark.url"></Bookmark>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Bookmark from "../components/Bookmark";
    export default {
        name: 'Index',
        components: {Bookmark},
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