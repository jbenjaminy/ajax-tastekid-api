//taste kid key: 229060-APIProj-SGUZVY4W
//endpoint:
//https://www.tastekid.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction



$(function() {

$('form').submit(function(event) {
    event.preventDefault();
    var userInput = $('#tastekid').val();
    bookSearch(userInput);
        //$('#tastekid')[0].reset();
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
            getWikiLink(response);
            printToPage(response);
        });
    }

function getWikiLink(response) {
    $.each(response.Similar.Results, function(index, value) {
    var wikiLink = value.wUrl;
    wikiApiCall(wikiLink);
    }
}

function wikiApiCall(wikiLink) {

}

 function printToPage(response) {
    // $('.thumbnails .row').empty();
    console.log(response.Similar.Results);
    $.each(response.Similar.Results, function(index, value) {
      $('.thumbnails .row').append('<div class="col-xs-6 col-md-3"><a href="' + value.wUrl + '" class="thumbnail"><img src="" alt="' + value.Name + '"></a></div>');
    });
  }

});