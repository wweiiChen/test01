(function ($) {
  $.fn.select = function (settings) {
    //預設設定
    var defaultSettings = $.extend({
      size: 5,
      displayClassName: 'defaultShow'
    }, settings);


    //plugin功用
    return this.each(function () {
      //生成假select的DOM
      var target = $(this),
        selectDom = "<div class='fakeSelect'><span class='" + defaultSettings.displayClassName + "'></span><div><ul></ul></div></div>";

      if (target[0].tagName === "SELECT") {
        if (target.next(".fakeSelect").length === 0) {
          target.after(selectDom);
        } else {
          target.next(".fakeSelect").remove();
          target.after(selectDom);
        }
        //target.hide();
      }

      //將原本select的option帶入假select
      var option = {htmlText : [],selected: []},
        i,
        fakeSelect = target.next(".fakeSelect");

      target.find('option').each(function () {
        option.htmlText.push($(this).html());
        // 如果有 option been selected 帶入另一個陣列
        if ( $(this).prop('selected') ) {
          option.selected.push($(this).html());
        };
      });
      for (i = 0; i < option.htmlText.length; i++) {
        fakeSelect.find("ul").append("<li>" + option.htmlText[i] + "</li>");
      }

      // 將被 selected 的 option 帶入假 select 否則 將第一個選項帶入假select預設顯示
      if ( option.selected.length ) {
        fakeSelect.find("." + defaultSettings.displayClassName).html(option.selected[0]);
      } else {
        fakeSelect.find("." + defaultSettings.displayClassName).html(option.htmlText[0]);
      }
     

      //下拉選單寬度高度設定
      fakeSelect.each(function () {
        var showlimit = 0;
        for (i = 0; i < defaultSettings.size; i++) {
          showlimit += $(this).find("li").eq(i).height();
        }
        $(this).find("ul").css({
          "max-height" : showlimit + "px"
        });
        $(this).find("div").hide();
      //寬度設定 <-----根據設計調整
        /*var ulBorderL = parseInt($(this).find("." + defaultSettings.displayClassName).css("border-left-width"), 10),
          ulBorderR = parseInt($(this).find("." + defaultSettings.displayClassName).css("border-right-width"), 10),
          ulWidth = target.width();
        $(this).css({
          "width" : ulWidth
        });
        $(this).find("ul").css({
          "min-width" : ulWidth - ulBorderL - ulBorderR + "px"
        });*/
      //寬度設定 <-----根據設計調整
      });


      //點選改變select值
      fakeSelect.find("ul > li").click(function () {
        var n = $(this).index();
        target.find("option").prop('selected', false);
        target.find("option").eq(n).prop('selected', true).change();
        fakeSelect.find(".defaultShow").html(option.htmlText[n]);
        fakeSelect.find("div").hide();
        $(this).parents(".fakeSelect").removeClass("focus");
      });


      $('body').on('click', function () {
        $(".fakeSelect").find("div").hide();
        $(".fakeSelect").removeClass("focus");
      });
      fakeSelect.find(".defaultShow").click(function (event) {
        event.stopPropagation();
        $(".fakeSelect").removeClass("focus");
        $(this).parent().addClass("focus");
        $(".fakeSelect").find("div").hide();
        $(this).siblings("div").show();
      });
    });
  };
}($));