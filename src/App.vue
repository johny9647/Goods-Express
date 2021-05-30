<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import auth_state_mixins    from './mixins/auth_state_mixins';
import { ANALYTICS }        from "./boot/firebase";
export default {
  name: 'App',
  mounted()
    {
        ANALYTICS.logEvent("page_view");
    },
}
</script>
