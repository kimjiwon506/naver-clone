const topBanner = $(".close_button");
const weatherBanner = $(".weather_group");

$(".close_button").click(function () {
  $(".top_banner").addClass("active");
});

setInterval(function () {
  // topBanner.animate({right : "-800px"}, 400, function(){

  // })
  weatherBanner.animate({ top: "-100px" });
}, 1000);
