
//variable for all NPM packages
var keys = require('./keys.js');
//var spotkeys = require('./spotify-keys.js');
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
// var random = require('./random.txt');

// //variable for commaned
// var userCommand = process.argv[2]

// //variable for input user enters
 var userInput= process.argv[3];

 // liri commands
function commands(userCommand, userInput) {
  if (userCommand === "movie-this"){
     movieThis();
   }

  else if (userCommand === "my-tweets"){
    tweetThis();
  }

  else if (userCommand === "spotify-this-song"){
    spotifyThis(userInput);
  }

  else if (userCommand === "do-what-it-says"){
    doThis();
  }
};



//omdb-movies
// only works for one word titles, will run multiple word if use -, think what I need to do is use a for loop. 
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
          for ( var i= 0; i < tweets.length; i++){
            console.log("++++++++++++++twitter feed++++++++++++++++");
            console.log(tweets[i].text + " (Posted: " + tweets[i].created_at + ")");  
           }
         
        }
      });
    };


//spotify api function//
//works but seems to give you the first occurence of the song, when you give no song gives you The Sign but not by ace of base. 
function spotifyThis(songSearch) {

  var spotify = new Spotify({
   id:'bb542bc00ed54225a0c3060059579c70',
  secret: '95824cd34f0c46dd87857af5e86a3502',
});
    //var songSearch;

    if (userInput === undefined) {
        songSearch = "The Sign"
    } else {
        songSearch = userInput;
    } 

    spotify.search({  type: 'track', query: songSearch},  function(err,  data)  {    
        if  ( err )  {        
            console.log('Error occurred: '  +  err);        
        } else {
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
    });
};

 //do what it says
 //not currently working, have no idea how to do this one. 
 function doThis() {
  
  fs.readFile("random.txt", "utf8", function(error, data) {
    //console.log(data);

    var dataSplit = data.split(",");

    if (dataSplit === 2){
      commands(dataSplit[0], dataSplit[1]);
      //console.log(dataSplit);
    } 

    else if (dataSplit === 1) {
      commands(dataSplit[0]);

    }

    console.log(dataSplit)

  });

};


commands(process.argv[2], process.argv[3]);








 
	
 
