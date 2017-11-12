
//variable for all NPM packages
var keys = require('./keys.js');
var request = require("request");
var Twitter = require("twitter");
var spotify = require("node-spotify-api");
var fs = require("fs");

//variable for commaned
var userCommand = process.argv[2]

//variable for input user enters
var userInput= process.argv[3];


// liri commands

//movies

  if (userCommand === "movie-this"){
     movieThis();
   }

  else if (userCommand === "my-tweets"){
    tweetThis();
  }

function movieThis(){
   
  var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {

            // If the request is successful
             if (!error && response.statusCode === 200) {

//              // Parse the body of the site and recover just the imdbRating
//              // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where produced: " + JSON.parse(body).Country);
            console.log("Language of movie: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            } 
  })
};

//twitter

function tweetThis(){




      var client = new Twitter(keys);
       
      var params = {screen_name: 'CodingQT'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          for ( var i= 0; i < 2; i++){
            console.log(tweets[i].text);
          }
         
        }
      });






}

 
	
 
