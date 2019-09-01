import {shallowMount} from '@vue/test-utils'
import {mutations, state} from '@/store'


describe('SET_SHOW_NEW_BOOKMARK_DIALOG', () => {
    it('SET_SHOW_NEW_BOOKMARK_DIALOG', () => {
        const {SET_SHOW_NEW_BOOKMARK_DIALOG} = mutations
        SET_SHOW_NEW_BOOKMARK_DIALOG(state, true)
        expect(state.showNewBookmarkDialog).toBe(true)
    })
})
