import axios                    from 'axios';
import { FUNCTIONS }            from "../boot/firebase";
import FAccountClass            from '../classes/FAccountClass';
import {formatNumber}           from '../utilities/NumberUtils';
import moment                   from 'moment';
export default
{
    data: () =>
    ({
        page_config: {},
        current_slot_info: null,
        loading_slot_info: true,
    }),
    computed:
    {
        current_user_info()
        {
            return this.$store.state.vuex_user.user_info;
        },
        app_config()
        {
            return this.$store.state.vuex_settings.config;
        }
    },
    methods:
    {
        $_showProfile(user_info)
        {
            this.$root.$emit('showProfile', {user_info: user_info});
        },
        $_timeUntil(cutoff_date)
        {
            let start           = new Date().getTime() / 1000;
            let end             = cutoff_date.seconds;

            let remaining_time  = end - start;

            if(remaining_time <= 0)
            {
                return `ONGOING COMPUTATION`;
            }
            else
            {
                let seconds = Number(remaining_time);
                var d = String(Math.floor(seconds / (3600*24))).padStart(2, '0');
                var h = String(Math.floor(seconds % (3600*24) / 3600)).padStart(2, '0');
                var m = String(Math.floor(seconds % 3600 / 60)).padStart(2, '0');
                var s = String(Math.floor(seconds % 60)).padStart(2, '0');

                return `${d}:${h}:${m}:${s}`;
            }
        },
        $_formatNumber(number, options)
        {
            const formatted_number = formatNumber(number, options);
            return formatted_number; 
        },
        $_formatDate(date, format)
        {
            return formatDate(date, format);
        },
        //fromDate = date mismo na galing database (timestamp)
        $_timeAgo(fromDate)
        {
            if(!fromDate.hasOwnProperty('seconds'))
            {
                return 'a few seconds ago'
            }
            else
            {
                let from = moment.unix(fromDate.seconds);
                let now = moment();
                if(from < now)
                {
                    return moment(from).fromNow();
                }
            }

        },
        async $_getPageConfig()
        {
            let current_page = this.$route.name;
            this.page_config = {};
            this.app_config.admin.pages.forEach((page) =>
            {
                if(page.route == current_page)
                {
                    this.page_config = page;
                }
            });
        },
        async $_getData(key)
        {
            let data = await axios.get(process.env.JSON_API_URL + `/?target=${key}`);
            return data.data;
        },
        async $_fbCall(method, data = null)
        {
            let call_method = FUNCTIONS.httpsCallable(method);
            return await call_method(data);
        },
        async $_logout()
        {
            this.$router.push({ name: 'front_login' });
            const AccountClass = new FAccountClass();
            AccountClass.signOut();
        },
        async $_accessController(allowed_access)
        {
            if(!this.current_user_info)
            {
                this.$router.push({ name: 'front_login' });
            }

            if(allowed_access == 'admin')
            {
                if(!this.current_user_info.admin)
                {
                    this.$router.push({ name: 'member_dashboard' });
                }
            }
        }
    }
}
