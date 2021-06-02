<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    watch:
    { 
		current_user_info()
		{
            if(this.current_user_info)
            {
                this.$router.push({ name: 'home' });
            }
            else
            {
                this.$router.push({ name: 'authenticate' });
            }
		},
		$route()
		{
		}
    },
    mounted()
    {
    }
}
</script>