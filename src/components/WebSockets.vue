<template>
    <div>
        <h2>Connection</h2>
        <p>{{ message }}</p>
        <button @click="send">Send message</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            message: '',
            connection: null,
        };
    },
    mounted() {
        this.connection = new WebSocket('ws://localhost:4000/');
        this.connection.onopen = (event) => {
            console.log('open', event);
        }
        this.connection.onmessage = (event) => {
            console.log('message', event.data)
            this.message = event.data;
        }
    },
    methods: {
        send() {
            console.log(this.connection);
            // this.connection.send('hello from a vue app');
        },
    },
}
</script>
