
var animalArray = ["dog", "cat", "rat", "parrot"];
var buttonCreated;
var isSubmitted = false;
var isStillImage = true;

function initializer() {
    $("#animalName").empty(); // empty out the old images before the new images are displayed
    // for loop to dynamically display the array and add properties to elements of the array
    for (var i = 0; i < animalArray.length; i++) {
        buttonCreated = $("<button>"); // create button tag
        buttonCreated.addClass("btn btn-info m-2 animal");
        buttonCreated.text(animalArray[i]);
        buttonCreated.attr("data_animal", animalArray[i]);

        $("#animalName").append(buttonCreated);
    }

}

initializer(); // function call to start loadig the html page


// submit button to append the input name to the array
$("#submit").on("click", function (event) {
    event.preventDefault();
    var typedName = $("#animalSearch").val().trim();
    console.log(typedName);


    if (typedName !== "") {
        isSubmitted = false;
        animalArray.push(typedName);
        initializer();
        console.log(animalArray);
        $("#animalSearch").val("");
    } else { isSubmitted; }
})


$(document).on("click", "#animalName .animal", function () {

    var animal = $(this).attr("data_animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(response);
            console.log(queryURL)
            var ratings = response.data;

            // empty the old display before loading the new images when clicked
            $("#images").empty();
            for (var j = 0; j < ratings.length; j++) {
                var gifDiv = $("<span>")
                gifDiv.css({ "display": "inline-block", "text-align": "center" })
                var animalImage = $("<img>");
                animalImage.addClass("animal ");

                console.log(ratings.length)
                console.log("yes")
                // variable to hold the images

                var x = ratings[j].images.fixed_height_still.url;
                var y = ratings[j].images.fixed_height.url;
                animalImage.attr("data-state", "still");
                animalImage.attr("src", x); // upload image state at the beginning
                animalImage.attr("data-still", x); //still gif
                animalImage.attr("data-animate", y); //animate gif


                var textRating = $("<h3>").text("Rating:  " + ratings[j].rating);
                gifDiv.append(textRating, animalImage)
                $("#images").append(gifDiv); // images are displayed when named button is clicked

            }

        })

})

//onclick event on the images
$(document).on("click", "#images .animal", function () {
    var state = $(this).attr("data-state"); // variable to reference the data-state "still"
    console.log(state)
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log($(this).attr("data-animate"))
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    // console.log("you clicked an image")
});

