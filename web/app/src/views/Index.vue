<template>
    <v-container fluid>
        <v-row  justify="center">
            <v-col cols="12" md="11">
                <v-data-table
                        :headers="headers"
                        :items="desserts"
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
        data () {
            return {
                headers: [
                    {
                        text: 'Name',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'URL', value: 'url' },
                    { text: 'Tags', value: 'tags' },
                ],
                desserts: [
                    {
                        name: 'Google.com',
                        url: 'https://google.com',
                        tags: 'search, google',
                    },
                    {
                        name: 'Reddit.com',
                        url: 'https://reddit.com',
                        tags: 'social',
                    },
                    {
                        name: 'Stackoverflow.com',
                        url: 'https://stackoverflow.com',
                        tags: 'code, programming',
                    },
                    {
                        name: 'golang.org',
                        url: 'https://golang.org',
                        tags: 'programming, golang',
                    },
                ],
            }
        },
    }
</script>

<style scoped>
</style>