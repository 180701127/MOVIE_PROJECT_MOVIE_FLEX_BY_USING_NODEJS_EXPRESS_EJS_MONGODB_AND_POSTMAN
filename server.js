const { default: mongoose } = require("mongoose");
const app = require("./app.js")
// console.log(process.env);

mongoose.connect(process.env.ATLAS_CONN_STR,{useNewUrlParser:true}).then((conn)=>{  //useNewUrlParser this is for supressing the waring
    console.log("Db connection successful");
}).catch((err)=>{
    console.log(err);
});

const moviesSchema = new mongoose.Schema({name:{type:String,required:[true,"Name cannot be blank"],unique:true},
    description:String,
    relesaeYear:Number,
    duration:{type:Number,required:[true,"Duration can't be empty"]},
    rating:{type:Number,default:1.9}});

const MovieModel = mongoose.model('Movie',moviesSchema);  //it automatically append s at the last of its name

const testmovie = new MovieModel({
    name:"Iron Man",
    description:"Irons",
    relesaeYear:2020,
    duration:220,
});

testmovie.save().then((docs)=>{
    console.log(docs);
}).catch((err)=>{
    console.log(err);
});  //

const port = process.env.PORT||4200; //if process.env.PORT is not defined its goes for 4200

app.listen(port);