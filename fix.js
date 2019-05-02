$(document).ready(function() {
  var provOptions = '';
  var kotaOptions = '';
  var kecOptions = '';

  $.getJSON('https://vhlan.github.io/prov.json', function(data) {
    provOptions += '<option name="" value="" >Pilih Provinsi</option>';
    $.each(data, function(key, provinsi) {
      provOptions += '<option name="' + provinsi.nama + '" value="' + provinsi.id + '">' + provinsi.nama + '</option>';
    });
    $('#prov').html(provOptions);
  });

  $(document).on('change', '#prov', function() {
        $('#kota')
            .children()
            .remove()
            .end()
            .append('<option value="">Loading...</option>');
         $('#kec').html('<option name="" value="">Pilih Kecamatan</option>');
$("#kec").attr('disabled','disabled')
    $("#kota").removeAttr("disabled");
    var prov_id = $(this).val();
    if (prov_id != '') {
      $.getJSON('https://vhlan.github.io/kota.json', function(data) {
        kotaOptions = '<option name="" value="">Pilih Kota/Kab</option>';
        $.each(data, function(key, kota) {
          if (prov_id == kota.id_prov) {
            kotaOptions += '<option name="' + kota.nama + '" value="' + kota.id + '">' + kota.nama + '</option>';
          }
        });
        $('#kota').html(kotaOptions);
      });
    } else {
    $("#kota").attr('disabled','disabled')
      $('#kota').html('<option name="" value="">Pilih Kota/Kab</option>');
      $('#kec').html('<option name="" value="">Pilih Kecamatan</option>');
    }
  });

  $(document).on('change', '#kota', function() {
          $('#kec')
            .children()
            .remove()
            .end()
            .append('<option name="" value="">Loading...</option>');
    $("#kec").removeAttr("disabled");
    var kota_id = $(this).val();
    if (kota_id != '') {
      $.getJSON('https://vhlan.github.io/kec.json', function(data) {
        kecOptions = '<option name="" value="">Pilih Kecamatan</option>';
        $.each(data, function(key, kec) {
          if (kota_id == kec.id_kota) {
            kecOptions += '<option name="' + kec.nama + '" value="' + kec.id + '">' + kec.nama + '</option>';
          }
        });
        $('#kec').html(kecOptions);
      });
    } else {
      $('#kec').html('<option name="" value="">Pilih Kecamatan</option>');
    }
  });
});

 
      $(document).on('keypress','.inputwa input, .inputwa textarea', function() {
        if (event.keyCode === 13) {
          $(this).parents(".inputwa").find('.submit').trigger('click');
        }
      });
	  
	        $(document).on('change','.inputwa select', function() {
        $(this).removeClass('bagi');
        $(this).parents('label').find('.validasi').removeClass('show');
      });
      
            $(document).on('keyup','.inputwa .required', function() {
        if ($(this).val() != '') {
          $(this).removeClass('bagi');
 $(this).parents('label').find('.validasi').removeClass('show');
        }
      });
      
	              $(document).on('keyup','.inputwa .required', function() {
        if ($(this).val() != '') {
          $(this).removeClass('bagi');
 $(this).parents('label').find('.errorMsg').removeClass('show');
        }
      });
	  
            $(document).on('click','.inputwa .submit', function(){
        kirimWA($(this).parents('.poptamv').attr('id'));
        return false;
      });
	  
var reg = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
function kirimWA() {
    var ph = '';
    if ($('#whatsapp .nama').val() == '') { // Cek Nama
        ph = $('#whatsapp .nama').attr('placeholder');
		$('.validasinama').addClass("show");
        $('#whatsapp .nama').focus();
        return false;
    } else if ($('#whatsapp .nohp').val() == '') { // Cek Email
        ph = $('#whatsapp .nohp').attr('placeholder');
        $('.validasinohp').addClass("show");
        $('#whatsapp .nohp').focus();
        return false;
    } else if (reg.test($('#whatsapp .nohp').val()) == false) { // Cek Validasi Email
        $('.errorMsg').addClass("show");
        $('#whatsapp .nohp').focus();
         return false;
    } else if ($('#whatsapp .pembayaran').val() == '') { // Cek Pesan
        ph = $('#whatsapp .pembayaran').attr('placeholder');
        $('.validasipembayaran').addClass("show");
        $('#whatsapp .pembayaran').focus();
        return false;
    } else if ($('#whatsapp .alamat').val() == '') { // Cek Pesan
        ph = $('#whatsapp .alamat').attr('placeholder');
        $('.validasialamat').addClass("show");
        $('#whatsapp .alamat').focus();
        return false;
    } else if ($('#whatsapp .provinsi').val() == '') { // Cek Pesan
        ph = $('#whatsapp .provinsi').attr('placeholder');
        $('.validasiprovinsi').addClass("show");
        $('#whatsapp .provinsi').focus();
        return false;
    } else if ($('#whatsapp .kota').val() == '') { // Cek Pesan
        ph = $('#whatsapp .kota').attr('placeholder');
        $('.validasikota').addClass("show");
        $('#whatsapp .kota').focus();
        return false;
    } else if ($('#whatsapp .kecamatan').val() == '') { // Cek Pesan
        ph = $('#whatsapp .kecamatan').attr('placeholder');
        $('.validasikecamatan').addClass("show");
        $('#whatsapp .kecamatan').focus();
        return false;
    } else {
            // Check Device (Mobile/Desktop)
            var url_wa = 'https://web.whatsapp.com/send';
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                url_wa = 'whatsapp://send/';
            }
            // Get Value
            var tujuan = $('#whatsapp .tujuan').val(),
                    via_url = location.href,
                    nama = $('#whatsapp .nama').val(),
                    nohp = $('#whatsapp .nohp').val(),
                    pembayaran = $('#whatsapp .pembayaran').val();
					alamat = $('#whatsapp .alamat').val();
					provinsi = $('#whatsapp .provinsi option:selected').attr('name');
					kota = $('#whatsapp .kota option:selected').attr('name');
					kecamatan = $('#whatsapp .kecamatan option:selected').attr('name');
            $(this).attr('href', url_wa + '?phone=62 ' + tujuan + '&text=Halo admin' + ' saya mau beli makanan %0A%0A' + '*Metode Pembayaran :*%0A' + pembayaran + '%0A%0A' + '*Alamat:*%0A' + alamat + '%0A' + 'Provinsi ' + provinsi + '%0A' + kota + ' - Kec. ' + kecamatan + '%0A%0A' + 'A/n.%0A*' + nama + '* ( ' + nohp + ' )%0A%0Avia ' + via_url);
            var w = 960,
                    h = 540,
                    left = Number((screen.width / 2) - (w / 2)),
                    tops = Number((screen.height / 2) - (h / 2)),
                    popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
            popupWindow.focus();
            return false;
        }
    }