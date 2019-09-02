<template>
    <v-row justify="start" align="center">
        <v-col
                cols="12"
                lg="3"
                sm="6"
                md="4"
                xs="1"
                xl="2"
                v-for="bookmark in bookmarks"
                :key="bookmark.id"
        >
            <v-card>
                <v-card-title
                        class="fill-height align-end"
                        v-text="bookmark.name"
                >
                </v-card-title>
                <v-card-text v-text="bookmark.url"></v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                    </v-btn>

                    <v-menu open-on-hover :close-on-content-click="true" left bottom offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn text icon v-on="on">
                                <v-avatar>
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="deleteBookmark(bookmark.id)">
                                <v-list-item-title>
                                    <v-icon>mdi-delete</v-icon>
                                    Delete
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'BookmarkList',
        methods: {
            deleteBookmark(id) {
                this.$store.dispatch('deleteBookmark', id)
                    .then(() => {
                        this.$toast("Bookmark deleted successfully")
                    })
                    .catch(err => {
                        console.log(err);
                        this.$toast("Bookmark delete failed")
                    })
            }
        },
        mounted() {
            this.$store.dispatch('getBookmarks')
        },
        computed: {
            bookmarks() {
                return this.$store.state.bookmarks
            }
        },
    }
</script>