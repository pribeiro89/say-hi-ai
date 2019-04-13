<template>
    <video
        autoplay
        playsinline
        :width="imageSize"
        :height="imageSize"
        v-on:playing="videoPlaying = true"
        v-on:pause="videoPlaying = false"
        controls
    ></video>
</template>

<script>
    export default {
        name: "videoComponent",
        data() {
            return {
                videoPlaying: false,
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
    }
</script>

<style scoped>
video {

}
</style>