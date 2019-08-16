<template>
    <v-content>Logging out ...</v-content>
</template>

<script>
    export default {
        name: "Logout",
        mounted() {
            this.logout()
        },
        methods: {
            logout() {
                const sleep = (milliseconds) => {
                    return new Promise(resolve => setTimeout(resolve, milliseconds))
                }
                const after = 500

                sleep(after).then(() => {
                    this.$store.dispatch('logout')
                        .then(() => this.$router.push({name: 'Login'}))
                        .catch(err => console.log(err))
                })

            }
        }
    }
</script>

<style scoped>

</style>