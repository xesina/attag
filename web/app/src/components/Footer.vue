<template>
    <v-footer class="pa-3 white--text" color="grey lighten-4" absolute>
        <div class="grey--text text-center">
            Developed with ❤️ by {{author}} &copy; {{ new Date().getFullYear() }}
        </div>
    </v-footer>
</template>

<script>
    export default {
        name: 'Footer',
        data: () => ({
            author: 'xesina'
        })
    }
</script>

<style scoped>
</style>