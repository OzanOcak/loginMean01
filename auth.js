var User=require('./models/User.js')
var bcrypt=require('bcrypt-nodejs')
var jwt=require('jwt-simple')
var express=require('express')
var router=express.Router()

router.post('/register', (req,res)=>{
        var userData=req.body
    
        user =  User(req.body)
    
        user.save((err,result)=>{
            if(err) console.log('database saving error')
            res.sendStatus(200)
        })
        
    }),

  router.post('/login',async(req,res)=>{
        var loginData=req.body
    
        var user= await User.findOne({email:loginData.email})
    
        if (!user)
             return res.status(401).send({message:'user or password invalid'})
    
        bcrypt.compare(loginData.pwd,user.pwd,(err,respond)=>{
            if(!respond)
               return res.status(401).send({message:'user or password invalid'})
    
               var payload= {}
               
               var token= jwt.encode(payload,'123')
          
               res.status(200).send({token})
        })
    })
    
    module.exports=router
