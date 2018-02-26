(function($) {

    "use strict";

    // PRE LOADER
    $(window).load(function() {
        $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    // MENU
    $('.navbar-collapse a').on('click', function() {
        $(".navbar-collapse").collapse('hide');
    });

    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });


    // PARALLAX EFFECT
    $.stellar({
        horizontalScrolling: false,
    });


    // MAGNIFIC POPUP
    $('.image-popup').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-with-zoom',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });


    // SMOOTH SCROLL
    $(function() {
        $('.custom-navbar .nav_c a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 49
            }, 1000);
            event.preventDefault();
        });
    });



    start();

})(jQuery);

function start() {
    if (localStorage.u) {
        $('.user').show();
        $('.un_user').hide();
        $('.user_name').text(localStorage.u);
        menu();
    } else {
        $('.user').hide();
        $('.un_user').show();
    }


    //登录
    $('#login_btn').on('click', function() {
        login();
    });
    //添加
    $("#add_code").on('click', function() {
        add_code();
    });
    //删除
    $("#delete_code").on('click', function() {
        delete_code();
    });
    //修改
    $("#fix_code").on('click', function() {
        fix_code();
    });
}

function fix_code() {
    var u = localStorage.u;
    var i = localStorage.i;
    var a = $('#fix_address').val();
    var n = $('#fix_name').val();
    var c = $('#fix_url').val();
    if (!a || !n || !c) {
        alert('请完整输入');
        return;
    }
    $.ajax({
        url: '//jxjweb.sc2yun.com/2code_php/fix.php',
        data: `u=${u}&c=${c}&a=${a}&n=${n}&i=${i}`,
        success: function(msg) {
            var data = JSON.parse(msg)
            if (data.code == '1') {
                alert('修改成功!');
                location.reload();
            } else {
                alert('修改失败!');
            }
        },

    });
}

function delete_code() {
    var u = localStorage.u;
    var i = localStorage.i;
    $.ajax({
        url: '//jxjweb.sc2yun.com/2code_php/delete.php',
        data: `u=${u}&i=${i}`,
        success: function(msg) {
            var data = JSON.parse(msg)
            if (data.code == '1') {
                alert('删除成功!');
                location.reload();
            } else {
                alert('删除失败!');
            }
        },

    });
}

function add_code() {
    var u = localStorage.u;
    var c = $('#add_url').val().trim();
    var a = $('#add_address').val().trim();
    var n = $('#add_name').val().trim();
    if (!c || !a || !n) {
        alert('请完整输入!');
        return;
    }
    $.ajax({
        url: '//jxjweb.sc2yun.com/2code_php/add.php',
        data: `u=${u}&c=${c}&a=${a}&n=${n}`,
        success: function(msg) {
            var data = JSON.parse(msg)
            if (data.code == '1') {
                alert('新增成功!');
                location.reload();
            } else {
                alert('新增失败!');
            }
        },

    });
}

function login() {
    var u = $('#user_g').val();
    var p = $('#password_g').val();
    $.ajax({
        url: '//jxjweb.sc2yun.com/2code_php/login.php',
        data: `u=${u}&p=${p}`,
        success: function(msg) {
            var data = JSON.parse(msg)
            if (data.code == '1') {
                console.log('ok');
                localStorage.u = data.user;
                $('#modal-form').modal('hide');
                $('.user').show();
                $('.un_user').hide();
                $('.user_name').text(localStorage.u);
                menu();
            } else {
                $('#login_info').html('账号密码错误!');
            }
        },

    });
}

function menu() {
    $.ajax({
        url: '//jxjweb.sc2yun.com/2code_php/content.php',
        data: `u=${localStorage.u}`,
        success: function(msg) {
            var data = JSON.parse(msg)
            if (data.code == '1') {

                for (var i = data.content.length - 1; i >= 0; i--) {
                    var html = '';
                    html += `       <div class="col-md-6 col-sm-6">
           <!-- BLOG THUMB -->
           <div class="media blog-thumb">
              <div class="media-object media-left ele${i}">
              </div>
              <div class="media-body blog-info">
                 <small><i class="fa fa-clock-o"></i>扫码次数:${data.content[i].num}</small>
                 <h3><a href="javascript:void(0)">${data.content[i].name}</a></h3>
                 <p>${data.content[i].content}</p>
                 <p>${data.content[i].address}</p>
                 <button class="btn section-btn" onclick='fix("${data.content[i].id}","${data.content[i].address}","${data.content[i].name}","${data.content[i].content}")'>修改</button>
              </div>
           </div>
        </div>`;
                    $('#code_b').append(html);
                    var ele = `.ele${i}`;
                    var url = `http://jxjweb.sc2yun.com/2code_php/url.php?id=${data.content[i].id}`;
                    paint(url, ele);
                }

            } else {
              localStorage.u='';
              start();  
            }
        },

    });
}

function fix(id, a, n, c) {
    localStorage.i = id;
    $('#fix_address').val(a);
    $('#fix_name').val(n);
    $('#fix_url').val(c);
    $('#modal-form2').modal('show');
}

function paint(url, ele) {　　　　　　
    outputQRCod(url, 200, 200);　　　　　　　　　　 //转换中文字符串
    function toUtf8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    //生成二维码
    function outputQRCod(txt, width, height) {
        //先清空
        $(ele).empty();
        //中文格式转换
        var str = toUtf8(txt);
        //生成二维码
        $(ele).qrcode({
            render: "canvas", //canvas和table两种渲染方式
            width: width,
            height: height,
            text: str
        });
    }
}

function exit(){
  localStorage.u='';
  location.reload();
}