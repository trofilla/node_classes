const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const request = require('request-promise');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let getReps = async () => {
    const options = {
        url: 'https://api.github.com/orgs/nodejs',
        headers: {
          'User-Agent': 'nodejs'
        }
      };

    return request(options);
};

let reps = async () => {

    try{
        let a = await getReps()

        console.log(a);
    } catch(err){
        console.log(err)
    }

}

reps();


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

