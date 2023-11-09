const express = require("express");
const app = express();
console.log(app.get('env'));

const dotenv = require('dotenv');

dotenv.config({path:'./config.env'}) //for manual configuration for ENV its not working but its Working for ENVI

// console.log(app.get('X'));
// console.log(app.get('Y')); for global variable
const morgan = require("morgan");

const movieRoutes = require("./Routes/movieRoutes.js");

const logger = (req,res,next)=>{

    req.requestedAt = new Date().toISOString();
    next();

}; // custum middleware

if(process.env.NODE_ENVI == 'development'){
    app.use(morgan("combined"));
}

// console.log(process.env);

app.use(logger);

app.use(express.json());

app.use("/app/v4/movies",movieRoutes);

app.use(express.static('./public'));

module.exports = app;

// app.get("/app/v2/movies",getAllMovies);

// app.get("/app/v2/movies/:id",getOneMovie);

// app.post("/app/v2/movies",addNewMovie);

// app.put("/app/v2/movies/:id",updateMovieById);

// app.patch("/app/v2/movies/:id",updatePartOfMovieById);

// app.delete("/app/v2/movies/:id",deleteMovieById);