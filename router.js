var express = require("express");
var router = express.Router();
const nocache = require("nocache");



const credential={
    email:"admin@gmail.com",
    password:"admin123"

}

router.use(nocache());

router.get('/',(req,res)=>{
  if(!req.session.user){
    res.render("base",{titl:"login"})
  }else{
    res.redirect("/dashboard")
  }
})

//login user
router.post('/login',(req,res)=>{
  if(req.body.email!=credential.email){
    res.render('base',{title:'login',alert:"Invalid email"})
  }else if(req.body.password!=credential.password){
    res.render('base',{title:'login',alert:"Invalid password"})
  }else {
    if(req.body.email==credential.email&&req.body.password==credential.password){
         req.session.user=req.body.email;
         res.redirect('/route/dashboard')
  }
    
}
})

//route for dashboard
router.get('/dashboard',(req,res)=>{
  if(req.session.user){
    res.render('dashboard',{user:req.session.user})
  }else{
    res.redirect('/')
  }
})

//route for logout
router.get('/logout',(req,res)=>{
  req.session.destroy(function(err){
    if(err){
      console.log(err)
      res.send("Error")
    }else{
      res.render("base",{title:"login",logout:"Logout successfull.."})
    }
  })
})

module.exports=router;

