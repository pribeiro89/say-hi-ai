<template>
  <section class="section">
    <div class="container">
      <!--<div class="columns is-centered">-->
        <div class="columns is-centered">
          <h1 class="title">
            Say Hi AI!
          </h1>
        </div>
        <div class="columns is-centered">
          <p class="subtitle">
            Train the AI to say hello to <strong>you</strong>!
          </p>
        </div>
        <div class="columns is-centered">
          <div class="">
            <video-component></video-component>
            <training-button :infoTexts="infoTexts"></training-button>
          </div>
        </div>
      <!--</div>-->
    </div>
  </section>
</template>

<script>

  import Vuex from 'vuex'
  import "@babel/polyfill";
  import * as mobilenetModule from '@tensorflow-models/mobilenet';
  import * as tf from '@tensorflow/tfjs';
  import * as knnClassifier from '@tensorflow-models/knn-classifier';
  import VideoComponent from './components/Video'
  import TrainingButton from './components/TrainingButton'
  import classData from './data/classes.json';


export default {
  name: 'app',
  components: {
      VideoComponent,
      TrainingButton
  },
  mounted() {
    this.bindPage()
    this.videoEl = document.querySelector('video');
  },
  data(){
    return {
      videoEl: null,
      TOPK: 10,
      numClasses: classData.classes.length,
      infoTexts: []
    }
  },
  computed: {
    ...Vuex.mapState({
      videoPlaying: 'videoPlaying',
      training: 'training',
    })
  },
  methods: {
    async animate() {
      if (this.videoPlaying) {

        // Get image data from video element
        const image = tf.fromPixels(this.videoEl);

        let logits;
        // 'conv_preds' is the logits activation of MobileNet.
        const infer = () => this.mobilenet.infer(image, 'conv_preds');

        // Train class if one of the buttons is held down
        if (this.training !== -1) {
          console.log(this.training);
          logits = infer();

          // Add current image to classifier
          this.knn.addExample(logits, this.training)
        }

        const numClasses = this.knn.getNumClasses();

        if (numClasses > 0) {

          // If classes have been added run predict
          logits = infer();
          const res = await this.knn.predictClass(logits, this.TOPK);

          for (let i = 0; i < this.numClasses; i++) {

            // The number of examples for each class
            const exampleCount = this.knn.getClassExampleCount();

            // Update info text
            if (exampleCount[i] > 0) {
              this.infoTexts[i] = ` ${exampleCount[i]} examples - ${res.confidences[i] * 100}%`
            }
          }
        }

        // Dispose image when done
        image.dispose();
        if (logits != null) {
          logits.dispose();
        }
      }
      this.timer = requestAnimationFrame(this.animate.bind(this));
      //https://vuejs.org/v2/guide/transitioning-state.html
    },

    start() {
      if (this.timer) {
        this.stop();
      }
      // this.video.play();
      this.timer = requestAnimationFrame(this.animate.bind(this));
    },

    stop() {
      //this.video.pause();
      cancelAnimationFrame(this.timer);
    },

    async bindPage() {
      this.knn = knnClassifier.create();
      this.mobilenet = await mobilenetModule.load();

      this.start();
    }


  }
}
</script>
