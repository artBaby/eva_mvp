<template>
    <v-container>

        <v-navigation-drawer fixed
                             v-model="drawer"
                             dark
                             app
                             clipped
                             disable-resize-watcher
        >
            <v-list
                    dense
                    nav
            >
                <v-list-item two-line :class="'px-0'">
                    <v-list-item-content>
                        <v-list-item-title>{{fillUserName()}}</v-list-item-title>
                        <v-list-item-subtitle>Профиль отправителя</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item :class='containerList.searchTransporter && usedTheme' link
                             @click="showContainer('searchTransporter')">
                    <v-list-item-content>
                        <v-list-item-title>Поиск перевозчика</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :class='containerList.checkGruz && usedTheme' link @click="showContainer('checkGruz')">
                    <v-list-item-content>
                        <v-list-item-title>Отслеживание груза</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>


                <v-list-item :class='containerList.chat && usedTheme' link @click="showContainer('chat')">
                    <v-list-item-content>
                        <v-list-item-title>Чат</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :class='containerList.insurance && usedTheme' link @click="showContainer('insurance')">
                    <v-list-item-content>
                        <v-list-item-title>Страхование груза</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :class='containerList.sklad && usedTheme' link @click="showContainer('sklad')">
                    <v-list-item-content>
                        <v-list-item-title>Складские комплексы и РЦ</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :class='containerList.chop && usedTheme' link @click="showContainer('chop')">
                    <v-list-item-content>
                        <v-list-item-title>ЧОП</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :class='containerList.searchCustomsBroker && usedTheme' link
                             @click="showContainer('searchCustomsBroker')">
                    <v-list-item-content>
                        <v-list-item-title>Поиск таможенного брокера</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :class='containerList.payFracht && usedTheme' link @click="showContainer('payFracht')">
                    <v-list-item-content>
                        <v-list-item-title>Оплата фрахта</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :class='containerList.archive && usedTheme' link @click="showContainer('archive')">
                    <v-list-item-content>
                        <v-list-item-title>Архив сделок</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item :class='containerList.settings && usedTheme' link @click="showContainer('settings')">
                    <v-list-item-content>
                        <v-list-item-title>Настройки</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-container>

                <transition name="fade-transition">
                    <SearchTransporter app v-show="this.containerList.searchTransporter"/>
                </transition>

                <transition name="fade-transition">
                    <CheckGruz v-show="this.containerList.checkGruz"/>
                </transition>

                <transition name="fade-transition">
                    <Chat v-show="this.containerList.chat"/>
                </transition>

                <transition name="fade-transition">
                    <Insurance v-show="this.containerList.insurance"/>
                </transition>

                <transition name="fade-transition">
                    <Sklad v-show="this.containerList.sklad"/>
                </transition>

                <transition name="fade-transition">
                    <Chop v-show="this.containerList.chop"/>
                </transition>

                <transition name="fade-transition">
                    <SearchCustomsBroker v-show="this.containerList.searchCustomsBroker"/>
                </transition>

                <transition name="fade-transition">
                    <PayFracht v-show="this.containerList.payFracht"/>
                </transition>

                <transition name="fade-transition">
                    <Archive v-show="this.containerList.archive"/>
                </transition>

                <transition name="fade-transition">
                    <Settings v-show="this.containerList.settings"/>
                </transition>

            </v-container>
        </v-content>

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
                searchTransporter: false,
                checkGruz: false,
                chat: false,
                insurance: false,
                sklad: false,
                chop: false,
                searchCustomsBroker: false,
                payFracht: false,
                archive: true,
                settings: false
            },
            usedTheme: "deep-orange",
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
                    this.containerList[c] = false;
                }
                setTimeout(() => {

                        for (let c in this.containerList) {
                            this.containerList[containerName] = true;
                        }
                    },
                    300)
            }
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
