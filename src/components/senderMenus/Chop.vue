<template>
    <div>
        <h1 class="font-weight-light" style="margin-bottom: 3vh;">Частные охранные предприятия</h1>

        <v-card>
            <v-card-title>
                Охранные предприятия
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Поиск"
                        single-line
                        hide-details
                        clearable
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="companies"
                    :search="search"
                    :page.sync="page"
                    hide-default-footer
                    :items-per-page="itemsPerPage"
                    @page-count="pageCount = $event"
            >
                <template v-slot:item.rating="{ item }">
                    <v-chip :color="getRating(item.rating)" dark>{{ item.rating }}</v-chip>
                </template>
            </v-data-table>
            <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
        </v-card>

    </div>
</template>

<script>
    export default {
        name: "Chop",
        data() {
            return {
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                search: '',
                headers: [
                    {
                        text: 'Название',
                        align: 'start',
                        // sortable: false,
                        value: 'name',
                    },
                    {text: 'Адрес', value: 'address'},
                    {text: 'Рейтинг', value: 'rating'},
                    {text: 'Лицензия №', value: 'license'},
                    {text: 'Статус', value: 'status'},
                ],
                companies: [
                    {
                        name: 'Цитадель',
                        license: 335234123,
                        status: "Активен от 14.12.1998",
                        address: "г. Калининград, Московский просп., 174",
                        rating: 4.7,
                    },
                    {
                        name: 'БОРС',
                        license: 335234123,
                        status: "Активен от 14.12.1998",
                        address: "г. Санкт-Петербург, Большая Пушкарская, д. 41",
                        rating: 4.2,
                    },
                    {
                        name: 'АСБ «Воевода»',
                        license: 231257435,
                        status: "Активен от 10.01.2002",
                        address: "г. Санкт-Петербург, ул. Киевская д. 6",
                        rating: 4.3,
                    },
                    {
                        name: 'ТОПАЗ',
                        license: 269982532,
                        address: "г. Санкт-Петербург, ул. Краснопутиловская, д.69",
                        status: "Активен от 03.04.1995",
                        rating: 5.0,
                    },
                    {
                        name: 'Протект Груп',
                        license: 305326245,
                        status: "Активен от 06.03.2005",
                        address: "г. Москва, ул. Мелитопольская 2-я, д.21",
                        rating: 4.1,
                    },
                    {
                        name: 'Сигма-Профи',
                        license: 356009914,
                        status: "Активен от 15.05.2000",
                        address: "г. Москва, Огородный проезд, д. 20",
                        rating: 3.9,
                    },
                ],
            }
        },

        methods:
            {
                getRating(rating) {
                    if (rating > 4.4) return 'green'
                    else if (rating > 3.9) return 'orange'
                    else return 'red'
                },
            },
    }
</script>

<style scoped>

</style>
