<template>
    <v-container>
        <ymap-marker :coords="route.startCoords" :marker-id="route.startMarkerId" :icon="iconStart" :balloon-template="templateStart(route)"/>
        <ymap-marker :coords="route.endCoords" :marker-id="route.endMarkerId" :icon="iconEnd" :balloon-template="templateEnd(route)"/>
        <ymap-marker :coords="route.currentCoords" :marker-id="route.currentMarkerId" :icon="iconCurrent" :balloon-template="templateCurrent(route)"/>
    </v-container>
</template>

<script>
    import { ymapMarker } from 'vue-yandex-maps'

    export default {
        name: "TransMarkers",
        components: { ymapMarker },
        props: {
            route: Object
        },
        data: () => ({
                    iconCurrent: {
                        layout: 'default#imageWithContent',
                        imageHref: 'https://hotemoji.com/images/emoji/e/12wsvdpa6hhe.png',
                        imageSize: [43, 43],
                        imageOffset: [0, 0],
                        contentOffset: [0, 15],
                        contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                    },
                    iconStart: {
                        color: 'red'
                    },
                    iconEnd: {
                        color: 'green'
                    }
        }),
        methods: {
            templateBaloon(route){
                return `
                    <p>Ориентировочное время прибытия: ${route.currentEstimatedTime}</p>
                    <p>Плановое время прибытия: ${route.estimatedTime}</p>
                    `
            },
            templateStart(route) {
                return `
                    <h1 class="red">Место отправления заказа ${route.orderId}</h1>
                    ${this.templateBaloon(route)}
                    `
            },
            templateEnd(route) {
                return `
                    <h1 class="red">Место получения заказа ${route.orderId}</h1>
                    ${this.templateBaloon(route)}
                    `
            },
            templateCurrent(route) {
                return `
                    <h1 class="red">Местоположение заказа ${route.orderId}</h1>
                    ${this.templateBaloon(route)}
                `
            }
        }
    }
</script>
