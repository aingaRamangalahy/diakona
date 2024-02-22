import { defineStore } from 'pinia'

export enum TITLE_TEXT {
    DEFAULT = 'Fifidianana diakona',
    FEMININE = 'Fifidianana diakona vehivavy',
    MASCULINE = 'Fifidianana diakona lehilahy',
    RESULTS = 'Voka-pifidianana'
}

export const useDisplayStore = defineStore('display', {
    state: () => ({ titleText: '' }),
    getters: {
        getTitleText: (state) => state.titleText
    },
    actions: {
        setTittleText(type: keyof typeof TITLE_TEXT) {
            this.titleText = TITLE_TEXT[type]
            console.log(this.getTitleText)
        }
    }
})
