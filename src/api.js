const request = require('request');
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
    try{
    
            const options = {
                    url: url,
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    }
            };
            request(options, (e , r, body)=>{
                res.send({data:JSON.parse(body) , success:true});
            });
  
    } catch(e) {
        console.log(e);
        res.send({success:false});
    }
   
    
})
  
app.use('/.netlify/functions/api',router);
module.exports.handler = serverless(app)