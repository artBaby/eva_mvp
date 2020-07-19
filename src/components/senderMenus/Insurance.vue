<template>
    <div>
        <h1 class="font-weight-light" style="margin-bottom: 3vh;">Страхование груза</h1>

        <v-card >
            <v-card-title>
                Страховые компании
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
        name: "Insurance",
        data () {
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
                    { text: 'Рейтинг', value: 'rating' },
                    { text: 'Лицензия №', value: 'license' },
                    { text: 'Статус', value: 'status' },
                ],
                companies: [
                    {
                        name: 'Согаз',
                        license: 159123,
                        status: "Активен от 14.12.1998",
                        rating: 4.5,
                    },
                    {
                        name: 'АльфаСтрахование',
                        license: 237435,
                        status: "Активен от 10.01.2002",
                        rating: 4.3,
                    },
                    {
                        name: 'ВСК',
                        license: 262532,
                        status: "Активен от 03.04.1995",
                        rating: 5.0,
                    },
                    {
                        name: 'Ингосстрах',
                        license: 305345,
                        status: "Активен от 06.03.2005",
                        rating: 4.1,
                    },
                    {
                        name: 'РЕСО-Гарантия',
                        license: 356914,
                        status: "Активен от 15.05.2000",
                        rating: 3.9,
                    },
                ],
            }
        },
        methods: {
            getRating (rating) {
                if (rating > 4.4) return 'green'
                else if (rating > 3.9) return 'orange'
                else return 'red'
            },
        },
    }
</script>

<style scoped>

</style>
