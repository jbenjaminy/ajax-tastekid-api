$(function() {

    // EVENT LISTENER FUNCTION
    $('form').submit(function(event) {
        event.preventDefault();
        $('.thumbnails .row').empty();
        var userInput = $('#tastekid').val();
        bookSearch(userInput);
        $('form')[0].reset();
    });

    // TASTEKID API CALL
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
            .done(function(bookResponse) {
                getWikiString(bookResponse);
            });
    }
    // EXTRACTS WIKI PAGE NAME FROM WIKI URL
    function getWikiString(bookResponse) {

        $.each(bookResponse.Similar.Results, function(index, value) {
            var wikiUrl = value.wUrl;
            var wikiString = value.wUrl.substring(value.wUrl.indexOf("wiki/"));
            wikiString = wikiString.substring(5);

            wikiApiCall(wikiString, wikiUrl);
        });

        // FIRST WIKI API CALL
        function wikiApiCall(wikiString, wikiUrl) {
            $.ajax({
                    method: "GET",
                    url: "https://en.wikipedia.org/w/api.php?",
                    dataType: "jsonp",
                    jsonp: "callback",
                    data: {
                        action: "query",
                        titles: wikiString,
                        format: "json",
                        prop: "images"
                    }
                })
                .done(function(wikiResponse) {
                    var key, wikiID, wikiImage, wikiTitle;
                    wikiID = wikiResponse.query.pages;
                    // EXTRACTS WIKI IMAGE FILENAME, FILTERS OUT RESULTS WITH NO IMAGE
                    for(key in wikiID) {
                        if (wikiID[key].images !== undefined) {
                            wikiImage = wikiID[key].images[0].title;
                            wikiTitle = wikiID[key].title
                         wikiImageCall(wikiImage, wikiUrl, wikiTitle);

                         break;
                        }
                    }


                });
        }
        // SECOND WIKI API CALL FOR IMAGE FILENAME
        function wikiImageCall(wikiImage, wikiUrl, wikiTitle) {
            $.ajax({
                method: "GET",
                url: "https://en.wikipedia.org/w/api.php?",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    action: "query",
                    titles: wikiImage,
                    prop: "imageinfo",
                    iiprop: "url",
                    format: "json"
                }
            })
            // EXTRACTS IMAGE URL AND BOOK TITLE
            .done(function(wikiResponse) {
                var key, wikiID, wikiImages;
                wikiID = wikiResponse.query.pages;
                for(key in wikiID) {
                    wikiImages = wikiID[key].imageinfo[0].url;
                    break;
                }
                // FILTERS OUT FILETYPES OTHER THAN JPG/JPEG TO IMPROVE RESULTS QUALITY
                if ((/\.(jpg|jpeg)$/i).test(wikiImages)) {
                printToPage(wikiImages, wikiTitle, wikiUrl);
                }
            });
        }

        // PRINTS RESULTS TO THUMBNAILS
        function printToPage(wikiImages, wikiTitle, wikiUrl) {
                $('.thumbnails .row').append('<div class="col-xs-6 col-md-3"><a href="' + wikiUrl + '" class="thumbnail"><img src="'+ wikiImages + '" alt="' + wikiTitle + '" class="img-rounded" width=200 height=200></a>' + wikiTitle + '</div>' + '<br>');
        }
    }

});
