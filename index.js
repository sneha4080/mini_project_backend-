const express = require("express")
const app = express();
const path = require("path")
const mongoose = require('mongoose');
const exp = require("constants");
const Chat = require("./models/chats.js"); //no need of defining twice
const methodOverride = require("method-override"); //packge je insatll karyu aene require karrvu pade
const ExpressError =  require("./ExpressError.js");

// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false); // or true, depending on your preference


app.set('views', path.join(__dirname, 'views')); // Ensure this points to 'views' directory
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
// server the css file like css & js public folder 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
main()
    .then(() => {
        console.log("connection Sccessful")
    })

    .catch((err) =>
        console.log(err)
    );

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/WhatsApp');
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsApp');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}




// INDEX ROUTE
app.get("/chats/", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
}) //clint ne data mokalva use the ejs templeate


//New Route
app.get("/chats/new", (req, res) => {
    throw new ExpressError(404,"page not found");
    res.render("new.ejs")
})

// CREATE route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body; //form thi data leva 
    // post mate directly not access the data so write app.use(express.urlencoded({extends:true}));
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat.save().then((res, req) => { //when u use then if not need to use await async 
        console.log("chats was saved")
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
})


// New - Show Route
app.get("/chats/:id",async(req,res,next)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
        next( new ExpressError(404,"chats not found"));
    }
    res.render("edit.ejs",{chat});

});

//EDIT Route

app.get("/chats/:id/edit",async(req,res)=>{  //async callbacck aapvu pade await kari to 
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

// UPdate route
app.post("/chats/:id",(req,res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = Chat.findByIdAndUpdate(
        id , {msg: newMsg},
        {runValidators:true, new:true}
        );
    console.log(updatedChat);
    res.redirect("/chats");
});

//delete chats route
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
   let deletedChat = await Chat.findByIdAndDelete(id);
   console.log(deletedChat);
   res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.send("root is working");
})

// Error Handling Middleware
app.use((err,req,res,next)=>{
    let {status = 500, message = "some error occure"}= err;
    res.status(status).send(message);
});

app.listen(8090, () => {
    console.log("server start now")
})

