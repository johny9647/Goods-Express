<template>
    <div>
        <div class="container">
            <div class="inputWithIcon">
                <input v-model="email" type="text" placeholder="Email">
                <q-icon id="iconq" name="fas fa-at" />
            </div>
            <div class="inputWithIcon">
                <input v-model="password" type="password" placeholder="Password">
                <q-icon id="iconq" name="fas fa-key" />
            </div>
            <div class="login-button">
                <!-- <button @click="submitLogin()"> LOGIN </button> -->
                <q-btn :loading="logging_in" @click="submitLogin()" color="primary">LOGIN</q-btn>
            </div>
            <span>
                <p > Forgot your Password? Click <router-link to="/forgot"> Here </router-link> &rarr; </p>
            </span>
        </div>
        <span>
           <p > Create your <router-link to="/register"> Account </router-link> &rarr; </p>
        </span>
    </div>
</template>
<script>
import './Index.scss';

import FAccountClass   from '../../classes/FAccountClass';
export default {
    data: () =>
    ({
        email: '',
        password: '',
        logging_in:false,
    }),
    methods:
    {
        async submitLogin()
        {
            const AccountClass = new FAccountClass();
            this.logging_in = true;
            try
            {
                if(!this.is_submitting)
                {
                    this.is_submitting = true;
                    
                    await AccountClass.signIn(this.email, this.password).then((res) =>
                    {
                        // let login = this.$_fbCall('loginAuditTrail', this.form_data);
                        this.$router.push({ name: 'home' }).catch(()=>{});;
                    }).catch((err) =>
                    {
                        this.$q.dialog({ title: `Invalid Login`, message: err });
                    });

                    this.is_submitting = false;
                }
                this.logging_in = false;
            }
            catch (error)
            {
                this.is_submitting = false;
                this.logging_in = false;
                
                this.$q.dialog(
                {
                    title: 'Ann Error Has Occured',
                    message: error.message
                });
            }
        },
    }
}
</script>