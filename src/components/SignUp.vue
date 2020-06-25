<template>
    <v-container>
<!--        <div id="login">-->
<!--                <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">-->
<!--                    <div>-->
<!--                        <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark-->
<!--                                grow>-->
<!--                            <v-tabs-slider color="purple darken-4"></v-tabs-slider>-->
<!--                            <v-tab v-for="i in tabs" :key="i">-->
<!--                                <v-icon large>{{ i.icon }}</v-icon>-->
<!--                                <div class="caption py-1">{{ i.name }}</div>-->
<!--                            </v-tab>-->
<!--                            <v-tab-item>-->
<!--                                <v-card class="px-4">-->
<!--                                    <v-card-text>-->
<!--                                        <v-form ref="loginForm" v-model="valid" lazy-validation>-->
<!--                                            <v-row>-->
<!--                                                <v-col cols="12">-->
<!--                                                    <v-text-field v-model="loginEmail" :rules="loginEmailRules"-->
<!--                                                                  label="E-mail" required></v-text-field>-->
<!--                                                </v-col>-->
<!--                                                <v-col cols="12">-->
<!--                                                    <v-text-field v-model="loginPassword"-->
<!--                                                                  :append-icon="show1?'eye':'eye-off'"-->
<!--                                                                  :rules="[rules.required, rules.min]"-->
<!--                                                                  :type="show1 ? 'text' : 'password'" name="input-10-1"-->
<!--                                                                  label="Password" hint="At least 8 characters" counter-->
<!--                                                                  @click:append="show1 = !show1"></v-text-field>-->
<!--                                                </v-col>-->
<!--                                                <v-col class="d-flex" cols="12" sm="6" xsm="12">-->
<!--                                                </v-col>-->
<!--                                                <v-spacer></v-spacer>-->
<!--                                                <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>-->
<!--                                                    <v-btn x-large block :disabled="!valid" color="success"-->
<!--                                                           @click="validate"> Login-->
<!--                                                    </v-btn>-->
<!--                                                </v-col>-->
<!--                                            </v-row>-->
<!--                                        </v-form>-->
<!--                                    </v-card-text>-->
<!--                                </v-card>-->
<!--                            </v-tab-item>-->
<!--                            <v-tab-item>-->
<!--                                <v-card class="px-4">-->
<!--                                    <v-card-text>-->
<!--                                        <v-form ref="registerForm" v-model="valid" lazy-validation>-->
<!--                                            <v-row>-->
<!--                                                <v-col cols="12" sm="6" md="6">-->
<!--                                                    <v-text-field v-model="firstName" :rules="[rules.required]"-->
<!--                                                                  label="First Name" maxlength="20"-->
<!--                                                                  required></v-text-field>-->
<!--                                                </v-col>-->
<!--                                                <v-col cols="12" sm="6" md="6">-->
<!--                                                    <v-text-field v-model="lastName" :rules="[rules.required]"-->
<!--                                                                  label="Last Name" maxlength="20"-->
<!--                                                                  required></v-text-field>-->
<!--                                                </v-col>-->
<!--                                                <v-col cols="12">-->
<!--                                                    <v-text-field v-model="email" :rules="emailRules" label="E-mail"-->
<!--                                                                  required></v-text-field>-->
<!--                                                </v-col>-->
<!--                                                <v-col cols="12">-->
<!--                                                    <v-text-field v-model="password"-->
<!--                                                                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"-->
<!--                                                                  :rules="[rules.required, rules.min]"-->
<!--                                                                  :type="show1 ? 'text' : 'password'" name="input-10-1"-->
<!--                                                                  label="Password" hint="At least 8 characters" counter-->
<!--                                                                  @click:append="show1 = !show1"></v-text-field>-->
<!--                                                </v-col>-->
<!--                                                <v-col cols="12">-->
<!--                                                    <v-text-field block v-model="verify"-->
<!--                                                                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"-->
<!--                                                                  :rules="[rules.required, passwordMatch]"-->
<!--                                                                  :type="show1 ? 'text' : 'password'" name="input-10-1"-->
<!--                                                                  label="Confirm Password" counter-->
<!--                                                                  @click:append="show1 = !show1"></v-text-field>-->
<!--                                                </v-col>-->
<!--                                                <v-spacer></v-spacer>-->
<!--                                                <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">-->
<!--                                                    <v-btn x-large block :disabled="!valid" color="success"-->
<!--                                                           @click="validate">Register-->
<!--                                                    </v-btn>-->
<!--                                                </v-col>-->
<!--                                            </v-row>-->
<!--                                        </v-form>-->
<!--                                    </v-card-text>-->
<!--                                </v-card>-->
<!--                            </v-tab-item>-->
<!--                        </v-tabs>-->
<!--                    </div>-->
<!--                </v-dialog>-->
<!--        </div>-->

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                    >
                        Open Dialog
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Legal first name*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                            label="Legal last name*"
                                            hint="example of persistent helper text"
                                            persistent-hint
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Email*" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Password*" type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                            :items="['0-17', '18-29', '30-54', '54+']"
                                            label="Age*"
                                            required
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-autocomplete
                                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                            label="Interests"
                                            multiple
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "SignUp"
    }
</script>

<style scoped>

</style>
