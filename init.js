const mongoose = require('mongoose');

const Chat = require("./models/chats.js")



main()
.then(()=>{
   console.log("connection Sccessful")
})

.catch((err) => 
    console.log(err)
);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WhatsApp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let allChats = [
    {
    from: "neha",
    to : "kajal",
    msg: "send me exam sheet",
    created_at : new Date(),  // js new function to generate the data
    },
    {
        from: "jay",
        to : "kiran",
        msg: "send me exam sheet",
        created_at : new Date(),  
    },
    {
        from: "prachi",
        to : "hitesh",
        msg: "send me exam sheet",
        created_at : new Date(),  
    },
    {
        from: "sudeep",
        to : "divya",
        msg: "send me exam sheet",
        created_at : new Date(),  
    },
];

 Chat.insertMany(allChats);
    
