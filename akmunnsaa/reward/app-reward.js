function counter(time, url) {
  0
  var interval = setInterval(function() {
      $('.countdown').text("Tunggu " + time + " Detik");
      time = time - 1;

      if (time == 0) {
        clearInterval(interval);
        $(".loading").css("display", "none");
        $(".konten").addClass("show");
      }
    },
    1000);
}

var countSecond = 7;
var thehours = new Date().getHours();
var theminutes = new Date().getMinutes().toString().replace(/^(\d)$/, '0$1');
var themessage;
var begadang = ("Maumi jam 1 puu, ingat kata Opa Rhoma <i>'Begadang boleh saja, kalau ada perlunya'</i>");
var begadang1 = ("Sudah jam " + thehours + ":" + theminutes + " tidur dulu pu', pagi baru aktivitas lagi.");
var pagi = ("Morning pu! jangan lupa mandi trus sarapan❤");
var dzuhur = ("Sudah jki makan siang pu?, makan ki dulu baru buka ini.");
var sore = ("Sore puu ku❤, jangan lupa mandi 🤣.");
var malam = ("Sudah makan pu'? makan ki dulu");
var malam2 = ("Kalau mau ki Request film pu? sebutmi nama ku 3x 😂");
var malam3 = ("Kasih nyala lampu ta kalau mau ki buka ini pu', MATA JAGA MATAAA!");
var badaisya = ("Malam pu❤, Jangan lupa istirahat.");
var jamsepuluh = ("Maumi jam 11 puuu', prepare tidur mki jammi buka ini!!!");
var jamsebelas = ("Maumi tengah malam pu, tidur mki dulu besok pi baru di buka ini");

if (thehours >= 0 && thehours < 1) {

  themessage = begadang;
  counter(countSecond);

} else if (thehours >= 1 && thehours < 7) {

  themessage = begadang1;
  counter(countSecond);

} else if (thehours >= 7 && thehours < 12) {

  themessage = pagi;
  counter(countSecond);

} else if (thehours >= 12 && thehours < 15) {

  themessage = dzuhur;
  counter(countSecond);

} else if (thehours >= 15 && thehours < 18) {

  themessage = sore;
  counter(countSecond);

} else if (thehours >= 18 && thehours < 19) {

  themessage = malam;
  counter(countSecond);

} else if (thehours >= 19 && thehours < 20) {

  themessage = malam2;
  counter(countSecond);

} else if (thehours >= 20 && thehours < 21) {

  themessage = malam3;
  counter(countSecond);

} else if (thehours >= 21 && thehours < 22) {

  themessage = badaisya;
  counter(countSecond);

} else if (thehours >= 22 && thehours < 23) {

  themessage = jamsepuluh;
  counter(countSecond);

} else if (thehours >= 23 && thehours < 24) {

  themessage = jamsebelas;
  counter(countSecond);

}

$('.greeting').append(themessage);

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
