<template>

    <div>
        <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">


        <h1 class="font-weight-light" style="margin-bottom: 3vh;">Архив сделок</h1>

        <v-card>
            <v-card-title>
                Завершенные перевозки
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
                <template v-slot:item.route="{ item }">
                    {{item.routeFrom}}
                    <v-icon color="orange">east</v-icon>
                    {{item.routeTo}}
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
        name: "Archive",
        data() {
            return {
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                search: '',
                headers: [
                    {
                        text: 'Дата',
                        align: 'start',
                        // sortable: false,
                        value: 'date',
                    },
                    {text: 'Груз', value: 'gruz'},
                    {text: 'Вес', value: 'weight'},
                    {text: 'Маршрут', value: 'route'},
                    {text: 'Перевозчик', value: 'transporter'},
                ],
                companies: [
                    {
                        weight: '21т',
                        routeFrom: "Калининград",
                        routeTo: "Санкт-Петербург",
                        date: "19.07.2020",
                        gruz: 'Окна',
                        transporter: 'ООО Прогресс ТК'
                    },
                    {
                        weight: '30т',
                        routeFrom: "Санкт-Петербург",
                        routeTo: "Калининград",
                        date: "21.07.2020",
                        gruz: 'Двери',
                        transporter: 'ООО Прогресс ТК'
                    },
                    {
                        weight: '27т',
                        routeFrom: "Москва",
                        routeTo: "Санкт-Петербург",
                        date: "29.07.2020",
                        gruz: 'Окна',
                        transporter: 'AvtoTrans ТК'
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
