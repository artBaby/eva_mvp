<template>
    <v-container>
        <h1 class="font-weight-light">Поиск Перевозчика</h1>

        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Тип поиска</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="step > 2" step="2">Регистрация рейса</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="3">Выбор перевозчика</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step step="4">Подписание документов</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                            class="mb-12"
                            color=" lighten-1"
                    >
                        <v-radio-group v-model="searchType" column>
                            <v-row align="center" class="ml-3" style="min-height: 54px">
                                <v-col cols="12" md="3">
                                    <v-radio color="success" label="Аукцион" value="1"></v-radio>
                                </v-col>
                                <v-col cols="12" md="3" class="ma-n5">
                                    <transition name="fade">
                                        <v-select v-model="participantValue"
                                                  :items="participantItems"
                                                  :rules="[v => !!v || 'Выберите участников']"
                                                  label="Участники"
                                                  v-if="searchType === '1'"
                                                  v
                                        ></v-select>
                                    </transition>
                                </v-col>
                            </v-row>

                            <v-row align="center" class=" ml-3">
                                <v-col cols="12" md="3">
                                    <v-radio color="success" label="Самостоятельный поиск" value="2"></v-radio>
                                </v-col>
                            </v-row>
                            <v-row align="center" class=" ml-3">
                                <v-col cols="12" md="3">
                                    <v-radio color="success" label="Автоматический поиск" value="3"></v-radio>
                                </v-col>
                            </v-row>

                        </v-radio-group>


                    </v-card>

                    <v-btn
                            color="primary"
                            @click="checkStep1()"
                    >
                        Продолжить
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                            class="mb-12"
                    >
                        <v-row no-gutters>
                            <v-col>
                                <v-text-field label="Описание груза"
                                              :rules="rules"
                                              tile
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="2">
                                <v-text-field
                                        label="Вес"
                                        required
                                        suffix="кг"
                                        style="max-width: fit-content"
                                        :rules="[v => !!v || 'Обязательное поле.']"
                                        tile
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="2">
                                <v-text-field
                                        label="Длина"
                                        required
                                        suffix="м"
                                        :rules="[v => !!v || 'Обязательное поле.']"
                                        tile
                                        style="max-width: fit-content"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2" class="ml-4">
                                <v-text-field
                                        label="Ширина"
                                        required
                                        :rules="[v => !!v || 'Обязательное поле.']"

                                        suffix="м"
                                        tile
                                        style="max-width: fit-content"

                                ></v-text-field>
                            </v-col>
                            <v-col cols="3" class="ml-4">
                                <v-text-field
                                        label="Высота"
                                        required
                                        suffix="м"
                                        :rules="[v => !!v || 'Обязательное поле.']"
                                        tile
                                        style="max-width: fit-content;"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="6">
                                <v-text-field
                                        label="Способ погрузки / выгрузки"
                                        required
                                        :rules="[v => !!v || 'Обязательное поле.']"
                                        tile
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="6">
                                <v-select v-model="loadTypeValue"
                                          :items="loadTypeItems"
                                          :rules="[v => !!v || 'Обязательное поле.']"
                                          label="Условия транспортировки"
                                          tile
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="2">
                                <v-autocomplete
                                        v-model="fromLocation"
                                        :items="getCitiesList()"
                                        :filter="citiesFilter"
                                        label="Откуда"
                                        item-text="city"
                                        item-value="city"
                                        :hint="showLocationHint(fromLocation)"
                                        prepend-icon="map"
                                        persistent-hint
                                        return-object
                                        single-line
                                        no-data-text="Город не найден"
                                        :rules="[v => !!v || 'Обязательное поле.']"
                                ></v-autocomplete>
                            </v-col>

                            <v-col cols="2" class="ml-5">
                                <v-autocomplete
                                        v-model="toLocation"
                                        :items="getCitiesList()"
                                        :filter="citiesFilter"
                                        label="Куда"
                                        item-text="city"
                                        item-value="city"
                                        :hint="showLocationHint(toLocation)"
                                        append-outer-icon="map"
                                        single-line
                                        persistent-hint
                                        return-object
                                        no-data-text="Город не найден"
                                        :rules="[v => !!v || 'Обязательное поле.']"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>

                        <v-row no-gutters align="center">
                            <v-col cols="1">
                                <div class="text-center">Cроки поездки:</div>
                            </v-col>

                            <v-col cols="2" class="ml-2">
                                <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                v-model="date1"
                                                label="Дата отправления"
                                                persistent-hint
                                                prepend-icon="event"
                                                v-bind="attrs"
                                                v-on="on"
                                                style="max-width: fit-content;"
                                                :rules="[v => !!v || 'Обязательное поле.']"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date1" no-title @input="menu1 = false"></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="2">
                                <v-menu
                                        ref="menu2"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                v-model="date2"
                                                label="Дата прибытия"
                                                persistent-hint
                                                prepend-icon="event"
                                                v-bind="attrs"
                                                v-on="on"
                                                style="max-width: fit-content;"
                                                :rules="[v => !!v || 'Обязательное поле.']"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="8">
                                <v-textarea
                                        prepend-inner-icon="mdi-comment"
                                        class="mx-2"
                                        label="Комментарий"
                                        rows="2"
                                        auto-grow
                                ></v-textarea>
                            </v-col>
                        </v-row>

                    </v-card>


                    <v-btn
                            color="primary"
                            @click="step = 3"
                    >
                        Продолжить
                    </v-btn>
                    <v-btn
                            color="secondary"
                            @click="step = 1"
                            style="margin-left: 5px;"
                    >
                        Назад
                    </v-btn>

                    <v-btn text
                           style="margin-left: 5px;"
                    >Отмена
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                    ></v-card>

                    <v-btn
                            color="primary"
                            @click="step = 4"
                    >
                        Продолжить
                    </v-btn>
                    <v-btn
                            color="secondary"
                            @click="step = 2"
                            style="margin-left: 5px;"

                    >
                        Назад
                    </v-btn>

                    <v-btn text
                           style="margin-left: 5px;"
                    >Отмена
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                    ></v-card>

                    <v-btn
                            color="primary"
                            @click="doSearch()"
                    >
                        Поиск
                    </v-btn>
                    <v-btn
                            color="secondary"
                            @click="step = 3"
                            style="margin-left: 5px;"

                    >
                        Назад
                    </v-btn>

                    <v-btn text
                           style="margin-left: 5px;"
                    >Отмена
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>

        <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                color="error"
                :left="x === 'left'"
                :multi-line="mode === 'multi-line'"
                :right="x === 'right'"
                timeout=2000
                :top=true
                :vertical="mode === 'vertical'"
        >
            {{ snackBarText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                        dark
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                >
                    Закрыть
                </v-btn>
            </template>
        </v-snackbar>

    </v-container>
</template>

<script>
    import json from '../../resources/citiesList.json'

    export default {
        name: "SearchTransporter",
        data: () => ({
            step: 1,
            participantItems: ['Общий', 'Выбор конкретных участников', 'Свободные участники'],
            loadTypeItems: ['Тент',
                'Рефрижератор',
                'Изотерм',
                'Автосцепка',
                'Jumbo',
                'Контейнеровоз',
                'Открытая бортовая платформа',
                'Платформа для негабаритных грузов',
                'Открытая платформа',
                'Автоцистерна',
                'Автовоз',
                'Зерновз',
                'Самосвал',
                'Лесовоз',
                'Инлоудер',
                'Прицеп для перевозки животных',
                'Спецтехника'].sort(),
            rules: [
                value => !!value || 'Обязательное поле.',
                value => (value && value.length >= 5) || 'Минимум 5 символов',
            ],
            searchType: "",
            snackBarText: "",
            snackbar: false,
            participantValue: "",
            loadTypeValue: "",
            fromLocation: "",
            toLocation: "",
            date1: "",
            date2: "",
            // dateFormatted: new Date().toISOString().substr(0, 10),
            menu1: false,
            menu2: false,
        }),

        methods: {
            checkStep1() {
                if (this.searchType === "") {
                    this.snackBarText = "Выберите тип поиска"
                    this.snackbar = true;
                    return;
                }
                if (this.searchType === "1" && this.participantValue.trim() === "") {
                    this.snackBarText = "Выберите список участников аукциона"
                    this.snackbar = true;
                    return;
                }
                this.step = 2;
            },
            getCitiesList() {
                return json.cities
            },
            citiesFilter(item, queryText, itemText) {
                const textOne = item.city.toLowerCase()
                // const textTwo = item.region.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1
                // ||
                // textTwo.indexOf(searchText) > -1
            },
            showLocationHint(location) {
                if (location.city) {
                    return location.city + ', ' + location.region
                }
            },
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate(date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },

        }
    }
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }
</style>
