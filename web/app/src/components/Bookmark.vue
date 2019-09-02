<template>
    <v-card>
        <v-card-title
                class="fill-height align-end"
                v-text="name"
        ></v-card-title>
        <v-card-text v-text="url"></v-card-text>

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
</template>

<script>
    export default {
        name: 'Bookmark',
        props: {
            id: Number,
            name: String,
            url: String,
        }
    }
</script>