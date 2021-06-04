<template>
  <div id="q-app">
    <router-view v-if="!is_initializing" />
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #F6F7FB; z-index: 999999" class="intializer-loading flex flex-center" v-if="delayed_initializer">
        <!-- <q-spinner-ball  color="primary" size="60px"/> -->
        <div>
        <q-spinner-bars
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerBars</q-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import auth_state_mixins    from './mixins/auth_state_mixins';
import { colors }           from 'quasar';
import { ANALYTICS }        from "./boot/firebase";

export default
{
    name: 'App',
    data: () =>
    ({
        delayed_initializer: true,
    }),
    mounted()
    {
        ANALYTICS.logEvent("page_view");
    },
    mixins: [auth_state_mixins],
    watch:
    {
        is_initializing()
        {
            if(this.is_initializing == false)
            {
                setTimeout(() => {
                    this.delayed_initializer = false;
                    
                    // colors.setBrand('primary', this.app_config.color.primary);
                    // colors.setBrand('text-color', this.app_config.color.text_color);
                    // colors.setBrand('accent', this.app_config.color.admin_primary);
                }, 500)
            }
            else
            {
                this.delayed_initializer = this.is_initializing;
            }
        }
    }
}
</script>