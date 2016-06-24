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
            .done(function(bookResponse) {
                getWikiString(bookResponse);
            });
    }

    function getWikiString(bookResponse) {
        var wikiImages = [],
                wikiTitles = [];

        $.each(bookResponse.Similar.Results, function(index, value) {
            // console.log(value.wUrl);
            var wikiString = value.wUrl.substring(value.wUrl.indexOf("wiki/"));
            wikiString = wikiString.substring(5);
            // console.log(wikiString, '<--wikiString');
            wikiApiCall(wikiString);
            console.log(wikiImages);
                console.log(wikiTitles);
                // printToPage(wikiImages, wikiTitles); // wikiImage);p
        });

        function wikiApiCall(wikiString) {
            $.ajax({
                    method: "GET",
                    url: "https://en.wikipedia.org/w/api.php?",
                    dataType: "jsonp", //changed from 'format: jsonp'
                    jsonp: "callback", //declared callback
                    data: {
                        action: "query",
                        titles: wikiString,
                        format: "json", //added to data params
                        prop: "images"
                        // piprop: "original"
                        // //pithumbsize: "100"
                    }
                })
                .done(function(wikiResponse) {
                    var key, wikiID, wikiImage;
                    console.log(wikiResponse, '<-- wikiResponse');
                    wikiID = wikiResponse.query.pages;
                    console.log(wikiID);
                    //wikiID -> Object and we need the first key
                    for(key in wikiID) {
                        wikiImage = wikiID[key].images[0].title;
                        break;
                    }
                    // console.log(wikiID, '<--wikiID');
                    // var wikiImage =  wikiID.images[0];
                    // console.log(wikiImage, '<--wikiImage');
                    wikiImageCall(wikiImage); //, wikiImage);
                });
        }
        function wikiImageCall(wikiImageTitle) {
            $.ajax({
                method: "GET",
                url: "https://en.wikipedia.org/w/api.php?",
                dataType: "jsonp", //changed from 'format: jsonp'
                jsonp: "callback", //declared callback
                data: {
                    action: "query",
                    titles: wikiImageTitle,
                    prop: "imageinfo",
                    iiprop: "url",
                    format: "json" //added to data params
                    // piprop: "original"
                    // //pithumbsize: "100"
                }
            })
            .done(function(wikiResponse) {
                var key, wikiID;
                // console.log(wikiResponse, '<-- wikiResponse');
                wikiID = wikiResponse.query.pages;
                //wikiID -> Object and we need the first key
                console.log('wikiID-------------',wikiID);
                for(key in wikiID) {
                    wikiImages.push(wikiID[key].imageinfo[0].url);
                    wikiTitles.push(wikiID[key].imageinfo.title);
                    // break;
                }

            });
        }

        function printToPage(wikiImages, wikiTitles) {
            $('.thumbnails .row').empty();
            console.log(wikiImages);
            $.each(wikiImages, function(index, value) {
                $('.thumbnails .row').append('<div class="col-xs-6 col-md-3"><a href="' + value.wUrl + '" class="thumbnail"><img src="'+ wikiImages[index] + '" alt="' + wikiTitles[index] + '"></a></div>');
                // append wikiThumbnails into src
                // console.log(value.wUrl, '<--value.wUrl')
            });
        }
    }

});
