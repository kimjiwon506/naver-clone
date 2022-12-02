$(document).ready(function () {
  var topBanner = $(".close_button");

  topBanner.click(function () {
    $(".top_banner").hide();
  });

  $(".weather_group").not(".active").hide();

  setInterval(nextSlide, 6000);

  function nextSlide() {
    $(".weather_group").hide();
    var allSlide = $(".weather_group");
    var currentIndex = 0;

    $(".weather_group").each(function (index) {
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

  const newsStandSlider = $(".news_stand_slider_wrap").slick({
    fade: true,
    autoplay: true,
    arrows: true,
    prevArrow: '<button class="news_stand arrow_button left_button"></button>',
    nextArrow: '<button class="news_stand arrow_button right_button"></button>',
    autoplaySpeed: 5000,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 50,
  });

  $(".news_stand.left_button").hide();

  newsStandSlider.on("afterChange", function (_event, slick, currentSlide) {
    if (currentSlide === 0) {
      $(".news_stand.left_button").hide();
      $(".news_stand.right_button").show();
    } else if (currentSlide === slick.$slides.length - 1) {
      $(".news_stand.right_button").hide();
    } else {
      $(".news_stand.left_button").show();
      $(".news_stand.right_button").show();
    }
  });

  // 오늘 읽을만한 글 콘텐츠 슬라이더
  var themaCategorySlider = $(".thema_slider_contents_wrap").slick({
    fade: true,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 50,
    asNavFor: ".thema_slider_nav",
  });

  themaCategorySlider.on("afterChange", function (_event, slick, currentSlide) {
    // console.log("currentSlide::", currentSlide, "slick::", slick);
  });

  // 오늘 읽을만한 글 네비게이션 슬라이더
  var themaCategoryNav = $(".thema_slider_nav").slick({
    initialSlide: 0,
    slidesToShow: 8,
    // slidesToScroll: 1,
    asNavFor: ".thema_slider_contents_wrap",
    arrows: true,
    focusOnSelect: true,
    draggable: false,
    infinite: false,
    prevArrow:
      '<button class="thema_category arrow_button left_button"></button>',
    nextArrow:
      '<button class="thema_category arrow_button right_button"></button>',
  });

  $(".thema_category.left_button").hide();

  themaCategoryNav.on("afterChange", function (_event, slick, currentSlide) {
    if (currentSlide === 0) {
      $(".thema_category.left_button").hide();
      $(".thema_category.right_button").show();
    } else if (currentSlide === slick.$slides.length) {
      $(".thema_category.right_button").hide();
    } else {
      $(".thema_category.left_button").show();
      $(".thema_category.right_button").show();
    }
  });
});
