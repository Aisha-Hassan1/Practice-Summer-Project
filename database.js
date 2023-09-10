const {Client}=require('pg')

const client = new Client({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'simulation',
});

client.connect()

client.query(`select * from store`,(err,res)=>
{
    if(!err)
    {
        console.log(res.rows);
    }
    else 
    {
        console.log(err.message);
    }
        const fs = require('fs')
        const jsonData = JSON.stringify(res.rows)
        fs.writeFile('stores.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log('JSON file has been written successfully.');
        }
    })
    client.end()
})