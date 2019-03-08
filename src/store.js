import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        managerName: null
    },
    getters: {
        getManager: state => {
            return state.managerName
        }
    },
    mutations: {
        changeManager(state, managerName) {
            state.managerName = managerName
        }
    },
    actions: {
        changeManager(context, name) {
            context.commit('changeManager', name)
        }
    }
})

export default store