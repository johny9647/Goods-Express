import MODEL from './MODEL';

export default class DB_USER extends MODEL
{
    constructor()
    {
        super('users');
    }
    async getTopEarners(limit = 5)
    {
        let res = await this.collection().limit(limit).orderBy('total_earned', 'desc').get();
        let data = [];

        if(!res.empty)
        {
            res.docs.forEach((d, i) =>
            {
                data[i] = d.data();
                data[i].id = d.id;
            })
        }

        return data;
    }
    async getCashRewardTopDirect(options = {})
    {
        let res = await this.collection(options).limit(5).where('cash_reward_direct_points', '>', 0).orderBy('cash_reward_direct_points', 'desc').get();
        let data = [];

        if(!res.empty)
        {
            res.docs.forEach((d, i) =>
            {
                data[i] = d.data();
                data[i].id = d.id;
            })
        }

        return data;
    }
    async getCashRewardTopSlots(options = {})
    {
        let res = await this.collection(options).limit(5).where('cash_reward_slots_points', '>', 0).orderBy('cash_reward_slots_points', 'desc').get();
        let data = [];

        if(!res.empty)
        {
            res.docs.forEach((d, i) =>
            {
                data[i] = d.data();
                data[i].id = d.id;
            })
        }

        return data;
    }
}