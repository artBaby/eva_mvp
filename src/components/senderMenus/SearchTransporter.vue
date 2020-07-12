<template>
    <v-container>
        <h1 class="font-weight-light">Поиск Перевозчика</h1>

        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Тип поиска</v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Регистрация рейса</v-stepper-step>
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
                            height="250px"
                    >
                        <v-radio-group v-model="column" column style="margin-left: 10px">
                            <v-row align="center"
                            >
                                <v-col cols="12"
                                       md="4">
                                    <v-radio label="Аукцион" value="radio-1"></v-radio>
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="3">
                                    <!--                                    <v-menu open-on-hover top offset-y>-->
                                    <!--                                        <template v-slot:activator="{ on, attrs }">-->
                                    <!--                                            <v-btn-->
                                    <!--                                                    color="primary"-->
                                    <!--                                                    dark-->
                                    <!--                                                    v-bind="attrs"-->
                                    <!--                                                    v-on="on"-->
                                    <!--                                            >-->
                                    <!--                                                Участники-->
                                    <!--                                            </v-btn>-->
                                    <!--                                        </template>-->

                                    <!--                                        <v-list>-->
                                    <!--                                            <v-list-item link>-->
                                    <!--                                                <v-list-item-content>-->
                                    <!--                                                    <v-list-item-title> Общий </v-list-item-title>-->
                                    <!--                                                </v-list-item-content>-->
                                    <!--                                            </v-list-item>-->
                                    <!--                                            <v-list-item link>-->
                                    <!--                                                <v-list-item-content>-->
                                    <!--                                                    <v-list-item-title> Выбор конкретных участников </v-list-item-title>-->
                                    <!--                                                </v-list-item-content>-->
                                    <!--                                            </v-list-item>-->
                                    <!--                                            <v-list-item link>-->
                                    <!--                                                <v-list-item-content>-->
                                    <!--                                                    <v-list-item-title> Свободные участники </v-list-item-title>-->
                                    <!--                                                </v-list-item-content>-->
                                    <!--                                            </v-list-item>-->


                                    <!--                                        </v-list>-->
                                    <!--                                    </v-menu>-->
                                    <v-select
                                            :items="participantItems"
                                            filled
                                            label="Участники"
                                    ></v-select>
                                </v-col>
                            </v-row>

                            <v-radio label="Самостоятельный поиск" value="radio-2"></v-radio>
                            <v-radio label="Автоматический поиск" value="radio-3" style="margin-top: 25px;"></v-radio>

                        </v-radio-group>


                    </v-card>

                    <v-btn
                            color="primary"
                            @click="e1 = 2"
                    >
                        Продолжить
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                            class="mb-12"
                            color="white lighten-1"
                            height="250px"
                    >


                        <v-text-field label="Описание груза" :rules="rules" hide-details="auto"></v-text-field>

                        <v-text-field
                                label="Вес"
                                aria-required="true"
                                suffix="кг"
                                style="width: 150px"
                        ></v-text-field>

                        <v-row>
                            <v-col cols="12"
                                   md="2">
                                <v-text-field
                                        label="Длина"
                                        aria-required="true"
                                        suffix="м"
                                        tile
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12"
                            md="2">
                                <v-text-field
                                        label="Ширина"
                                        aria-required="true"
                                        suffix="м"
                                        tile
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12"
                                   md="2">
                                <v-text-field
                                        label="Высота"
                                        aria-required="true"
                                        suffix="м"
                                        tile
                                ></v-text-field>
                            </v-col>
                        </v-row>

                    </v-card>


                    <v-btn
                            color="primary"
                            @click="e1 = 3"
                    >
                        Продолжить
                    </v-btn>
                    <v-btn
                            color="secondary"
                            @click="e1 = 1"
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
                            @click="e1 = 4"
                    >
                        Продолжить
                    </v-btn>
                    <v-btn
                            color="secondary"
                            @click="e1 = 2"
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
                            @click="e1 = 3"
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

    </v-container>
</template>

<script>
    export default {
        name: "SearchTransporter",
        data: () => ({
            e1: 1,
            participantItems: ['Общий', 'Выбор конкретных участников', 'Свободные участники'],
            rules: [
                value => !!value || 'Обязательное поле.',
                value => (value && value.length >= 5) || 'Минимум 5 символов',
            ],

        })
    }
</script>

<style scoped>

</style>
