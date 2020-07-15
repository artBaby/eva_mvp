<template>
    <yandex-map :settings="settings" :coords="coords" :zoom="10" >
        <trans-markers v-for="route in routes" v-bind:key="route.orderId" :route="route"></trans-markers>
    </yandex-map>
</template>


<script>
    import { yandexMap } from 'vue-yandex-maps'
    import transMarkers from './TransMarkers'
    import { loadYmap } from 'vue-yandex-maps'

    const settings = {
                apiKey: 'c8ee8210-f443-4c83-8989-438db8ffe668',
                lang: 'ru_RU',
                coordorder: 'latlong',
                version: '2.1',
            };

    export default {
        name: "TransMap",
        components: { yandexMap, transMarkers },
        async mounted() {
            await loadYmap(settings);
            console.log(window.ymaps)
        },
        data: () => ({
            routes: [
                {
                    orderId: 12345,
                    currentCoords: [55.8, 33.8],
                    startCoords: [55.8, 39.8],
                    endCoords: [55.8, 34.8],
                    estimatedTime: "15.07 18:33",
                    currentEstimatedTime: "15.08 18:33",
                    startMarkerId: 1,
                    endMarkerId: 2,
                    currentMarkerId: 3
                }
             ],
            coords: [55.8, 37.8]
        })
    }
</script>

<style>
.ymap-container {
  height: 100vh;
  max-height: 700;
}
</style>
