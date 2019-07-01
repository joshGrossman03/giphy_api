var queryURL = "http://api.giphy.com/v1/gifs/search?q="+userQuery+api_key;
var api_key = "&api_key=4qWHDFpLHp6KSbDG5lbHZ3jleSr5pAha";
var userQuery; 


var topics =["cats","dogs","horses"];
var buttonArray= [];
var stillImageURL;
var animateImageURL;





function makeButton() {
    for (var j = 0; j < topics.length; j++) {
        var myButton = $("<button class='btn btn-secondary search-button'>");
        $(myButton).text(topics[j]);
        $(myButton).attr("value", topics[j]);
        $(buttonArray).push(myButton);
        $("#queryButtons").append(myButton);

    }
}
makeButton();

$(".search-button").on("click",function(){
    
    
    var userQuery= $(this).attr("value");
    var api_key = "&api_key=4qWHDFpLHp6KSbDG5lbHZ3jleSr5pAha";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+userQuery+api_key;
    
    
  

   $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
      
    console.log(response);
   
    for( var i = 0; i < 10 ;i++){
    stillImageURL = response.data[i].images.downsized_still.url;
    animateImageURL = response.data[i].images.original.url;
    console.log(stillImageURL);
    var giphyImage = $("<img>");
    $(giphyImage).attr("class","giphy-image");
    $(giphyImage).attr("data-still",stillImageURL);
    $(giphyImage).attr("data-animate",animateImageURL);
    $(giphyImage).attr("data-state", "still");
    $(giphyImage).attr("src",stillImageURL);
    $("#giphy_display").prepend(giphyImage);
    }
  
  })
});

$(document.body).on("click",".giphy-image", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });










/*1.get user input from form
2. take user input and push to button assign input as value
3. on click event to push user button to the query URL
4. must then append rating and limit  to  queryURL along with the user term and apikey
5. parse response to grab url of giphy (could grab animated and non-animated)
6. create img with giphy sourc and prepend to DOM
7. 
*/