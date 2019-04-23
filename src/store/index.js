import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        videoPlaying: false,
        training: -1

    },
    mutations: {
        setVideoPlaying(state, payload) {
            state.videoPlaying = payload.videoPlaying
        },
        setTraining(state, payload){
            state.training = payload.training
        }

    }
})
