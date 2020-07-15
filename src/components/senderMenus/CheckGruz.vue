<template>
    <v-container>
        <div>
        Проверка груза
        <trans-map/>
        </div>
    </v-container>
</template>

<script>
    import transMap from './modules/TransMap.vue'
    export default {
        name: "CheckGruz",
        components: {transMap: transMap},
    }
</script>
