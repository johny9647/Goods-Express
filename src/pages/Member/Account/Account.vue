<template>
    <div class="page-name">
        <h6>ACCOUNT</h6>
        <q-btn label="Test Logout" @click="logout"></q-btn>
    </div>
</template>

<script>
export default
{
    filters: { },
    data:() =>(
    {
    }),
    mounted() { },
    methods: {
        logout()
        {
            this.$_logout();
        }
     },
    computed: { }
}
</script>