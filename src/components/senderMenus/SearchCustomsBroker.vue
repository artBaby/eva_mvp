<template>
    <div>
        <h1 class="font-weight-light" style="margin-bottom: 3vh;">Поиск таможенного брокера</h1>

        <v-card>
            <v-card-title>
                Таможенные брокеры
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
        name: "SearchCustomsBroker",
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
                        name: 'Кастом-Гид',
                        license: 335234123,
                        status: "Активен от 14.12.2010",
                        address: "г. Калининград, ул. Туруханская д. 3а",
                        rating: 4.5,
                    },
                    {
                        name: 'Транс Логистик Консалт',
                        license: 335234123,
                        status: "Активен от 30.04.2008",
                        address: "г. Калининград, ул. Октябрьская, 2",
                        rating: 4.8,
                    },
                    {
                        name: 'ТИС-Лоджистик',
                        license: 237435155,
                        status: "Активен от 10.01.2002",
                        address: "г. Санкт-Петербург, проспект Обуховской Обороны, 271, к.1",
                        rating: 4.1,
                    },
                    {
                        name: 'Балткомплект',
                        license: 262532971,
                        status: "Активен от 03.04.1995",
                        address: "г. Санкт-Петербург, ул. Двинская, д. 10, кор. 3",
                        rating: 4.9,
                    },
                    {
                        name: 'Универсальные Грузовые Решения',
                        license: 305345154,
                        status: "Активен от 06.03.2005",
                        address: "г. Москва, Волоколамское шоссе, д. 73",
                        rating: 4.1,
                    },
                    {
                        name: 'LCM Group',
                        license: 356914013,
                        status: "Активен от 15.05.1998",
                        address: "г. Москва, Бережковская наб. д.38 стр.1",
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
