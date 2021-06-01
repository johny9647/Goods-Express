<template>
    <q-layout view="hHh lpR lFf">
      <div class="desktop-only" v-if="$q.platform.is.hasOwnProperty('desktop')">
        <q-header class="main-header bg-primary text-white">
          <div class="sub-nav">
            <div class="sub-nav-grid wrapper">
              <div class="nav home-button">home</div>
              <!-- <div class="shop-button" @click="shop()">shop</div> -->
              <div class="nav about-button" >about</div>
              <div class="nav policy-button" >policy</div>
              <div class="nav contact-button" >contact</div>
              <div></div>
            </div>
        </div>

            <div class="header-grid wrapper">
                <!-- header logo -->
                <div class="header-icon" style="cursor:pointer" > 
                    <q-toolbar-title>
                        <q-avatar>
                        <!-- <img src="../assets/geer.png"> -->
                        </q-avatar>
                    </q-toolbar-title>    
                        <div class="geer">GEER<span> E-COMMERCE</span></div>
                </div>

                <!-- header search -->
				<q-input bg-color="white" placeholder="Enter Search Keyword..." dense outlined class="q-mr-xl full-width">
					<template v-slot:append>
						<q-icon name="search" class="cursor-pointer"/>
					</template>
				</q-input>
                <!-- header icons -->
                <div class="header-button">
                    <div class="heart">
                      <q-btn unelevated color="white" text-color="primary" round icon="favorite" />
                    </div>
                    <div class="notification">
                      <q-btn unelevated color="white" text-color="primary" round icon="notification_important" />
                    </div>
                </div>
            </div>
        </q-header>
  


        <q-footer class="footer">
          <div class="footer-section">
              <div class="footer-grid wrapper">
                <div class="nav-bottom">
                    <div class="geer-title">Geer IT Solutions</div>
                    <div class="geer">About Us</div>
                    <div class="geer">Geer' Policy</div>
                    <div class="geer">Privacy Policy</div>
                    <div class="geer">Contact Us</div>
                </div>
                <div class="customer">
                  <div class="customer-title">Help Center</div>
                  <div class="customer-item">How to Buy</div>
                  <div class="customer-item">Shipping & Delivery</div>
                  <div class="customer-item">How to Return</div>
                  <div class="customer-item">Question?</div>
                </div>
                <div class="payment">
                    <div class="payment-title">Payment</div>

                </div>
                <div class="delivery">
                  <div class="delivery-title">Delivery Method</div>
                </div>
                <div class="follow">
                  <div class="follow-title">Follow Us</div>
                  <div class="follow-flex">
                      <div class="social-item"><q-icon color="secondary"  class="q-mr-sm" name="fab fa-facebook-square" size="lg"></q-icon></div>
                      <div class="social-item"><q-icon color="secondary"  class="q-mr-sm" name="fab fa-linkedin" size="lg"></q-icon></div>
                      <div class="social-item"><q-icon color="secondary"  class="q-mr-sm" name="fab fa-instagram-square" size="lg"></q-icon></div>
                      <div class="social-item"><q-icon color="secondary"  class="q-mr-sm" name="fab fa-twitter-square" size="lg"></q-icon></div>
                      <div class="social-item"><q-icon color="secondary"  class="q-mr-sm" name="fab fa-youtube-square" size="lg"></q-icon></div>
                  </div>
                </div>
              </div>
          </div>
          <q-toolbar class="bg-grey-8 text-white footer-title" >
            <q-toolbar-title style="text-align:center; font-size:14px">
              © Geer IT Solutions. All Rights Reserved
            </q-toolbar-title>
          </q-toolbar>
        </q-footer>
      </div>
      
      <!-- code for mobile responsive header -->
	<div class="mobile-onlyy" v-if="$q.platform.is.hasOwnProperty('mobile')">
		<div class="mobile-header">
        <!-- <div class="header-icon" style="cursor:pointer" > 
        <q-toolbar-title>
        <q-avatar> -->
			<!-- <img src="../assets/geer-white.png" class="image"> -->
			<!-- </q-avatar>
			</q-toolbar-title>    
			</div> -->
            <div class="mobile-search">
                <!-- <q-input bg-color="white" placeholder="Enter Search Keyword..." dense outlined class="q-mr-xl full-width">
                <template v-slot:append>
                    <q-icon name="search"  class="cursor-pointer"/>
                </template>
                </q-input> -->
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
				<!-- <img src="../assets/nav/about-blue.png" alt="" class="nav-icon"> -->
				<div style="color: #0591c8">Notification</div>
			</div>
			<div v-else>
                <q-icon name="far fa-bell" size='25px' class="q-mb-sm"></q-icon>
				<div>Notification</div>
			</div>
		</div>
        <div class="footer-nav" >
			<div  v-if="this.$route.name=='front_contact'">
				<!-- <img src="../assets/nav/contact-blue.png" alt="" class="nav-icon"> -->
				<div style="color: #0591c8">Orders</div>
			</div>
			<div v-else>
                <q-icon name="far fa-list-alt" size='25px' class="q-mb-sm"></q-icon>
				<div>Orders</div>
			</div>
		</div>
		<div class="footer-nav" >
			<div  v-if="this.$route.name=='front_contact'">
				<!-- <img src="../assets/nav/contact-blue.png" alt="" class="nav-icon"> -->
				<div style="color: #0591c8">Message</div>
			</div>
			<div v-else>
                <q-icon name="far fa-envelope" size='25px' class="q-mb-sm"></q-icon>
				<div>Message</div>
			</div>
		</div>
		<div class="footer-nav">
			<div  v-if="this.$route.name=='member_notification'">
				<!-- <img src="../assets/nav/notif-blue.png" alt="" class="nav-icon"> -->
				<div style="color: #0591c8">Account</div>
			</div>
			<div v-else>
				<q-icon style="position: absolute">
				</q-icon>
				<!-- <img src="../assets/nav/notif.png" alt="" class="nav-icon"> -->
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
