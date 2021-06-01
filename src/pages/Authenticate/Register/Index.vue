<template>
    <div>
        <div class="container-register">
            <div class="inputWithIcon">
                <input type="text" placeholder="Email">
                <q-icon id="iconq" name="fas fa-at" />
            </div>
            <div class="inputWithIcon">
                <input type="text" placeholder="Password">
                <q-icon id="iconq" name="fas fa-key" />
            </div>
             <div class="inputWithIcon">
                <input type="text" placeholder="Retype Password">
                <q-icon id="iconq" name="fas fa-key" />
            </div>
             <div class="inputWithIcon">
                <input type="text" placeholder="Phone Number">
                <q-icon id="iconq" name="fas fa-phone" />
            </div>
             <div class="inputWithIcon">
                <input type="text" placeholder="Address">
                <q-icon id="iconq" name="fas fa-map-marker" />
            </div>
            <div class="login-button">
                <button > Register </button>
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
    
}
</script>