const express = require('express');
const app = express();
const bcrypt = require('bcrypt');



app.use(express.json())

const users = []

app.get('/users', (req,res) => {

    res.json(users);

})

app.post('/users', async (req,res) => {

try{
    const salt = await bcrypt.genSalt();
    const Hashedpassword = await bcrypt.hash(req.body.password , 10);
    const user = { name: req.body.name , password: Hashedpassword }
    users.push(user)
    res.status(201).send()
} catch{
    res.status(500).send()
}



})

app.post('/users/login', async(req,res) =>{
    const user = users.find( user => user.name = req.body.name )
    
    if(user==null)
    {
       return res.status(400).send('No user found');
    }

    try {
 if( await bcrypt.compare( req.body.password , user.password ))
 {
    return res.send('Success');
 }else{
    res.send('Wrong password');
 }
    } catch{
        res.status(500).send()
    }
})


app.listen( process.env.PORT || 3000);