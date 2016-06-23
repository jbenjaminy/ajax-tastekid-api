

$(function() {

$('form').submit(function(event) {
    event.preventDefault();
    var propertySearch = $('#zillow').val();
    zillowSearch(propertySearch);
        $('#zillow')[0].reset();

});

    function zillowSearch(propertySearch) {
        $.ajax({
            method: "GET",
            url: "http://api.recloud.me/1.0/sf/Property.search",
            dataType: "json",
            data:

        });
    }



});