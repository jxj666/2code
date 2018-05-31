'use strict';

var base_url = '//jxjweb.gz01.bdysite.com/2code';

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
        horizontalScrolling: false
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
            opener: function opener(openerElement) {
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
    //注册
    $('#register_btn').on('click', function() {
        register();
    });
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
    //查询
    $("#search_code").on('click', function() {
        search_code();
    });
    //游客
    $('#visit').on('click', function() {
        visit();
    });
}

function visit() {
    var u = 'jxj2991';
    var p = '666666';
    $.ajax({
        url: base_url + '/2code_php/login.php',
        data: 'u=' + u + '&p=' + p,
        success: function success(msg) {
            var data = JSON.parse(msg);
            if (data.code == '1') {
                console.log('ok');
                localStorage.u = data.user;
                $('.user').show();
                $('.un_user').hide();
                $('.user_name').text(localStorage.u);
                menu();
            } else {
                $('#visit a').html('系统错误!');
            }
        }

    });
}

function search_code() {
    var u = localStorage.u;
    var a = $('#search_address').val().trim();
    var n = $('#search_name').val().trim();
    var c = $('#search_url').val().trim();
    $.ajax({
        url: base_url + '/2code_php/search.php',
        data: 'u=' + u + '&c=' + c + '&a=' + a + '&n=' + n,
        success: function success(msg) {
            var data = JSON.parse(msg);
            if (data.code == '1') {
                add_content(msg);
            } else {
                $('#modal-form3').modal('show');
                $('#modal-form3 .info_text').text('未找到符合条件的条目!');
            }
        }

    });
}

function fix_code() {
    var u = localStorage.u;
    var i = localStorage.i;
    var a = $('#fix_address').val();
    var n = $('#fix_name').val();
    var c = $('#fix_url').val();
    var i2 = $('#fix_info').val();
    if (!n || !c) {
        $('#modal-form3').modal('show');
        $('#modal-form3 .info_text').text('请完整输入');

        return;
    }
    $.ajax({
        url: base_url + '/2code_php/fix.php',
        method: "POST",
        data: {
            u: u,
            c: c,
            a: a,
            n: n,
            i: i
        },
        success: function success(msg) {
            var data = JSON.parse(msg);
            if (data.code == '1') {
                $('#modal-form3').modal('show');
                $('#modal-form3 .info_text').text('修改成功!');

                location.reload();
            } else {
                $('#modal-form3').modal('show');
                $('#modal-form3 .info_text').text('修改失败!');
            }
        }

    });
}

function delete_code() {
    var u = localStorage.u;
    var i = localStorage.i;
    $.ajax({
        url: base_url + '/2code_php/delete.php',
        data: 'u=' + u + '&i=' + i,
        success: function success(msg) {
            var data = JSON.parse(msg);
            if (data.code == '1') {
                $('#modal-form3').modal('show');
                $('#modal-form3 .info_text').text('删除成功!');

                location.reload();
            } else {
                $('#modal-form3').modal('show');
                $('#modal-form3 .info_text').text('删除失败!');
            }
        }
    });
}

function add_code() {
    var u = localStorage.u;
    var c = $('#add_url').val().trim();
    var i = $('#add_info').val().trim();
    var n = $('#add_name').val().trim();
    var a = '';
    if ($('#province').val() != -1) {
        a += $('#province option[value="' + $('#province').val() + '"]').text() + ' ';
    }
    if ($('#city').val() != -1) {
        a += $('#city option[value="' + $('#city').val() + '"]').text() + ' ';
    }
    if ($('#district').val() != -1) {
        a += $('#district option[value="' + $('#district').val() + '"]').text() + ' ';
    }
    if (!c || !n) {
        $('#modal-form3').modal('show');
        $('#modal-form3 .info_text').text('请完整输入!');

        return;
    }
    $.ajax({
        url: base_url + '/2code_php/add.php',
        method: "POST",
        data: {
            u: u,
            c: c,
            a: a,
            n: n,
            i: i
        },
        success: function success(msg) {
            var data = JSON.parse(msg);
            if (data.code == '1') {
                $('#modal-form3').modal('show');
                $('#modal-form3 .info_text').text('新增成功!');
                location.reload();
            } else {
                $('#modal-form3').modal('show');
                $('#modal-form3 .info_text').text('新增失败!');
            }
        }

    });
}

function login() {
    var u = $('#user_g').val();
    var p = $('#password_g').val();
    $.ajax({
        url: base_url + '/2code_php/login.php',
        data: 'u=' + u + '&p=' + p,
        success: function success(msg) {
            var data = JSON.parse(msg);
            if (data.code == '1') {
                console.log('ok');
                localStorage.u = data.user;
                $('#modal-form').modal('hide');
                $('.user').show();
                $('.un_user').hide();
                $('.user_name').text(localStorage.u);
                menu();
                $('#login_info').html(' ');
            } else {
                $('#login_info').html('账号密码错误!');
            }
        }

    });
}

function register() {
    var u = $('#user_gr').val() || 'test';
    var p = $('#password_gr').val() || 'test';
    $.ajax({
        url: base_url + '/2code_php/register.php',
        data: 'u=' + u + '&p=' + p,
        success: function success(msg) {
            var data = JSON.parse(msg);
            if (data.code == '1') {
                console.log('ok');
                localStorage.u = data.user;
                $('#modal-form-register').modal('hide');
                $('.user').show();
                $('.un_user').hide();
                $('.user_name').text(localStorage.u);
                $('#register_info').html(' ');
                menu();
            } else {
                $('#register_info').html('注册失败!');
            }
        }

    });
}

function add_content(msg) {
    $('.code_info').remove();
    var data = JSON.parse(msg);
    if (data.code == '1') {
        for (var i = 0; i < data.content.length; i++) {
            var html = '';
            var code_id = data.content[i].id;
            var code_id2 = '';
            if (code_id > 99) {
                code_id2 = code_id;
            } else if (code_id > 9 && code_id <= 99) {
                code_id2 = '0' + code_id;
            } else {
                code_id2 = '00' + code_id;
            }
            html += '       <div class="col-md-6 col-sm-6 code_info">\n           <div class="media blog-thumb">\n              <div class="media-object media-left ele' + i + '">\n              </div>\n              <div class="media-body blog-info">\n                 <small><i class="fa fa-clock-o"></i>\u626B\u7801\u6B21\u6570:' + data.content[i].num + '</small>\n                 <h3><a href="javascript:void(0)">' + data.content[i].name + '</a></h3>\n                 <p>I D : ' + code_id2 + '</p>\n                 <p>\u7F51\u5740 : ' + data.content[i].content + '</p>\n                 <p>\u533A\u57DF : ' + (data.content[i].address || '无') + '</p>\n                 <p>\u5907\u6CE8 : ' + (data.content[i].info || '无') + '</p>\n                 <button class="btn section-btn" onclick=\'fix("' + encodeURI(data.content[i].id) + '","' + encodeURI(data.content[i].address) + '","' + encodeURI(data.content[i].name) + '","' + encodeURI(data.content[i].content) + '","' + encodeURI(data.content[i].info) + '")\'>\u4FEE\u6539</button>\n              </div>\n           </div>\n        </div>';
            $('#code_b').append(html);
            var ele = '.ele' + i;
            var url = 'http:' + base_url + '/2code_web/jump.html?id=' + data.content[i].id + '&&qq=228322991&v=0.2.1';
            paint(url, ele);
        }
    } else {
        localStorage.u = '';
        start();
    }
}

function menu() {
    $.ajax({
        url: base_url + '/2code_php/content.php',
        data: 'u=' + localStorage.u,
        success: add_content
    });
}

function fix(id, a, n, c, i) {
    localStorage.i = id;
    $('#fix_address').val(decodeURI(a));
    $('#fix_name').val(decodeURI(n));
    $('#fix_url').val(decodeURI(c));
    $('#fix_info').val(decodeURI(i));
    $('#modal-form2').modal('show');
}

function paint(url, ele) {
    outputQRCod(url, 200, 200); //转换中文字符串
    function toUtf8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x0001 && c <= 0x007F) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
                out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
                out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
            } else {
                out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
                out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
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

function exit() {
    localStorage.u = '';
    location.reload();
}