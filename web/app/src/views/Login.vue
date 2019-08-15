<template>
    <v-content>
        <v-container
                class="fill-height"
                fluid
        >
            <v-row
                    align="center"
                    justify="center"
            >
                <v-col
                        cols="12"
                        sm="8"
                        md="4"
                >
                    <v-card class="elevation-12">
                        <v-toolbar
                                color="amber"
                                class="black--text"
                                dark
                                flat
                        >
                            <v-toolbar-title>Login form</v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                        label="Username"
                                        name="username"
                                        prepend-icon="person"
                                        type="text"
                                        v-model="username"
                                ></v-text-field>

                                <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="lock"
                                        type="password"
                                        v-model="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey lighten-2" @click="login">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                username: null,
                password: null
            };
        },
        methods: {
            login: function () {
                const username = this.username
                const password = this.password
                console.log("Login.vue: login method")
                this.$store.dispatch('login', {username, password})
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>