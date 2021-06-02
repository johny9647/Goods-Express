<template>
    <q-layout view="hHh lpR lFf">
      <div class="desktop-only" v-if="$q.platform.is.hasOwnProperty('desktop')">
        desktop
      </div>
      
      <!-- code for mobile responsive header -->
	<div class="mobile-onlyy" v-if="$q.platform.is.hasOwnProperty('mobile')">
		<div class="mobile-header">
            <div class="mobile-search">
                </q-input>
                <div style="color:white;font-size:25px">Good Express</div>
            </div>
        </div>

	<!-- code for mobile footer -->
	<div class="mobile-footer">
		<div @click="routeToHome()" class="footer-nav" >
			<div v-if="this.$route.name=='home'">
                <q-icon color="secondary" name="far fa-compass" size='25px' class="q-mb-sm"></q-icon>
				<div class="text-secondary">Home</div>
			</div>
			<div v-else>
                <q-icon name="far fa-compass" size='25px' class="q-mb-sm"></q-icon>
				<div>Home</div>
			</div>
		</div>
		<div @click="routeToNotification()" class="footer-nav" >
			<div v-if="this.$route.name=='notification'">
				<q-icon color="secondary" name="far fa-bell" size='25px' class="q-mb-sm"></q-icon>
				<div class="text-secondary">Notification</div>
			</div>
			<div v-else>
                <q-icon name="far fa-bell" size='25px' class="q-mb-sm"></q-icon>
				<div>Notification</div>
			</div>
		</div>
        <div @click="routeToOrders()" class="footer-nav" >
			<div  v-if="this.$route.name=='orders'">
				<q-icon color="secondary" name="far fa-list-alt" size='25px' class="q-mb-sm"></q-icon>
				<div class="text-secondary">Orders</div>
			</div>
			<div v-else>
                <q-icon name="far fa-list-alt" size='25px' class="q-mb-sm"></q-icon>
				<div>Orders</div>
			</div>
		</div>
		<div @click="routeToMessage()" class="footer-nav" >
			<div  v-if="this.$route.name=='message'">
				<q-icon color="secondary" name="far fa-envelope" size='25px' class="q-mb-sm"></q-icon>
				<div class="text-secondary">Message</div>
			</div>
			<div v-else>
                <q-icon name="far fa-envelope" size='25px' class="q-mb-sm"></q-icon>
				<div>Message</div>
			</div>
		</div>
		<div @click="routeToAccount()" class="footer-nav">
			<div v-if="this.$route.name=='account'">
                <q-icon color="secondary" name="far fa-user-circle" size='25px' class="q-mb-sm"></q-icon>
				<div class="text-secondary">Account</div>
			</div>
			<div v-else>
                <q-icon name="far fa-user-circle" size='25px' class="q-mb-sm"></q-icon>
				<div>Account</div>
			</div>
		</div>
	</div>
	</div>
	<!-- <template v-if="is_accessible"> -->
    	<router-view></router-view>
	<!-- </template> -->
  	</q-layout>
</template>

<script>

import './MemberLayout.scss';
import './MemberLayoutMobile.scss';

export default
{
    name: 'FrontLayout',
    data: () =>
    ({
		is_accessible:false,
    }),
	  components: {},
	async mounted()
      { 
      },
    watch:
    { 
		current_user_info()
		{
			if(this.current_user_info)
			{
				this.is_accessible = true;
			}
			else
			{
				this.is_accessible = false;
				this.$router.push({ name: 'login' });
			}
		},
		$route()
		{
		}
    },
    computed:
    {
    },
    methods:
    {
		routeToHome()
		{
			if(this.$route.name != 'home')
			{
				this.$router.push({ name: 'home' });
			}
		},
		routeToNotification()
		{
			if(this.$route.name != 'notification')
			{
				this.$router.push({ name: 'notification' });
			}
		},
		routeToOrders()
		{
			if(this.$route.name != 'orders')
			{
				this.$router.push({ name: 'orders' });
			}
		},
		routeToMessage()
		{
			if(this.$route.name != 'message')
			{
				this.$router.push({ name: 'message' });
			}
		},
		routeToAccount()
		{
			if(this.$route.name != 'account')
			{
				this.$router.push({ name: 'account' });
			}
		},
    },
}
</script>
