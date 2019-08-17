<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="11">
                <v-data-table
                        :headers="headers"
                        :items="bookmarks"
                        :items-per-page="5"
                        class="elevation-1"
                ></v-data-table>
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