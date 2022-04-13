const request = require('request');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
process.env.CONTEXT = 'production';
const port = 9000;

app.get('/', (req, res) => {
    res.send('Cors Bypass Gateway')
  })

app.post('/request', async (req, res) => {
    const { url , token } = req.body;
    console.log(url, token);
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
   
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
  
