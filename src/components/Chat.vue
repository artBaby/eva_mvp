<template>
    <v-container>

        <chat-window :currentUserId="currentUserId"
                     :rooms="rooms"
                     :messages="messages"
                     :messagesLoaded="messagesLoaded"
                     :roomId=1
                     :textMessages="this.textMessages"
                     @fetchMessages="fetchMessages"

        />
    </v-container>

</template>

<script>
    import ChatWindow from 'vue-advanced-chat'
    import 'vue-advanced-chat/dist/vue-advanced-chat.css'

    export default {
        components: {
            ChatWindow
        },
        data() {
            return {
                messagesLoaded: false,
                rooms: [
                    {
                        roomId: 1,
                        roomName: 'ООО Прогресс ТК',
                        lastMessage: {
                            content: 'Поняли, спасибо',
                            sender_id: 1234,
                            username: 'John Doe',
                            timestamp: '10:20',
                            date: 123242424,
                            seen: true,
                            new: true
                        },
                        users: [
                            {
                                _id: 1234,
                                username: 'John Doe',
                                status: {
                                    state: 'online',
                                    last_changed: 'today, 14:30'
                                }
                            },
                            {
                                _id: 4321,
                                username: 'John Snow',
                                status: {
                                    state: 'offline',
                                    last_changed: '14 July, 20:00'
                                }
                            }
                        ],
                        typingUsers: [1234]
                    },

                    {
                        roomId: 2,
                        roomName: 'FastLines TK',
                        lastMessage: {
                            content: 'ждем',
                            sender_id: 1234,
                            username: 'John Doe',
                            timestamp: '9:44',
                            date: 123242424,
                            seen: true,
                            new: true
                        },
                        users: [
                            {
                                _id: 1234,
                                username: 'John Doe',
                                status: {
                                    state: 'online',
                                    last_changed: 'today, 14:30'
                                }
                            },
                            {
                                _id: 4321,
                                username: 'John Snow',
                                status: {
                                    state: 'offline',
                                    last_changed: '14 July, 20:00'
                                }
                            }
                        ]
                    }

                ],
                messages: [
                    {
                        _id: 1,
                        content: 'Подскажите, фура уже выехала?',
                        sender_id: 1234,
                        username: 'John Doe',
                        date: '13 November',
                        timestamp: '10:20',
                        seen: true,
                        disable_actions: false,
                        disable_reactions: true,
                        // file: {
                        //     name: 'My File',
                        //     size: 67351,
                        //     type: 'png',
                        //     url: 'https://firebasestorage.googleapis.com/...'
                        // },
                        // reactions: {
                        //     wink: [
                        //         1234, // USER_ID
                        //         4321
                        //     ],
                        //     laughing: [
                        //         1234
                        //     ]
                        // }
                    },
                    {
                        _id: 2,
                        content: 'Да, уже в пути!',
                        sender_id: 4321,
                        username: 'John Doe',
                        date: '13 November',
                        timestamp: '10:20',
                        seen: true,
                        disable_actions: false,
                        disable_reactions: true,
                    },
                    {
                        _id: 3,
                        content: 'Узнать местоположение машины вы можете в разделе "Отслеживание груза"',
                        sender_id: 4321,
                        username: 'John Doe',
                        date: '13 November',
                        timestamp: '10:21',
                        seen: true,
                        disable_actions: false,
                        disable_reactions: true,
                    },
                    {
                        _id: 4,
                        content: 'Поняли, спасибо',
                        sender_id: 1234,
                        username: 'John Doe',
                        date: '13 November',
                        timestamp: '10:21',
                        seen: true,
                        disable_actions: false,
                        disable_reactions: true,
                    }
                ],
                currentUserId: 1234,

                textMessages: {
                    NEW_MESSAGES: 'Новые сообщения',
                    MESSAGE_DELETED: 'Ce message a été supprimé',
                    MESSAGES_EMPTY: 'Aucun message',
                    CONVERSATION_STARTED: 'Диалог начат:',
                    TYPE_MESSAGE: 'Введите сообщение',
                    SEARCH: 'Поиск'
                },

            }
        },
        methods: {
            fetchMessages({room, options = {}}) {
                // this.showMessages = false;

                return (this.messagesLoaded = true)
            }
        }


    }
</script>

<style scoped>

</style>
