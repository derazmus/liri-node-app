
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


  if (userCommand === "movie-this"){
     movieThis();
   }

  else if (userCommand === "my-tweets"){
    tweetThis();
  }

//omdb-movies

function movieThis(){

  // if no movie is entered, will display infor for "Mr. Nobody"

  if (process.argv[3] === undefined) {
        console.log("You did not make a choice so I will choose for you...How about Mr. Nobody")
        userInput = "Mr. Nobody";
        }
   
  var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {

            // If the request is successful
             if (!error && response.statusCode === 200) {

            // console log info requesed from omdb
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

      //var for keys
      var client = new Twitter(keys);

      //var for twitter and "gets" feed, post to console.log 
      var params = {screen_name: 'CodingQT'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          for ( var i= 0; i < 20; i++){
            console.log("++++++++++++++twitter feed++++++++++++++++");
            console.log(tweets[i].text + " (Posted: " + tweets[i].created_at + ")");  
          }
         
        }
      });






}

 
	
 
