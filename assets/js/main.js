$(document).ready(function () {
  // 탑배너
  topBanner = $(".close_button");

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

  // // 뉴스스탠드 슬라이더
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
  const item = $(".tab_list li");
  const arrowButton = $(".thema_category.arrow_button");
  const totalItem = item.length;
  const totalWidth = totalItem * item.outerWidth();

  let currentIndex = 0;

  // 탭 클릭시 컨텐츠와 함께 보여짐
  $(".tab:first-of-type, .tabpanel:first-of-type")
    .addClass("active")
    .attr("tabindex", "0");

  $(".tab:first-of-type").attr("aria-selected", "true");

  $(".tab").on("click", function (e) {
    e.preventDefault();
    $(this).find("a").addClass("active");
    $(this)
      .attr({
        tabindex: "0",
        "aria-selected": "true",
      })
      .siblings()
      .attr({
        tabindex: "-1",
        "aria-selected": "false",
      })
      .find("a")
      .removeClass("active");

    // 연관된 탭 패널 활성화
    $("#" + $(this).attr("aria-controls"))
      .attr("tabindex", "0")
      .addClass("active")
      .siblings(".tabpanel")
      .attr("tabindex", "-1")
      .removeClass("active");

    currentIndex = $(this).index();
  });

  $(".thema_category.prev_button").hide();

  function showArrow() {
    if (currentIndex === 0) {
      $(".thema_category.prev_button").hide();
    } else if (currentIndex + 1 === totalItem) {
      $(".thema_category.next_button").hide();
    } else {
      $(".thema_category.next_button").show();
      $(".thema_category.prev_button").show();
    }
  }

  // 화살표 버튼 클릭시 이동
  function moveTab(index) {
    currentIndex = index;
    item.find("a").removeClass("active").eq(currentIndex).addClass("active");
    item
      .eq(currentIndex)
      .attr({
        tabindex: "0",
        "aria-selected": "true",
      })
      .siblings()
      .attr({
        tabindex: "-1",
        "aria-selected": "false",
      });
    $("#" + item.eq(currentIndex).attr("aria-controls"))
      .attr("tabindex", "0")
      .addClass("active")
      .siblings(".tabpanel")
      .attr("tabindex", "-1")
      .removeClass("active");
    showArrow();
  }

  arrowButton.on("click", function (e) {
    e.preventDefault();
    let nextIndex = (currentIndex + 1) % totalItem;
    let prevIndex = (currentIndex - 1) % totalItem;

    let tabListWidth = $(".tab_list").outerWidth();
    let indexItemWidth = item.eq(currentIndex).position().left;
    let leftItemWidth = $(".tab_list").outerWidth() - item.outerWidth() * 2;

    if ($(this).hasClass("next_button") && indexItemWidth === leftItemWidth) {
      $(".tab_list").css({
        transform: "translateX(" + -(totalWidth - tabListWidth) + "px)",
      });
    }
    if ($(this).hasClass("prev_button") && indexItemWidth === 0) {
      $(".tab_list").css({
        transform: "translateX(0px)",
      });
    }

    if ($(this).hasClass("next_button")) {
      moveTab(nextIndex);
    } else {
      moveTab(prevIndex);
    }
  });

  // 트렌드쇼핑
});
