<template>
    <section>
        <div v-for="(data, index) in classData" :key="index" class="buttons">
            <button


                    v-on:mousedown="onMouseDown(index)"
                    v-on:mouseup="onMouseUp()"
            >
                {{ data }}
            </button>
            <span v-if="infoTexts.length === 0">No examples added</span>
            <span v-else>{{ infoTexts[index] }}</span>
        </div>
    </section>
</template>

<script>
    import Vuex from 'vuex'
    import classData from './../data/classes.json';

    export default {
        name: "TrainingButton",
        props:{
            infoTexts: Array
        },
        data() {
            return {
                classData: classData.classes
            }
        },
        mounted() {

        },
        methods: {
            onMouseDown: function (index) {
                this.setTraining({training: index})
                console.log('down');
            },
            onMouseUp: function () {
                this.setTraining({training: -1})
            },
            ...Vuex.mapMutations([
                'setTraining',
            ])
        },
        computed: {
            ...Vuex.mapState({
                training: 'training',
            })
        }
    }
</script>

<style scoped>

</style>