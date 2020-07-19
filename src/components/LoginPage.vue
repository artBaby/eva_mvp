<template>
    <v-container>
        <v-form ref="form">
            <v-row class="text-center">
                <v-col cols="12" style="margin-top: 50px">
                    <v-img :src="require('../assets/logo_car.png')"
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
                                                <v-text-field label="Почта" v-model="email" required></v-text-field>
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
                                    <v-container>
                                        <v-row align="center"
                                               justify="center"
                                        >
                                            <v-btn-toggle
                                                    dense
                                                    group
                                                    rounded
                                                    v-model="userRole"
                                            >
                                                <v-col cols="6">
                                                    <div>
                                                        <v-btn
                                                                value="productCompany"
                                                                :color="userRole === 'productCompany' ? 'light-blue accent-2' : 'light-blue lighten-5'"
                                                        >
                                                            Грузовладелец
                                                        </v-btn>
                                                    </div>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-btn value="trailerCompany"
                                                           :color="userRole === 'trailerCompany' ? 'light-blue accent-2' : 'light-blue lighten-5'"
                                                    >
                                                        Грузоперевозчик
                                                    </v-btn>
                                                </v-col>
                                            </v-btn-toggle>

                                        </v-row>
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-text-field label="Почта*" v-model="email" required tile
                                                              :rules="[rules.required, rules.email]"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-text-field label="Пароль*" v-model="password" type="password" tile
                                                              required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-text-field label="Повторите пароль*" type="password"
                                                              required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-text-field label="Страна*" required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
                                            <v-col cols="12">
                                                <v-text-field
                                                        label="ИНН*"
                                                        persistent-hint
                                                        required
                                                        v-on:blur="fillCompanyName()"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
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
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-file-input accept=".doc,.docx,.pdf"
                                                              label="Учредительные документы (.doc, .docx, .pdf)"
                                                ></v-file-input>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
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
                                        <v-row no-gutters>
                                            <v-col>
                                                <v-checkbox label="Пользовательское соглашение"></v-checkbox>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
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

                        <v-overlay :value="overlay">
                            <v-progress-circular indeterminate size="64"></v-progress-circular>
                        </v-overlay>

                    </v-row>
                </v-col>
            </v-row>
        </v-form>

        <v-snackbar
                v-model="snackbar"
                color="error"
                timeout=4000
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
            snackBarText: "",
            snackbar: false,
            rules: {
                required: value => !!value || 'Обязательное поле.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Введите корректный адрес почты.'
                },
            },
            userRoleToggle: ''
        }),
        methods: {
            fillCompanyName() {
                this.isLoading = true;
                this.companyName = ""
                setTimeout(() => {
                    this.isLoading = false
                    this.companyName = "ООО Ева Логистикс Интернешнл Лимитед";
                }, 1500)
            },
            showSnackBar(message) {
                this.snackBarText = message;
                this.snackbar = true;
            },
            validated() {
                if (this.userRole === '' || typeof (this.userRole) === 'undefined') {

                    this.showSnackBar("Выберите тип пользователя")
                    return false;
                } else if (!this.$refs.form.validate()) {
                    this.showSnackBar("Проверьте обязательные поля")
                    return false;
                }
                return true;
            },
            regProcess() {
                if (this.validated()) {
                    this.overlay = true;
                    this.signUp();
                    this.dialogRegister = false;
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
                                                        this.showSnackBar("Ошибка авторизации пользователя: \n" +
                                                            err.message)
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
                            this.showSnackBar("Ошибка создания нового пользователя:\n" +
                                +err.message)
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
                            this.showSnackBar("Ошибка авторизации пользователя: \n" +
                                err.message)
                        }
                    );
            },
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
