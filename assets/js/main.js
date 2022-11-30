$(document).ready(function () {
  const topBanner = $(".close_button");

  topBanner.click(function () {
    topBanner.addClass("active");
  });

  $(".weather_group").not(".active").hide();
  setInterval(nextSlide, 3000);

  function nextSlide() {
    $(".weather_group").hide();
    var allSlide = $(".weather_group");
    var currentIndex = 0;
    $(".weather_group").each(function (index, item) {
      if ($(this).hasClass("active")) {
        currentIndex = index;
      }
    });

    var newIndex = 0;

    if (currentIndex >= allSlide.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }

    $(".weather_group").removeClass("active");

    $(".weather_group").eq(newIndex).addClass("active");
    $(".weather_group").eq(newIndex).show();
  }
});
