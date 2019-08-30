<template>
    <v-row justify="center">
        <v-dialog v-model="show" persistent max-width="600px" s>
            <v-card>
                <v-card-title>
                    <span class="headline">New Bookmark</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="URL" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="URL" required></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="show = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: 'NewBookmark',
        props: {
            show: Boolean,
        },
    }
</script>

<style scoped>
</style>