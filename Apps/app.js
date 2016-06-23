//taste kid key: 229060-APIProj-SGUZVY4W
//endpoint:
//https://www.tastekid.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction



$(function() {

$('form').submit(function(event) {
    event.preventDefault();
    var userInput = $('#tastekid').val();
    bookSearch(userInput);
        //$('#tastekid')[0].reset();
        console.log(userInput, '<-- userInput');
});

    function bookSearch(userInput) {
        console.log(userInput);
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
            console.log(response);
        });
    }



});