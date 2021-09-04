// INFORMASI DASAR
var Nama = "Muhammad Ahlan B";
var Summary =
  "Desainer Grafis yang sangat berorientasi pada detail dan menyukai gaya desain minimalis namun menarik, memiliki 6 tahun pengalaman dalam bidang desain grafis, terampil dengan aplikasi Corel Draw dan aplikasi desain grafis lainnya.";
var Negara = "Indonesia";
var Kota = "Makassar";
var Nohp = "+6285796655795";
var Telegram = "t.me/vhlan";
var Email = "hello@vhlan.my.id";
var Web = "vhlan.my.id";
var linkBarcode = "assets/img/barcode.jpg";
var Instagram = "instagr.am/vhlan";
var Facebook = "fb.me/vhlan.id";

// PENDIDIKAN
var education = [
  {
    Tahun: '2016-2021',
    Instansi: 'Universitas Muhammadiyah Makassar',
    Jurusan: 'Teknologi Pendidikan'
  },
  {
    Tahun: '2013-2015',
    Instansi: 'SMK Laniang Makassar',
    Jurusan: 'Teknik Komputer & Jaringan'
  }
];

// PENGALAMAN KERJA
var experience = [
  {
    tahun: '2015-2019',
    title: 'Wirausaha Desain Grafis',
    subtitle: 'Wirausaha',
    summary: 'Mengelola usaha jasa desain grafis dalam beberapa pembuatan jenis desain; Vexel, Logo, Smudge art, Spanduk,dll dikembangkan dan dipromosikan melalui media sosial facebook dan instagram.'
  },
  {
    tahun: '2014',
    title: 'Digital Laptop Makassar',
    subtitle: 'Praktek Kerja Lapangan',
    summary: 'Bekerja sebagai teknisi komputer dengan tugas melakkan pemeliharaan hardware umum maupun software, mencakup pergantian hardware, instalasi, dan troubleshooting.'
  }
];
// PENDIDIKAN
var skill = [
  {
    id: 'kosong',
    item: 'Mampu mengoperasikan Microsoft Oce Menengah. (intermediate)'
  },
  {
    id: 'kosong',
    item: 'Mampu troubleshooting komputer baik Hardware maupun Software.'
  },
  {
    id: 'SoftwareGraphic',
    item: 'Keahlian mengoperasikan Aplikasi Desain Grafis.<br/>'
  },
  {
    id: 'SoftwareVideo',
    item: 'Keahlian mengoperasikan Aplikasi Edit Video.<br/>'
  }
];

$(function() {
  var software = [{
    id: 'SoftwareGraphic',
    item: 'Adobe Photoshop',
    level: 'Menengah'
  },
  {
    id: 'SoftwareGraphic',
    item: 'Adobe Illustrator',
    level: 'Pemula'
  },
  {
    id: 'SoftwareGraphic',
    item: 'Corel Draw',
    level: 'Menengah'
  },
  {
    id: 'SoftwareVideo',
    item: 'Adobe Premiere Pro',
    level: 'Menengah'
  },
  {
    id: 'SoftwareVideo',
    item: 'Sony Vegas Pro',
    level: 'Menengah'
  }
  ];
  
    $.each(software, function(key, soft) {
      $("." + soft.id).append("<span style='color: #097677;'>■ </span> " + soft.item + " - <small>("+ soft.level +")</small><br />");
    });
  });
  

// TATA INFO ASIDE
var info = [
  {icon: '<i class="fab fa-whatsapp"></i>', title: 'Telepon / WhatsApp', data: Nohp},
  {icon: '<i class="fab fa-telegram-plane"></i>', title: 'Telegram', data: Telegram},
  {icon: '<i class="fas fa-envelope"></i>', title: 'Surel', data: Email},
  {icon: '<i class="fas fa-globe"></i>', title: 'Website/Blog', data: Web}
];

$("#container").each(function () {
  $(this).find("h1.nama").text(Nama);
  $(this).find(".summary").text(Summary);
  $(this).find("span").text(Kota+", "+Negara);
  $(this).find(".barcode").append("<img src="+linkBarcode+"/> <br/><span>"+Instagram+"</span>");
});

$('.info, .skill, .experience, .education').append('<ul></ul>');

$.each(skill, function (key, skill) {
  var data = "<li class='"+skill.id+"'>";
  data += skill.item;
  data += "</li>";
  $(data).appendTo(".skill ul:first");
});

$.each(info, function (key, info) {
  var data = "<li> ";
  data += info.icon + "<ul><li><h3>" + info.title + "</h3></li>" + "<li>" + info.data + "</li></ul>";
  data += "</li>";
  $(data).appendTo(".info ul:first");
});

$.each(education, function (key, edu) {
  var data = '<li>';
  data += "<h3>" + edu.Instansi + "</h3><ul><li class='tahun'><small>"+edu.Tahun+"</small></li><li class='sub-title'>" + edu.Jurusan + "</li></ul>";
  data += '</li>';
  $(data).appendTo('#container .main-wrapper aside .education ul:first');
});

$.each(experience, function (key, exp) {
  var data = '<li> ';
  data += "<h3 class='title'>" + exp.title + "<small>●</small>" + exp.tahun + "</h3>" + "<ul><li class='sub-title'>" + exp.subtitle + "</li><li class='summary'>" + exp.summary + "</li>";
  data += '</ul></li>';
  $(data).appendTo('.experience ul:first');
});

