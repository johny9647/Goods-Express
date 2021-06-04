<template>
    <div>
        <q-pull-to-refresh @refresh="refreshPage()">
        <h6>HOME</h6>
        </q-pull-to-refresh>
    </div>
</template>
<script>
export default {
    mounted()
    {
        console.log(this.current_user_info);
    },
    methods:{
        refreshPage()
        {
           this.$router.go(0)
        },
    }
}
</script>