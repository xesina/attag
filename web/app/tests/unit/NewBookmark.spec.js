import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import NewBookmark from '@/components/NewBookmark.vue'
import Vuetify from "vuetify"
import store from '@/store'


describe('HelloWorld.vue', () => {
    it('should ', () => {
        let wrapper, vuetify;

        vuetify = new Vuetify()

        const localVue = createLocalVue()
        wrapper = mount(NewBookmark, {
            localVue,
            store,
            vuetify,
        });
        const vm = wrapper.vm.$store.getters.showNewBookmarkDialog
        // console.log(wrapper.vm)
    });
})

