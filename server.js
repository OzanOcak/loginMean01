var express=require('express')
var cors=require('cors')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var app= express()
var User=require('./models/User.js')
/*var User=require('./models/Post.js')*/
var auth= require('./auth.js')

mongoose.Promise= Promise // deprecation warning

var user,userProfile //closure error

var posts=[
    {message:'hello'},
    {message:'bonjour'}
]

app.use(cors())
app.use(bodyParser.json())

app.get('/posts',(req,res)=>{
    res.send(posts)
})
/*
app.post('/post',(req,res)=>{
 var post=new Post(req.body)

 post.save((err,result)=>{
     if(err){
         console.error('saving post error')
         return res.status(500).send({message:'saving post error'})
     }
     res.status(200)
 })
})*/

app.get('/users',async(req,res)=>{
    try {           
        var users= await User.find({},'-pwd -__v')
        res.send(users)  
    } catch (error) {
        console.error(error)
        res.status(500)
    }

})

app.get('/profile/:id',async(req,res)=>{
    try {
     // console.log(req.params.id)
     var userProfile= await User.findById(req.params.id, '-pwd -__v')
     res.send(userProfile)
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }

})


mongoose.connect('mongodb://test:test@ds117156.mlab.com:17156/pssocial',{useMongoClient:true},(err)=>{
    if(!err) console.log('connected to mongo')
})

app.use('/auth',auth)

app.listen(3000)