const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: '123456789',
    host: 'localhost',
    port: 5433,
    database: 'info_of_store',
});

// توصيل العميل
client.connect()
.then(() => console.log('Done'))
.catch(err => console.error('erro connect', err));


const fs = require('fs');

// استعلام 
 client.query('SELECT * FROM stores ')

.then(res => fs.writeFileSync('Info_of_Stores.json', JSON.stringify(res.rows, null, 2)))
.catch(err => console.error('erro query', err))
.finally(() => client.end());