<template>
  <v-app id="attag">
    <v-app-bar
            app
            clipped-left
            color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Bright&nbsp;<span class="font-weight-light">Attag</span></span>
      <v-text-field
              solo-inverted
              flat
              hide-details
              label="Search"
              prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="grey lighten-4"
    >
      <v-list
              dense
              class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
                  v-if="item.heading"
                  :key="i"
                  align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex
                    xs6
                    class="text-right"
            >
              <v-btn
                      small
                      text
              >edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider
                  v-else-if="item.divider"
                  :key="i"
                  dark
                  class="my-4"
          ></v-divider>
          <v-list-item
                  v-else
                  :key="i"
                  :to="{name: item.route}"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{item.text}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer />

  </v-app>
</template>

<script>
  import Footer from '@/components/Footer.vue'


  export default {
    name: 'App',
    components: { Footer },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'bookmarks', text: 'Bookmarks', route: 'Index' },
        { icon: 'label', text: 'Labels', route: 'Labels' },
        { divider: true },
        { icon: 'archive', text: 'Archive', route: 'Archive' },
        { icon: 'delete', text: 'Trash', route: 'Trash' },
        { divider: true },
        { icon: 'settings', text: 'Settings', route: 'Settings' },
        { icon: 'help', text: 'Help', route: 'Help' },
        { icon: 'phonelink', text: 'App downloads', route: 'Apps' },
        { icon: 'keyboard', text: 'Keyboard shortcuts', route: 'Shortcuts' },
      ],
    }),
  }
</script>

<style>
  #attag .v-navigation-drawer__border {
    display: none
  }
</style>