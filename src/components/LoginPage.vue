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
                                <span class="headline">Вход в систему</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field label="Логин" v-model="email" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field label="Пароль" v-model="password" type="password"
                                                          required></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="cleanSignIn">Отмена</v-btn>
                                <v-btn color="blue darken-1" text @click="signIn">Войти</v-btn>
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
                                            <v-btn class="ma-1"
                                                   @click="setUserRoleProperty('productCompany')">
                                                Грузовладелец
                                            </v-btn>
                                        </v-col>
                                        <v-col>
                                            <v-btn class="ma-1"
                                                   v-bind="attrs"
                                                   v-on="on"
                                                   @click="setUserRoleProperty('trailerCompany')">
                                                Грузоперевозчик
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field label="Логин*" v-model="email" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field label="Пароль*" v-model="password" type="password"
                                                          required></v-text-field>
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
                                        <v-col cols="1">
                                            <v-text-field
                                                    value="+7"
                                                    disabled></v-text-field>
                                        </v-col>
                                        <v-col cols="11">
                                            <v-text-field
                                                    label="Номер телефона (Формат: 1234567890)"
                                                    v-model="phoneNumber"
                                                    type="number">
                                            </v-text-field>
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
                                <v-btn color="blue darken-1" text @click="cleanRegister()">Отмена</v-btn>
                                <v-btn color="blue darken-1" text @click="regProcess">Отправить</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

<!--                    <div ref="divProgressCircle" class="progressBarCircle" v-show="divProgressCircle">-->
<!--                        <v-container>-->
<!--                            <v-progress-circular :size="50" indeterminate-->
<!--                                                 color="amber" justify="center"-->
<!--                                                 class="align-content-center">-->
<!--                            </v-progress-circular>-->
<!--                        </v-container>-->
<!--                    </div>-->

                    <v-overlay :value="overlay">
                        <v-progress-circular indeterminate size="64"></v-progress-circular>
                    </v-overlay>

                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import firebase from 'firebase';

    const admin = require('firebase-admin')
    export default {
        name: 'LoginPage',
        data: () => ({
            on: '',
            attrs: '',
            isLoading: false,
            dialogLogin: false,
            dialogRegister: false,
            divProgressCircle: false,
            phoneNumber: null,
            companyName: '',
            email: '',
            password: '',
            userRole: '',
            overlay: false,
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
            },
            validated() {
                if (this.userRole === '') {
                    return false;
                }
                return true;
            },
            regProcess() {
                if (this.validated()) {
                    this.overlay = true;
                    this.signUp();
                    this.dialogRegister = false;
                } else {
                    alert("Выберите тип пользователя")
                }
            },
            signUp() {
                // this.dialogRegister = false;
                firebase.auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(
                        (user) => {

                            const addMessage = firebase.functions().httpsCallable("setUserRole");

                            var data = {uid: user.user.uid, role: this.userRole};
                            console.log("ROLE: " + this.userRole);
                            addMessage(data)
                                .then((result) => {
                                    console.log("cool");
                                    firebase.auth().signOut()
                                        .then(() => {
                                            console.log(55, this.email, this.password)
                                            firebase.auth()
                                                .signInWithEmailAndPassword(this.email, this.password)
                                                .then(
                                                    (user) => {
                                                        this.overlay = false;
                                                        this.$router.replace('')
                                                    },
                                                    (err) => {
                                                        this.overlay = false;
                                                        alert("signInWithEmailAndPassword Error" + err.message)
                                                    }
                                                );
                                        });
                                })
                                .catch(function (error) {
                                    console.log("setUserRole ", error);
                                    this.overlay = false;
                                    return false;
                                });

                        },
                        (err) => {
                            alert("createUserWithEmailAndPassword Error" + err.message)
                        }
                    );
                // this.cleanRegister();
            },
            cleanRegister() {
                this.dialogRegister = false;
                this.email = '';
                this.password = '';
            },
            cleanSignIn() {
                this.dialogLogin = false;
                this.overlay = false;
                this.email = '';
                this.password = '';
            },
            signIn() {
                this.dialogLogin = false;
                this.overlay = true;
                firebase.auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(
                        (user) => {
                            this.$router.replace('')
                        },
                        (err) => {
                            this.overlay = false;
                            alert("Ошибка\n" + err.message)
                        }
                    );
            },
            setUserRoleProperty(role) {
                this.userRole = role
            }
            ,
            setRole(uid) {
                var addMessage = firebase.functions().httpsCallable("setUserRole");

                var data = {uid: uid, role: this.userRole};
                console.log("ROLE: " + this.userRole);
                addMessage(data)
                    .then(function (result) {
                        console.log(result);
                        return true;
                    })
                    .catch(function (error) {
                        console.log(error)
                        return false;
                    });
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

    .progressBarCircle {
        margin: 0;
        position: absolute;
        top: 70%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%)
        text-align: center;
        background-color grey;
        border-radius: 15px;
    }

    .divCirce {
        text-align: center
    }


</style>
