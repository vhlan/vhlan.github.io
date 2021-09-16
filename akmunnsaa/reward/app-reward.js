function counter(time, url) {0
 var interval = setInterval(function() {
  $('.countdown').text("Tunggu " + time + " Detik");
  time = time - 1;

  if (time == 0) {
   clearInterval(interval);
   $(".loading").css("display","none");
   $(".konten").addClass("show");
  }
 },
  1000);
}

var thehours = new Date().getHours();
var theminutes = new Date().getMinutes().toString().replace(/^(\d)$/, '0$1');
var link = 'https://drive.google.com/drive/folders/1O7Y3BlGC_gfFRnmL99NuDlSEL3iFkeLN';
var themessage;
var begadang = ("Sudah hampir jam 1, ingat kata Opa Rhoma <i>'Begadang boleh saja, kalau ada perlunya'</i>");
var begadang1 = ("Sudah jam " + thehours + ":" + theminutes + " tidur dulu pu', pagi baru lanjut nonton lagi.");
var pagi = ("Morning pu! jangan lupa sarapan");
var dzuhur = ("Sudah ji shalat dzuhur pu?, shalat dulu baru baca.");
var sore = ("Sore Ainun, jangan lupa Shalat.");
var malam = ("Sudah makan nu'? makan dulu gih, shalat dulu tapi");
var malam2 = ("Mau ki Request film? kirim WA saja");
var malam3 = ("Nonton Film jangan di tempat gelap nu', jangan dekat-dekat juga!");
var badaisya = ("Malam Ainun, Jangan lupa istirahat.");
var jamsepuluh = ("Sudah hampir jam 11 nu', prepare tidur!!!");
var jamsebelas = ("Maumi tengah malam, ku ksh lamai waktu tunggunya");

if (thehours >= 0 && thehours < 1) {

 themessage = begadang;
 counter(15);

} else if (thehours >= 1 && thehours < 7) {

 themessage = begadang1;
 counter(15);

} else if (thehours >= 7 && thehours < 12) {

 themessage = pagi;
 counter(15);

} else if (thehours >= 12 && thehours < 15) {

 themessage = dzuhur;
 counter(15);

} else if (thehours >= 15 && thehours < 18) {

 themessage = sore;
 counter(15);

} else if (thehours >= 18 && thehours < 19) {

 themessage = malam;
 counter(15);

} else if (thehours >= 19 && thehours < 20) {

 themessage = malam2;
 counter(15);

} else if (thehours >= 20 && thehours < 21) {

 themessage = malam3;
 counter(15);

} else if (thehours >= 21 && thehours < 22) {

 themessage = badaisya;
 counter(15);

} else if (thehours >= 22 && thehours < 23) {

 themessage = jamsepuluh;
 counter(15);

} else if (thehours >= 23 && thehours < 24) {

 themessage = jamsebelas;
 counter(15);

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
  }
});
