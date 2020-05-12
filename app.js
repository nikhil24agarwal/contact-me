const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile( __dirname + "/sigup.html");
})

app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;

    const data={
        members:[
            {
            email_address: email,
            status:"subscribed",
            merge_field:{
                FNAME:firstname,
                LNAME:lastname
            }
            }
        ]
    };
    var jsondata=JSON.stringify(data);
    const url="https://us18.api.mailchimp.com/3.0/lists/{mailchimp_id}"   //replace your id here
    const options={
        method:"post",
        auth:"nick:{API_key}"  //ur api key

    }
    
    
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendfile( __dirname+ "/succcess.html");
        }
        else{
            res.sendfile( __dirname+ "/failure.html");

        }    
        
        
        
        
        
        
        response.on("data",function(data){
                console.log(JSON.parse(data));
                
            })
    })
    request.write(jsondata);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("server is running in 3000");
});


