<template>
    <video
        autoplay
        playsinline
        :width="imageSize"
        :height="imageSize"
        v-on:playing="setVideoPlaying({videoPlaying: true})"
        v-on:pause="setVideoPlaying({videoPlaying: false})"
        controls
    ></video>
</template>

<script>
    import Vuex from 'vuex'

    export default {
        name: "videoComponent",
        data() {
            return {
                imageSize: 500,
            }
        },
        mounted() {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then((mediaStream) => {
                    var video = document.querySelector('video');
                    video.srcObject = mediaStream;
                    video.onloadedmetadata = function(e) {
                        video.play();
                    };
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        methods: {
            ...Vuex.mapMutations([
                'setVideoPlaying',
            ])
        },
        computed: {
            ...Vuex.mapState({
                videoPlaying: 'videoPlaying',
            })
        }
    }
</script>

<style scoped>
video {

}
</style>