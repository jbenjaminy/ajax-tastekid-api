//taste kid key: 229060-APIProj-SGUZVY4W
//endpoint:
//https://www.tastekid.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction

$(function() {

// var wikiLink = ""

$('form').submit(function(event) {
    event.preventDefault();
    var userInput = $('#tastekid').val();
    bookSearch(userInput);
        $('form')[0].reset();
});

    function bookSearch(userInput) {
        $.ajax({
            method: "GET",
            url: "//www.tastekid.com/api/similar?",
            dataType: "jsonp",
            data: {
                q: userInput,
                type: "books",
                k: "229060-APIProj-SGUZVY4W",
                info: 1
            }
        })
        .done(function(response){
            printToPage(response);
            // getWikiLink(response);
        });
    }

// function getWikiLink(response) {
//     $.each(response.Similar.Results, function(index, value) {
//     wikiLink = value.wUrl;
//     wikiApiCall(wikiLink);
//     }
// )}

// function wikiApiCall(response, wikiLink) {
//     var wikiString = wikiLink.substring(29);
//     if (wikiString[0] === "/") {
//         newString = wikiString.substring(1);
//     }
//     else {
//         newString = wikiString;
//     }
//     console.log(newString);

//     // printToPage(response, wikiImage);
// }

 function printToPage(response) {
    $('.thumbnails .row').empty();
    $.each(response.Similar.Results, function(index, value) {
      $('.thumbnails .row').append('<div class="col-xs-6 col-md-3"><a href="' + value.wUrl + '" class="thumbnail"><img src="" alt="' + value.Name + '"></a></div>');
      // append wikiThumbnails into src
    });
  }
});