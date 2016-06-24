$(function() {


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
        .done(function(bookResponse){
            getWikiString(bookResponse);

        });
    }

function getWikiString(bookResponse) {
    $.each(bookResponse.Similar.Results, function(index, value) {
        var wikiString = value.wUrl.substring(value.wUrl.indexOf("wiki/"));
        wikiString = wikiString.substring(5);
        console.log(wikiString);

        wikiApiCall(bookResponse, wikiString);
    });

function wikiApiCall(bookResponse, wikiString) {
        $.ajax({
            method: "GET",
            url: "https://en.wikipedia.org/w/api.php?",
            format: "json",
            data: {
                action: "query",
                titles: wikiString
            }
        })
        .done(function(wikiResponse){
            console.log(wikiResponse);

        // printToPage(bookResponse, wikiImage);

        });
    }

 // function printToPage(response) {
 //    $('.thumbnails .row').empty();

 //    $.each(response.Similar.Results, function(index, value) {
 //      $('.thumbnails .row').append('<div class="col-xs-6 col-md-3"><a href="' + value.wUrl + '" class="thumbnail"><img src="" alt="' + value.Name + '"></a></div>');
 //      // append wikiThumbnails into src
 //    });
 //  }
    }
});


