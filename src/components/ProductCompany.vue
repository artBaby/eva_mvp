<template >
    <v-container>
<!--        <v-row>-->
<!--            <v-col >-->

                <v-navigation-drawer fixed
                                     v-model="drawer"
                                     :color="color"
                                     :expand-on-hover="expandOnHover"
                                     :mini-variant="miniVariant"
                                     :right="right"
                                     :src="bg"
                                     absolute
                                     dark
                                     app
                                     clipped
                >
                    <v-list
                            dense
                            nav
                            class="py-0"
                    >
                        <v-list-item two-line :class="miniVariant && 'px-0'">
                            <v-list-item-content>
                                <v-list-item-title>{{fillUserName()}}</v-list-item-title>
                                <v-list-item-subtitle>Профиль отправителя</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-list-item  link @click="showContainer('searchTransporter')">
                            <v-list-item-content>
                                <v-list-item-title>Поиск перевозчика</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link @click="showContainer('checkGruz')">
                            <v-list-item-content>
                                <v-list-item-title>Отслеживание груза</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>


                        <v-list-item link @click="showContainer('chat')">
                            <v-list-item-content>
                                <v-list-item-title>Чат</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link @click="showContainer('insurance')">
                            <v-list-item-content>
                                <v-list-item-title>Страхование груза</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link @click="showContainer('sklad')">
                            <v-list-item-content>
                                <v-list-item-title>Складские комплексы и РЦ</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link @click="showContainer('chop')">
                            <v-list-item-content>
                                <v-list-item-title>ЧОП</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link @click="showContainer('searchCustomsBroker')">
                            <v-list-item-content>
                                <v-list-item-title>Поиск таможенного брокера</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link @click="showContainer('payFracht')">
                            <v-list-item-content>
                                <v-list-item-title>Оплата фрахта</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link @click="showContainer('archive')">
                            <v-list-item-content>
                                <v-list-item-title>Архив сделок</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item link @click="showContainer('settings')">
                            <v-list-item-content>
                                <v-list-item-title>Настройки</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                    </v-list>
                </v-navigation-drawer>

<!--            </v-col>-->

<!--            <v-col >-->
                <v-content>
                    <v-container >
                        <SearchTransporter app v-show="this.containerList.searchTransporter"/>
                        <CheckGruz v-show="this.containerList.checkGruz"/>
                        <Chat v-show="this.containerList.chat"/>
                        <Insurance v-show="this.containerList.insurance"/>
                        <Sklad v-show="this.containerList.sklad"/>
                        <Chop v-show="this.containerList.chop"/>
                        <SearchCustomsBroker v-show="this.containerList.searchCustomsBroker"/>
                        <PayFracht v-show="this.containerList.payFracht"/>
                        <Archive v-show="this.containerList.archive"/>
                        <Settings v-show="this.containerList.settings"/>
                    </v-container>
                </v-content>
<!--            </v-col>-->

<!--        </v-row>-->
    </v-container>
</template>

<script>
    import SearchTransporter from "@/components/senderMenus/SearchTransporter";
    import CheckGruz from "@/components/senderMenus/CheckGruz";
    import Chat from "@/components/Chat";
    import Insurance from "@/components/senderMenus/Insurance";
    import Sklad from "@/components/senderMenus/Sklad";
    import Chop from "@/components/senderMenus/Chop";
    import SearchCustomsBroker from "@/components/senderMenus/SearchCustomsBroker";
    import PayFracht from "@/components/senderMenus/PayFracht";
    import Archive from "@/components/senderMenus/Archive";
    import Settings from "@/components/senderMenus/Settings";

    export default {
        name: 'ProductCompany',
        components: {
            CheckGruz,
            SearchTransporter,
            Chat,
            Insurance,
            Sklad,
            Chop,
            SearchCustomsBroker,
            PayFracht,
            Archive,
            Settings

        },
        data: () => ({
            drawer: true,
            clipped: false,
            email: '',
            show_search: false,
            containerList: {
                searchTransporter: true,
                checkGruz: false,
                chat: false,
                insurance: false,
                sklad: false,
                chop: false,
                searchCustomsBroker: false,
                payFracht: false,
                archive: false,
                settings: false
            }
        }),
        methods: {
            fillUserName() {
                switch (this.email) {
                    case 'otprav@m.ru':
                        this.$userCompanyName = 'ООО Ева Логистикс Интернешнл Лимитед';
                        break;
                    default:
                        this.$userCompanyName = 'ООО Без Названия';
                }
                return this.$userCompanyName;
            },
            showContainer(containerName) {
                for (let c in this.containerList) {
                    this.containerList[c] = c === containerName;
                }
            }
        }
    }
</script>
