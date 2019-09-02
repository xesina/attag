<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="11">
                <BookmarkList/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import BookmarkList from "../components/BookmarkList";

    export default {
        name: 'Index',
        components: {BookmarkList},
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
    }
</script>

<style scoped>
</style>