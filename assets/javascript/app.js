var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userQuery + api_key;
var api_key = "&api_key=4qWHDFpLHp6KSbDG5lbHZ3jleSr5pAha";
var userQuery;
var topics = ["goat", "cat", "monkey"];
var buttonArray = [];
var stillImageURL;
var animateImageURL;
var limitInput = parseInt($("select").val());


renderButtons();

$("#button-addon2").click(function () {
    var newSearchTerm = $("input").val().trim();
    console.log(newSearchTerm);
    clearInput();
    topics.push(newSearchTerm);
    renderButtons();

});

function clearInput() {
    $("input").val("");
}


$(document.body).on("click", ".search-button", function () {
    

    var userQuery = $(this).attr("value");
    console.log(userQuery);
    var api_key = "&api_key=4qWHDFpLHp6KSbDG5lbHZ3jleSr5pAha";
    var queryURL = "https://api.giphy.com/v1/gifs/search?limit=15&rating=g&q=" + userQuery + api_key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        

        //console.log(response);

        for (var i = 0; i < 10; i++) {
            stillImageURL = response.data[i].images.downsized_still.url;
            animateImageURL = response.data[i].images.original.url;
            var rating = (response.data[i].rating).toUpperCase();
            //console.log(stillImageURL);

            var giphyImage = $("<img class='card-img-top giphy-image' style=height:150px;>");
            var cardBody = $("<div class='card-body'>");
            var cardText = $("<p class='card-text'>")
            var giphyImageCard = $("<div class='card'  style=width:200px;display:inline-grid;margin:5px;>");

            $(giphyImage).attr("data-still", stillImageURL);
            $(giphyImage).attr("data-animate", animateImageURL);
            $(giphyImage).attr("data-state", "still");
            $(giphyImage).attr("src", stillImageURL);
            $(cardText).text("Rating: "+ rating);
            $(cardBody).append(cardText);
            $(giphyImageCard).append(giphyImage);
            $(giphyImageCard).append(cardBody);
            $("#giphy_display").prepend(giphyImageCard);
        }

    })
});
//on-click function to stop and start giphy
$(document.body).on("click", ".giphy-image", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});



function renderButtons() {
    $("#queryButtons").empty();
    for (var j = 0; j < topics.length; j++) {
        var myButton = $("<button class='btn btn-secondary search-button'style=margin:2px;>");
        $(myButton).text(topics[j]);
        $(myButton).attr("value", topics[j]);
        $(buttonArray).push(myButton);
        $("#queryButtons").append(myButton);

    }
}

function instructionsToast(){


}





/*1.get user input from form
2. take user input and push to button assign input as value
3. on click event to push user button to the query URL
4. must then append rating and limit  to  queryURL along with the user term and apikey
5. parse response to grab url of giphy (could grab animated and non-animated)
6. create img with giphy sourc and prepend to DOM
7.
*/