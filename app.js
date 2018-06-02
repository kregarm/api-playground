$("#apiCall").on("click", function() {

    //Check if an image is appended and remove it if it is
    if ($(".jumbotron_img").length > 0){
        $(".jumbotron_img").remove()
    }

    //Check if there are articles loaded and remove them if they are
    if ($("#nytimes").children().length > 0){
        for (var i = 0; i < $("#nytimes").children().length; i++){
            $("#nytimes").children().remove()
        }
    }

    //Check if tere are wiki articles and remove them if they are
    if ($("#wiki").children().length > 0){
        for (var i = 0; i < $("#wiki").children().length; i++){
            $("#wiki").children().remove()
        }
    }

    /*
    Gets values form the two inputs, concats the string into the URL anddress
    for Google streetview and appends the image to the jumbotron
    */
    var street = $("#street").val()
    var city = $("#city").val()
    var googleApiUrl = "http://maps.googleapis.com/maps/api/streetview?size=800x400&location=" + encodeURIComponent(street) + "," + encodeURIComponent(city) + ""
    

    $(".jumbotron").append("<img class='img-fluid jumbotron_img' src="+googleApiUrl+"></img>")

    /*
    NY times api call
    */

    //ADD YOUR OWN NYTIMES API KEY
    var apiKey = "XXXXXXX"

    var nyTimesApiUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+encodeURIComponent(city)+"&sort=newest&api-key="+apiKey
    jQuery.getJSON(nyTimesApiUrl, function(data){
        for (var i = 0; i < data.response.docs.length; i++){
            article = data.response.docs[i]
            $("#nytimes").append("<li class='list-group-item'>"+article.snippet+"<br><a class='class btn btn-primary btn-sm' href="+article.web_url+">Read More</a></li>")
        }
    }).fail(function(){
        $("#nytimes").append("<li class='list-group-item'>Request failed. Please refresh your page.<br></li>")
    });

    /*
    Wikipedia API call
    */

    var wikiTimeout = setTimeout(function(){
        $("#wiki").append("<li class='list-group-item'>Request failed. Please refresh your page.<br></li>")
    }, 3000)

    wikiApiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + encodeURIComponent(city) + "&format=json&callback=wikiCallback"
    jQuery.ajax({
        url: wikiApiUrl,
        dataType: "JSONP",
        success: function(response){
            articles=response[1]

            for(var i = 1; i < articles.length; i++){
                article = articles[i]
                $("#wiki").append("<li class='list-group-item'>"+article+"<br><a class='class btn btn-primary btn-sm' href=http://en.wikipedia.org/wiki/"+encodeURIComponent(article)+">Read More</a></li>")
            }

            clearTimeout(wikiTimeout);
        }
    });
});