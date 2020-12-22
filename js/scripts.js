// 햄거버 메뉴
var giMenuDuration = 700;

function ShowMenu() {
  $(".menu_bg").css({
    display: "block"
  });
  $(".menu").css({
    left: "-100%"
  });
  $(".menu").animate({
    left: "0px"
  }, {
    duration: giMenuDuration
  });
}

function HideMenu() {
  $(".menu").animate({
    left: "-100%"
  }, {
    duration: giMenuDuration,
    complete: function () {
      $(".menu_bg").css({
        display: "none"
      });
    },
  });
}

function ShowSubMenu(num) {
  var lySubMenu = $(`#sub${num}`);

  if (lySubMenu.first().is(":hidden")) {
    $(`#sub${num}`).slideDown(300);
    $(`.show-icon${num}`).attr("src", "./images/close_menu.png");
  } else {
    $(`#sub${num}`).slideUp(300);
    $(`.show-icon${num}`).attr("src", "./images/open_menu.png");
  }
}

function openModal(num) {
  $(".modal-background" + num).fadeIn();

  $(".close").click(function () {
    $(".modal-background" + num).fadeOut();
  });
}

$(document).ready(function () {
  $(".menu_2").hide();

  // 모달 텍스트 변경
  var mindInnerText = [
    '"물론 가끔 자해 생각이 나기도 했지만, 스트레스를 다른 방법으로 풀었어요... 운동을 하면서 살을 빼고, 그렇게 자기 관리를 하면서 스트레스를 운동으로 풀게 되는 거예요...”',
    '"만약에 제가 욕심이 없었다면 그 (자해를 하던) 모습을 계속 유지했을 거 같아요. 살아야겠다는.. 물론 매일 죽고 싶다는 생각을 하기는 했지만 한편에는 살고자 하는 마음이 더 있었던 거죠. 그러다보니깐 그걸 극복하려던 마음으로 살고자 하는 욕심이 있었어요"',
    '"저 같은 경우에는 이야기를 하고 싶었거든요. 제 이야기를 누가 들어주니깐 엄청 도움이 되었어요. 주변에 이렇게 깊은 이야기를 친구나 선생님한테 할 수 없으니깐 상담이 도움이 많이 되었어요"',
  ];
  var i = 0;
  $(".mind-modal-desc").text(mindInnerText[i]);
  $(".modal-next").click(function () {
    i++;
    $(".mind-modal-desc").text(mindInnerText[i]);
    if (i === mindInnerText.length - 1) {
      $(".modal-next").text("닫기");
      $(".modal-next").addClass("close");
    } else if (i === mindInnerText.length) {
      $(".modal-background").fadeOut();
    }
  });

  // footer menu 페이지에 따른 아이콘 변경
  var id_by_body = $("body").attr("id");
  if (
    id_by_body === "home" ||
    id_by_body === "mood" ||
    id_by_body === "junior"
  ) {
    $(".home-icon").attr("src", "./images/footer_icon_1_white.png");
    $(".modify-icon").attr("src", "./images/footer_icon_2_blue.png");
    $(".graph-icon").attr("src", "./images/footer_icon_3_blue.png");
    $(".call-icon").attr("src", "./images/footer_icon_4_blue.png");
  }

  $("textarea").focus(function () {
    $(".write-container").css("display", "none");
  });
});

// input type이 number일 때 입력 글자 수 제한하기 

function maxLengthCheck(e) {
  if (e.value.length > e.maxLength) {
    e.value = e.value.slice(0, e.maxLength);
  }
}

// 연도가 1920년 이전 날짜가 입력되지 않도록 제한하기 

function yearValidation(year) {

  var current_year = new Date().getFullYear();
  if ((year < 1920) || (year > current_year)) {
    $("#year").val(""); // 빈값으로 처리하기 
    $("#year").focus(); // 빈공간(연도)에 다시 포커스 시키기 

  } else {

  }
}

// 월은 1월 부터 12월 까지만 입력 되도록 처리

function monthValidation(month) {
  if ((month < 1) || (month > 12)) {
    $("#month").val("");
    $("#month").focus();

  } else {}
}

// 일은 1일 부터 31일 까지만 입력 되도록 처리 

function dayValidation(day) {
  if ((day < 1) || (day > 31)) {
    $("#day").val("");
    $("#day").focus();
  } else {}
}

// 가져온 현재날짜와 입력날짜 차이를 구하기 

function printDiff() {
  var today = new Date();

  // 현재 달이 입력된 달보다 값이 클 때  
  if ((today.getMonth() + 1) > document.getElementById("month").value) {
    var year = (today.getFullYear() - document.getElementById("year").value);
    var month = ((today.getMonth() + 1) - document.getElementById("month").value);

    // 현재 달이 입력된 달보다 값이 작을 때  
  } else {
    var year = ((today.getFullYear() - document.getElementById("year").value) - 1);
    var month = ((today.getMonth() + 13) - document.getElementById("month").value);
  }

  // 계산된 연도 값이 들어가도록 하기
  console.log(year);
  $("#result-year").text(year);

  console.log(month);
  $("#result-month").text(month);

}

// 파일 업로드 

function uploadImgPreview() {
  // @breif 업로드 파일 읽기

  let fileInfo = document.getElementById("upImgFile").files[0];

  let reader = new FileReader();

  reader.onload = function () {

    document.getElementById(
      "drawCanvas"
    ).style.backgroundImage = `url(${reader.result})`;
  };

  if (fileInfo) {

    reader.readAsDataURL(fileInfo);
  }


  $(document).ready(function () {

    var drawCanvas = document.getElementById("drawCanvas");

    if (typeof drawCanvas.getContext == "function") {

      var colors = [{
        style: "#ff0000",
      }, ];

      var ctx = drawCanvas.getContext("2d");
      var width = 10;
      var color = colors.style;
      var pDraw = $("#drawCanvas").offset();
      var currP = null;

      $("#drawCanvas").bind("touchstart", function (e) {
        e.preventDefault();
        ctx.beginPath();
      });

      $("#drawCanvas").bind("touchmove", function (e) {
        var event = e.originalEvent;
        e.preventDefault();
        currP = {
          X: event.touches[0].pageX - pDraw.left,
          Y: event.touches[0].pageY - pDraw.top,
        };
        draw_line(currP);
      });

      $("#drawCanvas").bind("touchend", function (e) {
        e.preventDefault();
      });

      function draw_line(p) {
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineTo(p.X, p.Y);
        ctx.moveTo(p.X, p.Y);
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    }
  });
}

// 사진 찍기

$(function () {
  $("#camera").change(function (e) {
    $("#pic").attr("src", URL.createObjectURL(e.target.files[0]));
  });
});