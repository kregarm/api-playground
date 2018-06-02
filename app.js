window.onload = function() {
    $("#streetViewApiCall").on("click", function() {
        var street = $("#street").val()
        var city = $("#city").val()
        var apiCall = "http://maps.googleapis.com/maps/api/streetview?size=800x400&location=" + street + "," + city
    
        $(".jumbotron").append("<img class='img-fluid jumbotron_img' src="+apiCall+"></img>")
    });
  }