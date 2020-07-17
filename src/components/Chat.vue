<template>
    <div class="chat-container-eva">

        <div class="button-theme" v-if="debugChat">
            <button @click="theme = 'light'" class="button-light">Light</button>
            <button @click="theme = 'dark'" class="button-dark">Dark</button>
            <button @click="addData()" class="button-dark">Add data</button>
            <button @click="resetData()" class="button-dark">Reset data</button>
        </div>

        <chat-container
                :currentUserId="currentUserId"
                :theme="theme"
                v-if="showChat"
        />


    </div>
</template>

<script>
    import {roomsRef, usersRef} from '@/main'
    import ChatContainer from "@/components/common/ChatContainer";

    export default {
        components: {
            ChatContainer
        },

        data() {
            return {
                theme: 'light',
                showChat: true,
                debugChat: true,
                users: [
                    {
                        _id: '0',
                        username: 'Вы',
                        avatar:
                            'https://vignette.wikia.nocookie.net/teamavatarone/images/4/45/Yoda.jpg/revision/latest?cb=20130224160049'
                    },
                    {
                        _id: '1',
                        username: 'Прогресс ТК',
                        avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj'
                    },
                    {
                        _id: '2',
                        username: 'FastTrans TK',
                        avatar: 'https://avatarfiles.alphacoders.com/184/thumb-184913.jpg'
                    }

                ],
                currentUserId: '0',
                updatingData: false
            }
        },

        watch: {
            currentUserId() {
                this.showChat = false
                setTimeout(() => (this.showChat = true), 150)
            }
        },

        methods: {
            resetData() {
                roomsRef.get().then(val => {
                    val.forEach(async val => {
                        const ref = roomsRef.doc(val.id).collection('messages')

                        await ref.get().then(res => {
                            if (res.empty) return
                            res.docs.map(doc => ref.doc(doc.id).delete())
                        })

                        await roomsRef.doc(val.id).delete()
                    })
                })

                usersRef.get().then(val => {
                    val.forEach(val => {
                        usersRef.doc(val.id).delete()
                    })
                })
            },
            async addData() {
                this.updatingData = true

                const user0 = this.users[0]
                await usersRef.doc(user0._id).set(user0)

                const user1 = this.users[1]
                await usersRef.doc(user1._id).set(user1)

                const user2 = this.users[2]
                await usersRef.doc(user2._id).set(user2)

                await roomsRef.add({users: [user0._id, user1._id]})
                await roomsRef.add({users: [user0._id, user2._id]})
                // await roomsRef.add({users: [user2._id, user3._id]})
                // await roomsRef.add({users: [user1._id, user2._id, user3._id]})

                this.updatingData = false
            }
        }
    }
</script>

<style lang="scss">
    body {
        background: #fafafa;
    }

    .chat-container-eva {
        font-family: 'Quicksand', sans-serif;

        @media only screen and (max-width: 768px) {
            padding: 0;
        }
    }

    select {
        height: 20px;
        outline: none;
        border: 1px solid #e0e2e4;
        background: #fff;
    }

    .user-logged {
        font-size: 12px;
        margin-right: 5px;
    }

    .button-theme {
        float: right;

        .button-light {
            background: #fff;
            border: 1px solid #46484e;
            color: #46484e;
        }

        .button-dark {
            background: #1c1d21;
            border: 1px solid #1c1d21;
        }

        button {
            color: #fff;
            outline: none;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 12px;
            margin-left: 10px;
            margin-bottom: 25px;
            border: none;
            font-size: 12px;
            transition: 0.3s;
            vertical-align: top;

            &:hover {
                opacity: 0.8;
            }

            &:active {
                opacity: 0.6;
            }

            @media only screen and (max-width: 768px) {
                padding: 3px 6px;
                font-size: 13px;
            }
        }
    }

    .version-container {
        padding-top: 20px;
        text-align: right;
        font-size: 14px;
        color: grey;
    }
</style>
