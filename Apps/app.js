// http://api.eventful.com/rest/events/search?...&where=32.746682,-117.162741&within=25
// // eventful key: NPmvmGSRSN5FwHF5

$(function() {

$('form').submit(function(event) {
    event.preventDefault();
    var eventSearch = $('#song-kick').val();
    songKickSearch(eventSearch);
        // $('#song-kick')[0].reset();
        console.log(eventSearch, '<-- eventSearch');

});

    function songKickSearch(eventSearch) {
        console.log(eventSearch);
        $.ajax({
            method: "GET http://eventful.com/oauth/authorize?oauth_token=NPmvmGSRSN5FwHF5",
            url: "//api.eventful.com/json/events/search?q=music&location=" + eventSearch + "&date=Future&within=25",
            dataType: "json",
        })
        .done(function(response){
            console.log(response);
        });
    }



});