<template>
    <div>
        <div class="container">
            <div class="inputWithIcon">
                <input type="text" placeholder="Email">
                <q-icon id="iconq" name="fas fa-at" />
            </div>
            <div class="login-button">
                <button > Recover </button>
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