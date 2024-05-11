import express from 'express';
const app = express();

app.use('/api/login',(req,res)=>{
    return res.send("Login Succesfull");
})

app.use('/api/register',(req,res)=>{
    return res.send("register Succesfull");
})


app.use('/',(req,res)=>{
    return res.send("Hello welcome")
})

app.listen(8800,()=>{
    console.log('Backend is running on port 8800');
})
