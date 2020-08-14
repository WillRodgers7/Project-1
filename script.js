//this function sends the query by city chosen by user
// function queryURL(userCity) {
//   // userCity parameter holds the Zomato City ID
//   // we will use this in the query builder string 'queryU'
//   var apiKey = "2f0db10ea057aa7670716496e756f590";
//   var queryU =
//     "https://developers.zomato.com/api/v2.1/search?entity_id=281&entity_type=city&count=3&establishment_type=283";

//   console.log("right before ajax call");
//   $.ajax({
//     headers: {
//       Accept: "text/plain; charset=utf-8",
//       "Content-Type": "text/plain; charset=utf-8",
//       "user-key": "2f0db10ea057aa7670716496e756f590",
//     },
//     method: "GET",
//     url: queryU,
//     success: function (response) {
//       console.log(response);
//     },
//   });
// }

// gets and returns the Zomato City(entity) ID by city name
// begin recursive ajax calls
function getCityId(cityName) {
  var apiKey = "2f0db10ea057aa7670716496e756f590";
  // limits to one possible result
  var queryU =
    "https://developers.zomato.com/api/v2.1/cities?q=" + cityName + "&count=1";
  $.ajax({
    headers: {
      Accept: "text/plain; charset=utf-8",
      "Content-Type": "text/plain; charset=utf-8",
      "user-key": "2f0db10ea057aa7670716496e756f590",
    },
    method: "GET",
    url: queryU,
    success: function (response) {
      console.log(response);
      // this console.log can display the city ID
      console.log(
        "This should give me the city ID ===> " +
          response.location_suggestions[0].id
      );
      var cityID = response.location_suggestions[0].id;

      // another ajax call!
      // now use a search GET query after getting the zomato city ID
      // reassigning the query string var
      // will need to modify this depending on user need and other parameters
      queryU =
        "https://developers.zomato.com/api/v2.1/search?entity_id=" +
        cityID +
        "&entity_type=city&count=3&establishment_type=283";

      console.log("right before nested ajax call");
      $.ajax({
        headers: {
          Accept: "text/plain; charset=utf-8",
          "Content-Type": "text/plain; charset=utf-8",
          "user-key": "2f0db10ea057aa7670716496e756f590",
        },
        method: "GET",
        url: queryU,
        success: function (response) {
          console.log("nested response object...");
          console.log(response);
        },
      });

      // return cityID;
    },
  });
}

// prelim submit function
$("#userForm").on("submit", function (event) {
  event.preventDefault();
  console.log("submitted");
  var city = $("#textarea1").val().trim();
  console.log(city);
  if (city == "") {
    return;
  } else {
    console.log("we are in the else");
    // get Zomato City Id, and then use that in the query function
    console.log("getting city ID...");
    // this console.log will be undefined because asynchronous behaviour
    // the function will still run though...
    console.log(getCityId(city));
    console.log("i should print before responses...!");
    // passing an ID to another function...aysynchonicity will cause problems
    // ajax call to get the zomato city ID, then run another ajax call to get the pubs in the city
    // because of multiple ajax calls that are dependent on the API responses
    // queryURL(getCityId(city));
  }
});





// Side bar nav start
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
//Side bar nav end