<template>
    <v-container>
        <h1 class="font-weight-light">Поиск Перевозчика</h1>

        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Тип поиска</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="step > 2" step="2">Регистрация рейса</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="step > 3" step="3">Выбор перевозчика</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="step > 4" step="4">Подписание документов</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="step > 4" step="5">Готово</v-stepper-step>
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
                            color="success"
                            @click="checkStep1()"
                    >
                        Продолжить
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-form ref="form">
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
                                                    readonly
                                                    style="max-width: fit-content;"
                                                    :rules="[v => !!v || 'Обязательное поле.']"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date1" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col cols="2">
                                    <v-menu
                                            ref="menu1"
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
                                                    readonly
                                                    style="max-width: fit-content;"
                                                    :rules="[v => !!v || 'Обязательное поле.']"
                                                    required
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
                                class="ma-2"
                                :loading="loadSearchButton"
                                :disabled="loadSearchButton"
                                color="success"
                                @click="loader = 'loadSearchButton'"
                        >
                            Продолжить
                            <template v-slot:loader>
                                <span>Поиск...</span>
                            </template>
                        </v-btn>

                        <v-btn
                                color="secondary"
                                @click="step = 1"
                                style="margin-left: 5px;"
                        >
                            Назад
                        </v-btn>
                    </v-form>

                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                            class="mb-12"
                    >
                        <div>
                            Выберите перевозчика из списка доступных:
                        </div>
                        <v-item-group>
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card
                                                    :color="active ? 'light-blue accent-2' : 'green lighten-5'"
                                                    class=""
                                                    dark
                                                    height="200"
                                                    @click="toggle"
                                                    :elevation="active ? '5' : '0'"
                                            >
                                                <v-card-text>
                                                    <p class="display-1 text--primary">
                                                        ООО Прогресс ТК
                                                    </p>
                                                    <v-row align-content="start">
                                                        <v-col cols="1">
                                                            <span class="text--primary caption mr-2">
                                                                Рейтинг: ({{ rating1 }})
                                                            </span>
                                                        </v-col>

                                                        <v-col cols="1">
                                                            <v-rating
                                                                    v-model="rating1"
                                                                    background-color="yellow"
                                                                    color="yellow accent-4"
                                                                    dense
                                                                    half-increments
                                                                    hover
                                                                    size="18"
                                                            ></v-rating>
                                                        </v-col>

                                                    </v-row>
                                                    <p class="deep-orange--text text--darken-1 font-weight-bold">
                                                        Цена: 50.000 &#8381;
                                                    </p>
                                                    <p class="text--primary">
                                                        Последний отзыв: "Быстрая коммуникация с компанией, всегда есть
                                                        свободные машины для перевозки." (с) ООО Морозко
                                                    </p>


                                                </v-card-text>
                                                <v-scroll-y-transition>
                                                    <div
                                                            v-if="active"
                                                            class="display-3 flex-grow-1 text-center"
                                                    >
                                                    </div>
                                                </v-scroll-y-transition>
                                            </v-card>
                                        </v-item>
                                    </v-col>
                                </v-row>


                                <v-row>
                                    <v-col>
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card
                                                    :color="active ? 'light-blue accent-2' : 'green lighten-5'"
                                                    class=""
                                                    dark
                                                    height="200"
                                                    @click="toggle"
                                                    :elevation="active ? '5' : '0'"
                                            >
                                                <v-card-text>
                                                    <p class="display-1 text--primary">
                                                        AvtoTrans ТК
                                                    </p>
                                                    <v-row align-content="start">
                                                        <v-col cols="1">
                                                            <span class="text--primary caption mr-2">
                                                                Рейтинг: ({{ rating2 }})
                                                            </span>
                                                        </v-col>

                                                        <v-col cols="1">
                                                            <v-rating
                                                                    v-model="rating2"
                                                                    background-color="yellow"
                                                                    color="yellow accent-4"
                                                                    dense
                                                                    half-increments
                                                                    hover
                                                                    size="18"
                                                            ></v-rating>
                                                        </v-col>

                                                    </v-row>
                                                    <p class="deep-orange--text text--darken-1 font-weight-bold">
                                                        Цена: 44.850 &#8381;
                                                    </p>
                                                    <p class="text--primary">
                                                        Последний отзыв: "Возникла накладка с документами, но сотрудники
                                                        ТК быстро ее решили." (с) ООО ХолдингАква
                                                    </p>
                                                </v-card-text>
                                                <v-scroll-y-transition>
                                                    <div
                                                            v-if="active"
                                                            class="display-3 flex-grow-1 text-center"
                                                    >
                                                    </div>
                                                </v-scroll-y-transition>
                                            </v-card>
                                        </v-item>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-item v-slot:default="{ active, toggle }">
                                            <v-card
                                                    :color="active ? 'light-blue accent-2' : 'green lighten-5'"
                                                    class=""
                                                    dark
                                                    height="200"
                                                    @click="toggle"
                                                    :elevation="active ? '5' : '0'"
                                            >
                                                <v-card-text>
                                                    <p class="display-1 text--primary">
                                                        GTD ТК
                                                    </p>
                                                    <v-row align-content="start">
                                                        <v-col cols="1">
                                                            <span class="text--primary caption mr-2">
                                                                Рейтинг: ({{ rating3 }})
                                                            </span>
                                                        </v-col>

                                                        <v-col cols="1">
                                                            <v-rating
                                                                    v-model="rating3"
                                                                    background-color="yellow"
                                                                    color="yellow accent-4"
                                                                    dense
                                                                    half-increments
                                                                    hover
                                                                    size="18"
                                                            ></v-rating>
                                                        </v-col>

                                                    </v-row>
                                                    <p class="deep-orange--text text--darken-1 font-weight-bold">
                                                        Цена: 61.300 &#8381;
                                                    </p>
                                                    <p class="text--primary">
                                                        Последний отзыв: "Пользуемся услугой данной компании на
                                                        протяжении последних 10 лет. Всегда довольны водителями и
                                                        техическим состоянием ТС." (с)
                                                        ООО ЛазерТех
                                                    </p>
                                                </v-card-text>
                                                <v-scroll-y-transition>
                                                    <div
                                                            v-if="active"
                                                            class="display-3 flex-grow-1 text-center"
                                                    >
                                                    </div>
                                                </v-scroll-y-transition>
                                            </v-card>
                                        </v-item>
                                    </v-col>
                                </v-row>

                            </v-container>
                        </v-item-group>
                    </v-card>

                    <v-btn
                            color="success"
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
                </v-stepper-content>

                <v-stepper-content step="4">
                    <v-card
                            class="mb-12"
                    >
                        <div>
                            Прикрепите все необходимые документы для оформления фрахта:
                        </div>
                        <v-file-input chips multiple label="Прикрепить файлы"></v-file-input>
                    </v-card>

                    <v-btn
                            color="success"
                            @click="step = 5"

                    >
                        Заключить контракт
                    </v-btn>
                    <v-btn
                            color="secondary"
                            @click="step = 4"
                            style="margin-left: 5px;"
                    >
                        Назад
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="5">
                    <v-card
                            class="mb-12"
                            color="light-green"
                    >
                        <div
                        >
                            <p class="white--text text-center">Готово!</p>
                        </div>
                    </v-card>

                    <v-btn
                            color="secondary"
                            @click="step = 3"
                            style="margin-left: 5px;"
                    >
                        Назад
                    </v-btn>
                </v-stepper-content>

            </v-stepper-items>
        </v-stepper>

        <v-snackbar
                v-model="snackbar"
                color="error"
                timeout=2000
                :top=true
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
            menu1: false,
            menu2: false,
            rating1: 4.2,
            rating2: 3.7,
            rating3: 4.9,
            loadSearchButton: false,
            loader: null,
            form2Validated: false,

        }),

        watch: {
            loader() {
                const l = this.loader
                this.form2Validated = this.$refs.form.validate()

                if (!this.form2Validated) {
                    this.loader = null
                    this.showErrorStep2()
                    return
                }
                this[l] = !this[l]

                setTimeout(() => {
                        this[l] = false;
                        this.step = 3;
                    }
                    , 3000)
                this.loader = null
            },
        },

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
            showErrorStep2() {
                this.snackBarText = "Заполните все обязательные поля"
                this.snackbar = true;
            },
            getCitiesList() {
                return json.cities
            },
            citiesFilter(item, queryText, itemText) {
                const textOne = item.city.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1
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
