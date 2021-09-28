$('.textOpenContent').click(function() {
  $('.QuestAdult').addClass("show");
  $(this).remove();
});

$("#Q1, #Q2").on("change paste keyup", function() {
var A1 = "8116";
var A2 =  "kumbang";
  if ($("#Q1").val().toLowerCase() == A1 && $("#Q2").val().toLowerCase() == A2) {
    $(".contentHidden").css("filter", "blur(0px)");
    $(".contentHidden").css("user-select", "auto");
    $(".textOpenContent").css("pointer-events", "auto");
  }
});

$("#QAdult").on("change paste keyup", function() {
  if ($(this).val() == "3993") {
    $("p.adult").css("filter", "blur(0px)");
    $("p.adult").css("user-select", "auto");
    $(".QuestAdult").remove();
  } else if ($(this).val() != "3993" && $(this).val().length >= 4) {
    $(".wrongQAdult").addClass("show");
  } else {
    $(".wrongQAdult").removeClass("show");
  }
});
