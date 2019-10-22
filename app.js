$(document).ready(function () {
    // An array of actions, new actions will be pushed into this array;
    var gifz = ["Cats", "Airplane", "Dogs", "Scares", "Laughs"];
    
    function displayGifButtons() {
        $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < gifz.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", gifz[i]);
            gifButton.text(gifz[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new gif button
    function addNewButton() {
        $("#addGifz").on("click", function () {
            var moreGifz = $("#action-input").val().trim();
            if (moreGifz == "") {
                return false; // added so user cannot add a blank button
            }
            gifz.push(moreGifz);

            displayGifButtons();
            return false;
        });
    }
    // Function to remove last action button
    // Doesnt work properly yet removes all of the added buttons?
    // rather than just the last
    function removeLastButton() {
        $("removeGif").on("click", function () {
            gifz.pop(gifz);
            displayGifButtons();
            return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs() {
        var disGifz = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + disGifz + "&api_key=5klygNU7fJFxVAFL59rYwGP9RYZGPfYb&limit=10";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                console.log(response); // console test to make sure something returns
                $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
                var results = response.data; //shows results of gifs
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>"); //div for the gifs to go inside
                    gifDiv.addClass("gifDiv");
                    // pulling rating of gif
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    // pulling gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small.url); // still image stored into src of image
                  
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
                    gifImage.attr("data-state", "animate"); // set the image state
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    // var downloadButton = $(`<a href="${results[i].images.downsized.url}" download="${results[i].id}">`)
                    // downloadButton.text("DOWNLOAD");
                    // gifDiv.append(downloadButton);
                    // pulling still image of gif
                    // adding div of gifs to gifsView div
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of actions already created
    addNewButton();
    removeLastButton();
    // Document On Click Events
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});
