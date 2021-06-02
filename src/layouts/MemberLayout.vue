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
		<div class="footer-nav" >
			<div  v-if="this.$route.name=='front_home'">
                <q-icon name="far fa-compass" size='25px' class="q-mb-sm"></q-icon>
				<div>Home</div>
			</div>
			<div v-else>
                <q-icon name="far fa-compass" size='25px' class="q-mb-sm"></q-icon>
				<div>Home</div>
			</div>
		</div>
		<div class="footer-nav" >
			<div  v-if="this.$route.name=='front_about'">
				<div style="color: #0591c8">Notification</div>
			</div>
			<div v-else>
                <q-icon name="far fa-bell" size='25px' class="q-mb-sm"></q-icon>
				<div>Notification</div>
			</div>
		</div>
        <div class="footer-nav" >
			<div  v-if="this.$route.name=='front_contact'">
				<div style="color: #0591c8">Orders</div>
			</div>
			<div v-else>
                <q-icon name="far fa-list-alt" size='25px' class="q-mb-sm"></q-icon>
				<div>Orders</div>
			</div>
		</div>
		<div class="footer-nav" >
			<div  v-if="this.$route.name=='front_contact'">
				<div style="color: #0591c8">Message</div>
			</div>
			<div v-else>
                <q-icon name="far fa-envelope" size='25px' class="q-mb-sm"></q-icon>
				<div>Message</div>
			</div>
		</div>
		<div class="footer-nav">
			<div  v-if="this.$route.name=='member_notification'">
				<div style="color: #0591c8">Account</div>
			</div>
			<div v-else>
				<q-icon style="position: absolute">
				</q-icon>
                <q-icon name="far fa-user-circle" size='25px' class="q-mb-sm"></q-icon>
				<div>Account</div>
			</div>
		</div>
	</div>
	</div>
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
    }),
	  components: {},
	  async mounted()
      { 
      },
    watch:
    { 
		current_user_info()
		{
			console.log('member');
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
    },
}
</script>
