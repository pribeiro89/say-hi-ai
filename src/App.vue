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
          </div>
        </div>
      <!--</div>-->
    </div>
  </section>
</template>

<script>

  import Main from './ai'
  import VideoComponent from './components/Video'

export default {
  name: 'app',
  components: {
      VideoComponent
  }
}
</script>
