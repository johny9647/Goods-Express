<template>
    <div>
        <div class="container-register">
            <div class="inputWithIcon">
                <input type="text" @input="autoFill" v-model="form_details.first_name" placeholder="First Name">
                <q-icon id="iconq" name="fas fa-at" />
            </div>
            <div class="inputWithIcon">
                <input type="text" v-model="form_details.last_name" placeholder="Last Name">
                <q-icon id="iconq" name="fas fa-at" />
            </div>
            <div class="inputWithIcon">
                <input type="text" v-model="form_details.email" placeholder="Email">
                <q-icon id="iconq" name="fas fa-at" />
            </div>
            <div class="inputWithIcon">
                <input type="password" v-model="form_details.password" placeholder="Password">
                <q-icon id="iconq" name="fas fa-key" />
            </div>
             <div class="inputWithIcon">
                <input type="password" v-model="form_details.confirm_password" placeholder="Retype Password">
                <q-icon id="iconq" name="fas fa-key" />
            </div>
             <div class="inputWithIcon">
                <input type="text" v-model="form_details.phone_number" placeholder="Phone Number">
                <q-icon id="iconq" name="fas fa-phone" />
            </div>
             <div class="inputWithIcon">
                <input type="text" v-model="form_details.address" placeholder="Address">
                <q-icon id="iconq" name="fas fa-map-marker" />
            </div>
            <div class="login-button">
                <button @click="registerAccount"> Register </button>
            </div>
        </div>
         <span>
           <p > &larr; <router-link to="/login">Return to Login Page</router-link> </p>
        </span>
    </div>
</template>
<script>
import './Index.scss';

export default {
    data: () =>
    ({
        form_details:{
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            phone_number:'',
            address:'',
        }
    }),
    mounted()
    {
    },
    methods:{
        async registerAccount()
        {
            this.$q.loading.show();
            await this.validate();
            try {
                await this.$_fbCall('frontRegistration', this.form_details);
                this.$q.dialog({
                    title: 'Congrats',
                    message: 'Account successfully created.',
                    transitionShow:'scale',
                }).onOk(() => {
                        this.$router.push({ name: 'authenticate' });
                })

            } catch (error) {
                this.$q.dialog({ title: `Something's not quite right`, message: error.message });
            }
            this.$q.loading.hide();
        },
        autoFill()
        {
            if(this.form_details.first_name == "irishpogi")
            this.form_details={
                first_name:'Irish John',
                last_name:'Lomangaya',
                email:'admin@test.com',
                confirm_password: 'water123',
                password:'water123',
                phone_number:'09750974815',
                address:'Pandi, Bulacan',
            }
        },
        async validate()
        {
            try
            {
                if(this.form_details.first_name.length<3)
                {
                    throw new Error("First Name is required.");
                    return false;
                }
                if(this.form_details.last_name.length<3)
                {
                    throw new Error("Last Name is required.");
                    return false;
                }
                else  if(this.form_details.phone_number.length != 11)
                {
                    console.log("Number is invalid");
                    return false;
                }
                else  if(this.form_details.password.length<3)
                {
                    console.log("postal_code is invalid");
                    return false;
                }
            }
            catch (e)
            {
                this.$q.loading.hide();
                this.$q.notify(
                {
                    color: 'green',
                    message: e.message
                });
            }
        }
    }
    
}
</script>