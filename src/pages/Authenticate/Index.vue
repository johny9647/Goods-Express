<template>
    <div>
        <div class="container">
            <div class="inputWithIcon">
                <input type="text" placeholder="Email">
                <q-icon id="iconq" name="fas fa-at" />
            </div>
            <div class="inputWithIcon">
                <input type="text" placeholder="Password">
                <q-icon id="iconq" name="fas fa-key" />
            </div>
            <div class="login-button">
                <button > LOGIN </button>
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

export default {
    
}
</script>