$(document).scroll(function() {
    var y = $(this).scrollTop();
    if (document.location.pathname.indexOf("/contact/") == 0) {
        
    } else {
        if (y > 392) {
            $('.nav-brand h1').addClass("active");
            $('.nav-brand .logo-brand').removeClass("active");
        } else {
            $('.nav-brand h1').removeClass("active");
            $('.nav-brand .logo-brand').addClass("active");
        }
    }

    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $('.nav-brand .logo-brand').addClass("active");
    }

    if (y > 0) {
        $("#header-wrapper").addClass("shadow");
    } else {
        $("#header-wrapper").removeClass("shadow");
    }
});

$(document).ready(function() {

    $('a[href^="#home"]').addClass('active');
    $('.nav-brand .logo-brand').addClass("active");
    //smoothscroll

    $('.moreBtn2').on('click', function() {
        $('#blog').removeClass("last");
        $(this).hide();
    });

    $(".hamburger").click(function() {
        $(this).toggleClass("is-active");
        $('.nav-brand h1').toggleClass("active");
        $(".hamburger-menu").toggleClass("active");
        $('.nav-brand .logo-brand').toggleClass("active");
        $('.isHomepage').toggleClass("active");
    });

    $(document).ready(function() {

        $('ul.tabs li').click(function() {
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#" + tab_id).addClass('current');
        })

    })

    /* VALIDATION MESSAGE & ERROR MESSAGE */

    $(".contactemail form label, .contactwa .formwa label").each(function() {
        var labelName = $(this).find("input, textarea").attr('class').split(' ')[0];
        var txtvald = $(this).data("tip");
        var errorMsg = "I am sorry, is not a valid email address";

        if ($(this).find(".email").length) {
            $(this).append("<span class='validasi validasi" + labelName + "'><b>" + txtvald + "</b> (required)</span><span class='errorMsg'>" + errorMsg + "</span>");
        } else if ($(this).find(".pesan").length) {
            $(this).append("<span class='validasi validasi" + labelName + "'>" + txtvald + "</span>");
        } else if ($(this).find(".telepon").length) {
        } else {
            $(this).append("<span class='validasi validasi" + labelName + "'><b>" + txtvald + "</b> (required)</span>");
        }
    });

    /* HIDE VALIDATION, BUTTON  WHATSAPPP */

    $(document).on('keypress', '.contactwa .formwa input, .contactemail form .required', function() {
        if (event.keyCode === 15) {
            $(this).parents(".formwa").find('.submit').trigger('click');
        }
    });

    $(document).on('keyup', '.contactwa .formwa .required, .contactemail form .required', function() {
        if ($(this).val() != '') {
            $(this).parents('label').find('.validasi').removeClass('show');
        }
    });

    $(document).on('keyup', '.contactwa .formwa .required, .contactemail form .required', function() {
        if ($(this).val() != '') {
            $(this).parents('label').find('.errorMsg').removeClass('show');
        }
    });

    $(document).on('click', '.contactwa .formwa .submit', function() {
        kirimWA($(this).parents('.contactwa').attr('id'));
        return false;
    });

    // var reg = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    var reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    /* FUNCTION UNTUK EMAIL */
    function validateRegister() {
        if ($('#contactemail .nama').val() == '') {
            // Cek Nama
            $('.contactemail label .validasinama').addClass("show");
            $('#contactemail .nama').focus();
            return false;
        } else if ($('#contactemail .email').val() == '') {
            // Cek Email
            $(".contactemail label .validasiemail").addClass("show");
            $('#contactemail .email').focus();
            return false;
        } else if (reg.test($('#contactemail .email').val()) == false) {
            // Cek Validasi Email
            $('.contactemail label .errorMsg').addClass("show");
            $('#contactemail .email').focus();
            return false;
        } else if ($('#contactemail .subjek').val() == '') {
            // Cek Pesan
            $('.contactemail label .validasisubjek').addClass("show");
            $('#contactemail .subjek').focus();
            return false;
        } else if ($('#contactemail .pesan').val() == '') {
            // Cek Pesan
            $('.contactemail label .validasipesan').addClass("show");
            $('#contactemail .pesan').focus();
            return false;
        }
    }

    /* FUNCTION UNTUK WHATSAPPP */
    function kirimWA() {
        if ($('#contactwa .nama').val() == '') {
            // Cek Nama
            $('.contactwa label .validasinama').addClass("show");
            $('#contactwa .nama').focus();
            return false;
        } else if ($('#contactwa .email').val() == '') {
            // Cek Email
            $(".contactwa label .validasiemail").addClass("show");
            $('#contactwa .email').focus();
            return false;
        } else if (reg.test($('#contactwa .email').val()) == false) {
            // Cek Validasi Email
            $('.contactwa label .errorMsg').addClass("show");
            $('#contactwa .email').focus();
            return false;
        } else if ($('#contactwa .pesan').val() == '') {
            // Cek Pesan
            $('.contactwa label .validasipesan').addClass("show");
            $('#contactwa .pesan').focus();
            return false;
        } else {
            // Check Device (Mobile/Desktop)
            var url_wa = 'https://web.whatsapp.com/send';
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                url_wa = 'whatsapp://send/';
            }
            // Get Value
            var tujuan = $('#contactwa .tujuan').val()
              , via_url = location.href
              , nama = $('#contactwa .nama').val()
              , email = $('#contactwa .email').val()
              , pesan = $('#contactwa .pesan').val();
            $(this).attr('href', url_wa + '?phone=62' + tujuan + '&text=*' + nama + '* %0A' + 'Surel : ' + email + '%0A%0A' + pesan);
            var w = 960
              , h = 540
              , left = Number((screen.width / 2) - (w / 2))
              , tops = Number((screen.height / 2) - (h / 2))
              , popupWindow = window.open(this.href, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
            popupWindow.focus();
            return false;
        }
    }

});

// ================================================= MENU NAVIGATION
// Cache selectors
var lastId, topMenu = $(".menu"), topMenuHeight = topMenu.outerHeight() + 15, // All list items
menuItems = topMenu.find("a.menu-anchor"), // Anchors corresponding to menu items
scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
        return item;
    }
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e) {
    var href = $(this).attr("href")
      , offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 70;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
    }
});

        $(document).ready(function() {
            const rssUrl = 'https://vhlan.blogspot.com/rss.xml';
            const apiKey = 'API_KEY_ANDA';  // Ganti dengan API key Anda

            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvhlan.blogspot.com%2Frss.xml`;

             $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    data.items.forEach(function(item) {
                        const title = item.title;
                        const link = item.link;
                        const pubDate = new Date(item.pubDate).toLocaleDateString('id-ID');
                        const description = item.description;

                        // Membuat elemen sementara untuk memparsing deskripsi HTML
                        const tempDiv = $('<div>').html(description);
                        const imageUrl = tempDiv.find('img').first().attr('src');

                        const itemHtml = `
                        <div class="item-blog">
                            <a href="${link}">
                                <div class="item-info">
                                    <img src="${imageUrl ? imageUrl :'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisBILjKvYckupiJ-BQa2pIaCUszSK6KnuGTJM6ZNJurR-XuysU8lykBPMZGTFXHGhcpVlqj_GyDJ7joc-s2iNWmY4KhKhW8SRFkr8yWUI6oFIsrVy9qYiLQD_dHyAYAlDBSulvKGfZ5zExonraDMN1Z1Pq5NL8VKkEkwrEV0iGnDACJ8niNLDYGFxRoEY/s1600/images.png'}">
                                    <h3>${title}</h3>
                                    <span>${pubDate}</span>
                                </div>
                            </a>
                        </div>`;
                        
                        $('.blog-post').append(itemHtml);
                    });
                },
                error: function() {
                    console.log('Failed to fetch RSS feed');
                }
            });
        });
