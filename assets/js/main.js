$(document).ready(function () {
  // 탑배너
  const topBanner = $(".close_button");

  topBanner.click(function () {
    $(".top_banner").hide();
  });

  // gnb메뉴 오른쪽 날씨 롤링 배너
  $(".weather_group").not(".active").hide();

  setInterval(nextSlide, 6000);

  function nextSlide() {
    $(".weather_group").hide();
    let allSlide = $(".weather_group");
    let currentIndex = 0;

    $(".weather_group").each(function (index) {
      if ($(this).hasClass("active")) {
        currentIndex = index;
      }
    });

    let newIndex = 0;

    if (currentIndex >= allSlide.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }

    $(".weather_group").removeClass("active");
    $(".weather_group").eq(newIndex).addClass("active");
    $(".weather_group").eq(newIndex).show();
  }

  // 뉴스스탠드 슬라이더
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

  // 오늘 읽을만한 글
  const themaArrowBtn = $(".thema_category .arrow_button");
  const themaTabItem = $(".thema_category .item");
  const themaTabCount = themaTabItem.length;
  const leftWidth =
    $(".thema_slider_nav").outerWidth() - $(".category_box_wrap").outerWidth();

  let currentIndex = 0;

  $(".thema_category.left_button").hide();

  function moveTab(index) {
    currentIndex = index;
    themaTabItem
      .find("a")
      .removeClass("active")
      .eq(currentIndex)
      .addClass("active");
    showArrow();
  }

  function showArrow() {
    if (currentIndex === 0) {
      $(".thema_category.left_button").hide();
    } else if (currentIndex + 1 === themaTabCount) {
      $(".thema_category.right_button").hide();
    } else {
      $(".thema_category.right_button").show();
      $(".thema_category.left_button").show();
    }
  }

  themaArrowBtn.on("click", function (e) {
    e.preventDefault();

    // tab arrow 버튼 active, slide움직임
    let nextIndex = currentIndex + 1;
    let prevIndex = currentIndex - 1;

    if ($(this).hasClass("left_button")) {
      moveTab(prevIndex);
    } else {
      moveTab(nextIndex);
    }
    if (nextIndex === 8) {
      $(".thema_slider_nav").animate({ marginLeft: -leftWidth }, 300);
    }
    if (prevIndex === 2) {
      $(".thema_slider_nav").animate({ marginLeft: 0 }, 300);
    }

    //tab 버튼에 따라 해당 내용이 보이도록
    $(`.thema_slider_contents_wrap > div`).hide();
    if ($(`.thema_slider_nav li:eq(${currentIndex})`)) {
      $(`.thema_slider_contents_wrap > div:eq(${currentIndex})`).show();
    }
  });

  themaTabItem.on("click", function (e) {
    e.preventDefault();

    $(`.thema_slider_contents_wrap > div`).hide();

    currentIndex = $(this).index();

    $(".thema_slider_nav li")
      .find("a")
      .removeClass("active")
      .eq(currentIndex)
      .addClass("active");

    $(`.thema_slider_contents_wrap > div:eq(${currentIndex})`).show();
    if ($(this).index() === 7) {
      $(".thema_slider_nav").animate({ marginLeft: -leftWidth }, 300);
    }
    if ($(this).index() === 2) {
      $(".thema_slider_nav").animate({ marginLeft: 0 }, 300);
    }

    showArrow();
  });
});
