$('.openContent').click(function() {
  $('.QuestAdult').addClass("show");
  $(this).remove();
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

/*if (document.referrer != ""){
    if (new URLPattern(document.referrer).hostname === new URLPattern(window.location.origin).hostname){
        $("#container").addClass("show");
    }
}*/

var lastUrl = document.referrer;

if(lastUrl.search("https://hello.vhlan.my.id/akmunnsaa") == -1) {
$("#container").addClass("show");
}
