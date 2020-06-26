<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-img :src="require('../assets/logo_car.png')"
                       class="my-3"
                       contain
                       height="160"
                />
            </v-col>

            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                    Добро пожаловать
                </h1>
            </v-col>


            <v-col class="mb-5" cols="12">
                <v-row justify="center">

                    <!-- Вход -->

                    <v-dialog v-model="dialogLogin" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ma-1 info"
                                   color="primary"
                                   v-bind="attrs"
                                   v-on="on">
                                Вход
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">User Profile</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field label="Логин" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field label="Пароль" type="password" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialogLogin = false">Отмена</v-btn>
                                <v-btn color="blue darken-1" text @click="dialogLogin = false">Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                    <!-- Регистрация -->

                    <v-dialog v-model="dialogRegister" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ma-1"
                                   v-bind="attrs"
                                   v-on="on">
                                Регистрация
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">Новый пользователь</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container class="inputs-container">
                                    <v-row>
                                        <v-col>
                                            <v-btn class="ma-1">
                                                Грузовладелец
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn class="ma-1"
                                                   v-bind="attrs"
                                                   v-on="on">
                                                Грузоперевозчик
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field label="Логин*" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field label="Пароль*" type="password" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field label="Повторите пароль*" type="password"
                                                          required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field label="Страна*" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                    label="ИНН*"
                                                    persistent-hint
                                                    required
                                                    v-on:blur="fillCompanyName()"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                    label="Полное наименование организации"
                                                    v-model="companyName"
                                                    persistent-hint
                                                    disabled
                                            ></v-text-field>
                                            <v-progress-linear :indeterminate="true" v-show="isLoading"
                                                               ref="company_progress_bar">
                                            </v-progress-linear>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-file-input accept=".doc,.docx,.pdf"
                                                          label="Учредительные документы (.doc, .docx, .pdf)"
                                            ></v-file-input>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-checkbox label="Пользовательское соглашение"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-checkbox label="Политика конфиденциальности"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <small>*Обязательные поля</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="dialogRegister = false">Отмена</v-btn>
                                <v-btn color="blue darken-1" text @click="dialogRegister = false">Отправить</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'StartPage',

        data: () => ({
            isLoading: false,
            dialogLogin: false,
            dialogRegister: false,
            ecosystem: [
                {
                    text: 'vuetify-loader',
                    href: 'https://github.com/vuetifyjs/vuetify-loader',
                },
                {
                    text: 'github',
                    href: 'https://github.com/vuetifyjs/vuetify',
                },
                {
                    text: 'awesome-vuetify',
                    href: 'https://github.com/vuetifyjs/awesome-vuetify',
                },
            ],
            importantLinks: [
                {
                    text: 'Documentation',
                    href: 'https://vuetifyjs.com',
                },
                {
                    text: 'Chat',
                    href: 'https://community.vuetifyjs.com',
                },
                {
                    text: 'Made with Vuetify',
                    href: 'https://madewithvuejs.com/vuetify',
                },
                {
                    text: 'Twitter',
                    href: 'https://twitter.com/vuetifyjs',
                },
                {
                    text: 'Articles',
                    href: 'https://medium.com/vuetify',
                },
            ],
            whatsNext: [
                {
                    text: 'Explore components',
                    href: 'https://vuetifyjs.com/components/api-explorer',
                },
                {
                    text: 'Select a layout',
                    href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
                },
                {
                    text: 'Frequently Asked Questions',
                    href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
                },
            ],
        }),
        methods: {
            fillCompanyName() {
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false
                    this.companyName = "ООО Ева Логистикс Интернешнл Лимитед";
                }, 1500)
            }
        }
    }
</script>

<style lang="stylus">
    .inputs-container {

        .col-12 {
            padding-top: 0;
            padding-bottom: 0;
        }

        .theme--light.v-input {
            padding-top: 0;
        }

        .v-input__slot {
            margin-bottom: 0;
        }

    }
</style>
