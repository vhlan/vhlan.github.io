$("input#jawab1").on('keyup change', function() {
  $(".validasi.jawab1").removeClass("show");
  $(this).css("border", "1px solid #ccc");
  $(".empty.jawab1").removeClass("show");
});

$("input#jawab2").on('keyup change', function() {
  $(".validasi.jawab2").removeClass("show");
  $(this).css("border", "1px solid #ccc");
  $(".empty.jawab2").removeClass("show");
});

$("input#jawab3").on('keyup change', function() {
  $(".validasi.jawab3").removeClass("show");
  $(this).css("border", "1px solid #ccc");
  $(".empty.jawab3").removeClass("show");
});

$("input#jawab4").on('keyup change', function() {
  $(".validasi.jawab4").removeClass("show");
  $(this).css("border", "1px solid #ccc");
  $(".empty.jawab4").removeClass("show");

});

$(document).on('click', '.kuis .submit', function() {
  kirim();
  return false;
});

function kirim() {
  var Q1 = $('.kuis #jawab1').val();
  var Q2 = $('.kuis #jawab2').val();
  var Q3 = $('.kuis #jawab3').val();
  var Q4 = $('.kuis #jawab4').val();
  var A1 = "82";
  var A2 = "aku tidak pernah meninggalkanmu";
  var A3 = "tabaria";
  var A4 = "anniversary"

  if (Q1 != A1) {
    $(".kuis #jawab1").css("border", "1px solid red");
    if (Q1 == "") {
      $(".empty.jawab1").addClass("show")
    } else {
      $('.validasi.jawab1').addClass("show");
      $(".empty.jawab1").removeClass("show")
    }
  }
  
  if (Q2 != A2) {
    $(".kuis #jawab2").css("border", "1px solid red");
    if (Q2 == "") {
      $(".empty.jawab2").addClass("show")
    } else {
      $('.validasi.jawab2').addClass("show");
      $(".empty.jawab2").removeClass("show")
    }
  }
  
  if (Q3 != A3) {
    $(".kuis #jawab3").css("border", "1px solid red");
    if (Q3 == "") {
      $(".empty.jawab3").addClass("show")
    } else {
      $('.validasi.jawab3').addClass("show");
      $(".empty.jawab3").removeClass("show")
    }
  }
  
  if (Q4 != A4) {
    $(".kuis #jawab4").css("border", "1px solid red");
    if (Q4 == "") {
      $(".empty.jawab4").addClass("show")
    } else {
      $('.validasi.jawab4').addClass("show");
      $(".empty.jawab4").removeClass("show")
    }
  }

  if (Q1 == A1 && Q2 == A2 && Q3 == A3 && Q4 == A4) {
    $(".congratsAlert").addClass("show");
    $(".kuis").css("display","none")
    window.location.href = "/akmunnsaa/reward";
  }
}
