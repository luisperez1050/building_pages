<template>
    <div>
        <h2>Connection</h2>
        <p>{{ message }}</p>
    </div>
</template>

<script>

export default {
    data() {
        return {
            message: '',
        };
    },
    mounted() {
        const connection = new WebSocket('ws://localhost:4000/');
        connection.onmessage = (event) => {
            console.log('message', event)
            this.message = event.data;
        }
    },
}
</script>
