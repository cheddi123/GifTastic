
var animalArray = ["dog", "cat"];
var buttonCreated;
var isSubmitted = false;
var isStillImage=true;
var isClicked=false;

function initializer(){
    $("#animalName").empty();

for (var i = 0; i < animalArray.length; i++) {
    buttonCreated = $("<button>");
    buttonCreated.addClass("btn btn-info m-2 animal");
    buttonCreated.text(animalArray[i]);
    buttonCreated.attr("data_animal", animalArray[i]);

    $("#animalName").append(buttonCreated);
}

}

initializer();


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


$(document).on("click","#animalName .animal", function(){
    
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
      .then(function(response){
          console.log(response);
          console.log(queryURL)
          var imageArray=[];
          var ratings = response.data;

          // empty the old display before loading the new images when clicked
          $("#images").empty(); 
          for(var j=0;j<ratings.length;j++){
              var animalDiv = $("<div class='animal m-2'>");
              animalDiv.css({"display":"inline-block","text-align":"center"})
               console.log(ratings.length)
               console.log("yes")
              // variable to hold the images
          var stillImage = $("<img>").attr("src", ratings[j].images.fixed_height_still.url);
          var animateImage = $("<img>").attr("src", ratings[j].images.fixed_height.url);
          var textRating = $("<h3>").text( "Rating:  " + ratings[j].rating);
           animalDiv.append(textRating,stillImage);
            imageArray.push(animalDiv);
            $("#images").append(imageArray);
           console.log(imageArray.length)
          }
          
               
          if(isStillImage){


          }
          
        

      })
      

    console.log($(this).text())
    console.log(animalArray.length)
    console.log("clicked")


})