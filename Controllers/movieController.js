
const fs = require("node:fs");

let movies = JSON.parse(fs.readFileSync("./movies.json"));

exports.getAllMovies = (req,res)=>{

    res.status(200).json({
        "status":"success",
        "data":{
            "movies":movies,
            "date":req.requestedAt
        }
    });

}

exports.getOneMovie = (req,res)=>{
    //console.log(req.params.num);
    // console.log(req.params.num);
    const ID = req.params.id*1;

    const movie = movies.find((m)=>{return m.id == ID});
    if(!movie){
        return res.status(404).json({
            "status":"Failure",
            "message":"Movie is not available"

        });
    }

    res.status(200).json({
        "status":"Success",
        "data":{
            "movie":movie,
            "date":req.requestedAt
        }

    });

};

exports.addNewMovie = (req,res)=>{

    // console.log(req.body);

    const newId = (movies[movies.length-1].id)+(1);
    
    // console.log(newId);

    let newData = Object.assign({"id":newId},req.body);

    movies.push(newData);

    // movies = JSON.stringify(movies);

    fs.writeFile("./movies.json",JSON.stringify(movies),(err)=>{

    if(err){
        return res.status(404).send("Something Went Wrong");
    }

    res.status(201).json({
        "status":"Success",
        "data": {
            "movies": movies
        }
    });

    });

}

exports.updateMovieById = (req,res)=>{
  
    const ID = req.params.id*1;

    const movie = movies.find((m)=>{return m.id == ID});

    if(!movie){

       return  res.status(404).json({
            "status":"Failure",
            "message":"Movie is not available"

        });

    }

    const index = movies.indexOf(movie);

    let updatedMovie = Object.assign({"id":ID},req.body);

    movies[index] = updatedMovie;

    fs.writeFile("./movies.json",JSON.stringify(movies),(err)=>{

        if(err){
           return res.status(404).send("Something Went Wrong");
        }

        res.status(201).json({
            "status":"Success",
            "data": {
                "movies": updatedMovie
            }
        });
    
        });
    
}

exports.updatePartOfMovieById = (req,res)=>{
  
    const ID = req.params.id*1;

    const movie = movies.find((m)=>{return m.id == ID});

    if(!movie){

        return res.status(404).json({
            "status":"Failure",
            "message":"Movie is not available"

        });

    }

    const index = movies.indexOf(movie);

    let updatedMovie = Object.assign({"id":ID},req.body);

    movies[index] = updatedMovie;

    fs.writeFile("./movies.json",JSON.stringify(movies),(err)=>{

        if(err){
          return res.status(404).send("Something Went Wrong");
        }
    
        res.status(201).json({
            "status":"Success",
            "data": {
                "movies": updatedMovie
            }
        });
    
        });
    
}

exports.deleteMovieById = (req,res)=>{

    const ID = req.params.id*1;

    const movie = movies.find((m)=>{return m.id == ID});

    if(!movie){

       return res.status(404).json({
            "status":"Failure",
            "message":"Movie is not available"

        });

    }

    const index = movies.indexOf(movie);

    movies.splice(index,1);

    fs.writeFile("./movies.json",JSON.stringify(movies),(err)=>{

        if(err){
          return  res.status(404).send("Something Went Wrong");
        }
    
        res.status(201).json({
            "status":"Success",
            "data": {
                "movies": movies
            }
        });
    
        });
}
