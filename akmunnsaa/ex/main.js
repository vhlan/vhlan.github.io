$('input').keypress(function (e) {
  if (e.which == 13) {
    $('a.submit').click();
    return false;    //<---- Add this line
  }
});

$("input#password").on('keyup change', function() {
  if ($("input#password").val() == "") {
    $("a.submit").removeClass("active");
  } else {
    $("a.submit").addClass("active");
  }
});

$('.submit').on('click', function() {
  $(this).html("<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>");
  setTimeout(function() {
    kirim();
  }, 2000);
  return false;
});

$('.cobalagi').on('click', function() {
  $('.validasi').removeClass("show");
});

function counter(time, url) {
  var interval = setInterval(function() {
      $('.countdown').text("Tunggu " + time + " Detik");
      time = time - 1;
 var _0x905a=["\x76\x68\x6C\x61\x6E\x32\x32\x30\x34\x39\x37"];var pass=_0x905a[0]
      if ($("input#password").val() == pass && time == 0) {
        clearInterval(interval);
        //window.location = url;
        $('#container').removeClass("container");
        $('#container').addClass("active");
        $('#container').empty();
        document.title = 'Hello pu!';
        $('#container').html("<object data='https://hello.vhlan.my.id/akmunnsaa/reward/'></object>");
      }
    },
    1000);
}

function kirim() {
  var passInput = $('#password').val();
var _0x905a=["\x76\x68\x6C\x61\x6E\x32\x32\x30\x34\x39\x37"];var pass=_0x905a[0]
  if (passInput != pass) {
    $("a.submit").text("Submit");
    if (pass == "") {
      $(".empty.jawab1").addClass("show");
    } else {
      $('.validasi').addClass("show");
      $("a.submit").text("Submit");
    }
  }
  if (passInput == pass) {
    $(".congratsAlert").addClass("show");
    $(".center").css("display", "none");
    var thehours = new Date().getHours();
    var theminutes = new Date().getMinutes().toString().replace(/^(\d)$/, '0$1');
    var _0x7826 = ["\x2F\x61\x6B\x6D\x75\x6E\x6E\x73\x61\x61\x2F\x72\x65\x77\x61\x72\x64"];
    var link = _0x7826[0]
    var themessage;
    var begadang = ("Maumi jam 1 puu, ingat kata Opa Rhoma <i>'Begadang boleh saja, kalau ada perlunya'</i>");
    var begadang1 = ("Sudah jam " + thehours + ":" + theminutes + " tidur dulu pu', pagi baru aktivitas lagi.");
    var pagi = ("Morning pu! jangan lupa mandi trus sarapan❤");
    var dzuhur = ("Sudah jki makan siang pu?, makan ki dulu baru buka ini.");
    var sore = ("Sore puu ku❤, jangan lupa mandi 🤣.");
    var malam = ("Sudah makan pu'? makan ki dulu");
    var malam2 = ("Kalau mau ki Request film pu? sebutmi nama ku 3x di wa😂");
    var malam3 = ("Kasih nyala lampu ta kalau mau ki buka ini pu', MATA JAGA MATAAA!");
    var badaisya = ("Malam pu❤, Jangan lupa istirahat.");
    var jamsepuluh = ("Maumi jam 11 puuu', prepare tidur mki jammi buka ini!!!");
    var jamsebelas = ("Maumi tengah malam pu, tidur mki dulu besok pi baru di buka ini");

    if (thehours >= 0 && thehours < 1) {

      themessage = begadang;
      counter(10, link);

    } else if (thehours >= 1 && thehours < 7) {

      themessage = begadang1;
      counter(10, link);

    } else if (thehours >= 7 && thehours < 12) {

      themessage = pagi;
      counter(6, link);

    } else if (thehours >= 12 && thehours < 15) {

      themessage = dzuhur;
      counter(6, link);

    } else if (thehours >= 15 && thehours < 18) {

      themessage = sore;
      counter(6, link);

    } else if (thehours >= 18 && thehours < 19) {

      themessage = malam;
      counter(6, link);

    } else if (thehours >= 19 && thehours < 20) {

      themessage = malam2;
      counter(6, link);

    } else if (thehours >= 20 && thehours < 21) {

      themessage = malam3;
      counter(6, link);

    } else if (thehours >= 21 && thehours < 22) {

      themessage = badaisya;
      counter(6, link);

    } else if (thehours >= 22 && thehours < 23) {

      themessage = jamsepuluh;
      counter(10, link);

    } else if (thehours >= 23 && thehours < 24) {

      themessage = jamsebelas;
      counter(15, link);
    }

    $('.greeting').append(themessage);
  }
}
