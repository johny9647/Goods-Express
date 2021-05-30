import { DB }   from "../boot/firebase";

export default class MODEL
{
    constructor(table)
    {
        this.table = table;
    }
    doc(id)
    {
        return DB.doc(`${this.table}/${id}`);
    }
    collection(options = {})
    {
        let collection = DB.collection(this.table);
        let sort       = "";

        if(options.hasOwnProperty('filter') && options.filter)
        {
            collection  = collection.where('filters', 'array-contains', options.filter.toLowerCase());
        }
        else
        {
            if(options.hasOwnProperty('sortBy') && options.sortBy)
            {
                sort        = options.sortBy;
                collection  = collection.orderBy(options.sortBy, options.descending ? 'desc' : 'asc');
            }
            else if(options.hasOwnProperty('primary_column'))
            {
                sort        = options.primary_column;
                collection  = collection.orderBy(options.primary_column);
            }

            if(options.hasOwnProperty('method') && options.method)
            {
                if(options.method == 'next')
                {
                    collection = collection.startAfter(options.startAfter[sort]);
                    collection = collection.limit(options.rowsPerPage);
                }
                if(options.method == 'previous')
                {
                    collection = collection.endBefore(options.endBefore[sort]);
                    collection = collection.limitToLast (options.rowsPerPage);
                }
            }
            else
            {
                if(options.hasOwnProperty('rowsPerPage'))
                {
                    collection = collection.limit(options.rowsPerPage);
                }
            }
        }


        
        return collection;
    }
    async add(data)
    {
        let res = await DB.collection(this.table).add(data);
        return res.id;
    }
    async get(id)
    {
        let res     = await this.doc(id).get();
        let data    = res.data();

        if (data)
        {
            data.id = res.id;
        }
        
        return data;
    }
    async getMany(options = {})
    {
        let res = await this.collection(options).get();
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
    async update(id, data)
    {
        return await this.doc(id).set(data, { merge: true} )
    }
    async remove(id)
    {
        return await this.doc(id).delete();
    }
}