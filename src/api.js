const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: false }))
router.use(cors());

router.get('/', (req, res) => {
    res.send('Cors Bypass Gateway')
  })

router.post('/request', async (req, res) => {
    const { url , token } = req.body;
    let data = [];
    try{
     data = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    data = await data.json();
    console.log(data);
    res.send({data:data , success:true});
    } catch(e) {
        console.log(e);
        res.send({success:false});
    }
   
    
})
  
app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app)