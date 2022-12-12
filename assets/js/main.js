$(document).ready(function () {
  // 탑배너
  topBanner = $(".close_button");

  topBanner.click(function () {
    $(".top_banner").hide();
  });

  var lastScroll = 0;

  // 스크롤
  $(document).scroll(function () {
    let windowY = window.scrollY || window.pageYOffset;
    let headerHeight = $("header").outerHeight();

    let columnRight = $(".column_right");
    let columnLeft = $(".column_left");

    let columnLeftHeight = columnLeft.outerHeight();
    let columnRightHeight = columnRight.outerHeight();

    let columnLeftBottom = columnLeft.offset().top + columnLeftHeight;
    let columnRightBottom = columnRight.offset().top + columnRightHeight;
    let scrollBottom = windowY + $(window).height();
    let scrollTop = windowY;

    function headerScroll() {
      windowY > headerHeight
        ? $("header").addClass("fixed")
        : $("header").removeClass("fixed");
    }

    function contentsScroll() {
      if (scrollTop > lastScroll) {
        scrollBottom - 64 >= columnRightBottom &&
          columnRight.addClass("bottom_fixed");

        scrollBottom - 64 >= columnLeftBottom &&
          columnRight.removeClass("bottom_fixed") &&
          columnRight.addClass("is_stop");
      } else {
        scrollTop <= $(".column_right_inner").position().top &&
          columnRight.addClass("top_fixed");

        scrollTop <= 64 &&
          columnRight.removeClass("bottom_fixed") &&
          columnRight.removeClass("is_stop") &&
          columnRight.removeClass("top_fixed");
      }
    }

    headerScroll();
    contentsScroll();
    lastScroll = scrollTop;
  });

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
      $(".news_stand.left_button , .news_stand.right_button").show();
    }
  });

  // 오늘 읽을만한 글
  const item = $(".tab_list li");
  const arrowButton = $(".thema_category.arrow_button");
  const totalItem = item.length;

  let currentIndex = 0;

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
      $(".thema_category.next_button, .thema_category.prev_button").show();
    }
  }

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
    let nextIndex = currentIndex + 1;
    let prevIndex = currentIndex - 1;

    let totalItemWidth = totalItem * item.outerWidth();
    let tabListWidth = $(".tab_list").outerWidth();
    let activeItemPositionLeft = item.eq(currentIndex).position().left;
    let tabListLeftPosition = tabListWidth - item.outerWidth();

    if (
      $(this).hasClass("next_button") &&
      activeItemPositionLeft === tabListLeftPosition
    ) {
      $(".tab_list").css({
        transform: "translateX(" + -(totalItemWidth - tabListWidth) + "px)",
      });
    }
    if ($(this).hasClass("prev_button") && activeItemPositionLeft === 0) {
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
  let slider = $(".goods_list_wrap");
  let sliderLength = slider.children().length;

  slider.each(function () {
    $(this).slick({
      fade: true,
      speed: 100,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      Infinity: true,
      arrow: true,
      prevArrow: $(".shop_page_control .prev"),
      nextArrow: $(".shop_page_control .next"),
    });

    $(this)
      .siblings(".shop_control, .shop_page_control")
      .find(".num_box .total")
      .html(sliderLength);

    $(this).on("afterChange", function (_event, _slick, currentSlide) {
      $(this)
        .siblings(".shop_control, .shop_page_control")
        .find(".num_box .current")
        .html(currentSlide + 1);
    });
  });

  const ficking1 = new Flicking("#flick1", {
    circular: true,
    horizontal: false,
    stopOnHover: true,
  });

  ficking1.addPlugins(new Flicking.Plugins.AutoPlay({ stopOnHover: true }));
});
