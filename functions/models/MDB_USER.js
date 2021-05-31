const MODEL                         = require("./MODEL");
const { HTTPS_ERROR }               = require('../plugin/firebase');
const FieldValue                    = require("firebase-admin").firestore.FieldValue;

module.exports = class MDB_USER extends MODEL
{
    constructor()
    {
        super('users');
    }
    async getByKeyword(keyword)
    {
        let res = await this.collection().where("keywords", "array-contains", keyword).limit(50).get();
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

    async getAllAdmin()
    {
        let res = await this.collection().where("admin", "==", true).get();
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

    async getAllCashier()
    {
        let res = await this.collection().where("cashier", "==", true).get();
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
    createKeywords(filtername)
    {
        let result = new Set(
        [
            ''
        ]);
        const createKeywords = (name) =>
        {
            const arrName = [];
            let curName = '';
                
            name.split('').forEach((letter) =>
            {
                curName += letter;
                arrName.push(curName);
            });

            return arrName;
        }

        if (filtername)
        {
            let splitted_product_name = filtername.toLowerCase().split(' ');
            let keywords = [];
            keywords.push(splitted_product_name.join(' '));
            for (let i = 0; i < splitted_product_name.length - 1; i++)
            {
                let new_product_name = splitted_product_name.slice();
                let array_to_be_removed = [];    

                for (let new_i = i; new_i >= 0; new_i--)
                {
                    array_to_be_removed.push(new_i);
                }
                    
                new_product_name = new_product_name.filter((value, index) =>
                {
                    return array_to_be_removed.indexOf(index) == -1;
                })

                keywords.push(new_product_name.join(' '));
            }
            keywords.forEach(keyword =>
            {
                let generated_keywords = createKeywords(keyword);

                generated_keywords.forEach(keyword =>
                {
                    if(result.size<1000) result.add(keyword);
                });
            });
        }
        return Array.from(result);
    }
    async getUserBalance()
    {
        let res = await this.collection().where('balance', '>', 0).get();
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
    async memberOnly(uid, required = null)
    {
        let user_info = await this.get(uid);

        if(user_info)
        {
            if(required === 'admin')
            {
                if(!user_info.admin)
                {
                    HTTPS_ERROR('failed-precondition', `You don't have enough access level to proceed.`);
                }
            }

            if(required === 'developer')
            {
                if(!user_info.developer)
                {
                    HTTPS_ERROR('failed-precondition', `You don't have enough access level to proceed.`);
                }
            }

            if(required === 'cashier')
            {
                if(!user_info.cashier)
                {
                    HTTPS_ERROR('failed-precondition', `You don't have enough access level to proceed.`);
                }
            }

            return user_info;
        }
        else
        {
            HTTPS_ERROR('failed-precondition', 'Only Accessible By Members');
        }
    }
    async getByEmail(email)
    {
        let checkMail = await this.collection().where('email', '==', email).get();

        if(checkMail.size === 0)
        {
            return false;
        }
        else
        {
            let res = checkMail.docs[0].data();
            res.id = checkMail.docs[0].id;

            return res;
        }
    }
    async checkEmailExist(email)
    {
        let checkMail = await this.collection().where('email', '==', email).get();

        if(checkMail.size === 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    async getCashRewardDirect(options = {})
    {
        let res = await this.collection(options).where('cash_reward_direct_points', '>', 0).orderBy('cash_reward_direct_points', 'desc').get();
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
    async getCashRewardSlots(options = {})
    {
        let res = await this.collection(options).where('cash_reward_slots_points', '>', 0).orderBy('cash_reward_slots_points', 'desc').get();
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