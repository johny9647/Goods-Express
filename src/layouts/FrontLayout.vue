<template>
    <div v-if="done_loading">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data:() =>(
    {
        done_loading:false,
    }),
    watch:
    { 
		current_user_info()
		{
            if(this.current_user_info)
            {
                this.$router.push({ name: 'home' }).catch(()=>{});;
            }
            else
            {
                this.$router.push({ name: 'authenticate' }).catch(()=>{});;
            }
            this.$q.loading.hide();
            this.done_loading =true;
		},
		$route()
		{
		}
    },
    mounted()
    {
        this.$q.loading.show();
        if(this.current_user_info)
        {
            this.$router.push({ name: 'home' }).catch(()=>{});;
        }
        else
        {
            this.$router.push({ name: 'authenticate' }).catch(()=>{});;
        }
        this.done_loading =true;
        this.$q.loading.hide();
    }
}
</script>