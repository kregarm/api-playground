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
    var nyTimesApiUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+city+"&sort=newest&api-key=0063f4064e0341569fe419ab1a218be4"
    jQuery.getJSON(nyTimesApiUrl, function(data){
        for (var i = 0; i < data.response.docs.length; i++){
            article = data.response.docs[i]
            $("#nytimes").append("<li class='list-group-item'>"+article.snippet+"<br><a class='class btn btn-primary btn-sm' href="+article.web_url+">Read More</a></li>")
        }
    })

});