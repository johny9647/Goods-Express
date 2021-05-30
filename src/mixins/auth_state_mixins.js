import { AUTH } from "../boot/firebase";
import DB_USER from "../models/DB_USER";

export default
{
    data: () =>
    ({
        user_info: null,
        is_initializing: true,
    }),
    async mounted()
    {
        await AUTH.onAuthStateChanged(async (user) =>
        {
            let queue = [];

            this.is_initializing = true;
            queue.push(this.$_getData('public_settings'));

            if(user)
            {
                queue.push(this.monitorAuthSignedIn(user));
            }
            else
            {
                queue.push(this.monitorAuthSignedOut());
            }

            await Promise.all(queue).then((res) =>
            {
                if(res[0].hasOwnProperty('default_profile_picture'))
                {
                    this.$store.commit('vuex_settings/updateConfig', res[0]);
                    this.is_initializing = false;
                }
                else
                {
                    alert("Invalid Website Config");
                }
            });
        });
    },
    methods:
    {
        async monitorAuthSignedIn(user)
        {
            const _DB_USER = new DB_USER();
            return await this.$bind('user_info', _DB_USER.doc(user.uid));
        },
        async monitorAuthSignedOut()
        {
            this.$store.commit('vuex_user/updateUser', null);
            return "done";
        }
    },
    watch:
    {
        user_info()
        {
            if(this.user_info)
            {
                this.$store.commit('vuex_user/updateUser', this.user_info);
            }
        }
    }
}
