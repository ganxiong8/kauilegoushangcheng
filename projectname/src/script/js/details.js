// ----------------详情页js----------------
;
(function() {
    // ----------数据渲染拼接----------
    var picid = location.search.substring(1).split('=')[1];

    $.ajax({
        url: '../php/details.php',
        data: {
            sid: picid
        },
        dataType: 'json'
    }).done(function(data) { //data:后端返回的和id对应的数据
        console.log(data);
        $('#smallpic').attr('src', data.url);
        $('#bpic').attr('src', data.url);
        $('#numsid').html(data.sid);
        $('.sm_tit').html(data.smtitle);
        $('.tit').html(data.title);
        $('.price_now').html(data.price);
        var arr = data.urls.split(',');
        console.log(arr);
        var str = '';
        $.each(arr, function(index, value) {
            str += '<li class="img_item"><a href="javascript:;"><img src="' + value + '"/></a></li>';
        });
        $('.img_list').html(str);

    });


    // -----------放大镜效果----------
    ! function() {

        $('#sf').width($('#spic').width() * $('#bf').width() / $('#bpic').width());
        $('#sf').height($('#spic').height() * $('#bf').height() / $('#bpic').height());
        var bili = $('#bpic').width() / $('#spic').width();
        $('#spic').hover(function() {
            $('#sf').css('visibility', 'visible');
            $('#bf').css('visibility', 'visible');
            $(this).on('mousemove', function(ev) {
                var $left = ev.pageX - $('.sp_l').offset().left - $('#sf').width() / 2;
                var $top = ev.pageY - $('.sp_l').offset().top - $('#sf').height() / 2;
                if ($left < 0) {
                    $left = 0;
                } else if ($left >= $('#spic').width() - $('#sf').width()) {
                    $left = $('#spic').width() - $('#sf').width();
                }
                if ($top < 0) {
                    $top = 0;
                } else if ($top >= $('#spic').height() - $('#sf').height()) {
                    $top = $('#spic').height() - $('#sf').height();
                }
                $('#sf').css('left', $left);
                $('#sf').css('top', $top);
                $('#bpic').css('left', -$left * bili);
                $('#bpic').css('top', -$top * bili);
            });
        }, function() {
            $('#sf').css('visibility', 'hidden');
            $('#bf').css('visibility', 'hidden');
        });

        //点击小图切换
        $('.img_list').on('click', 'li', function() {
            var $imgurl = $(this).find('img').attr('src');
            $('#smallpic').attr('src', $imgurl);
            $('#bpic').attr('src', $imgurl);
        });

        //点击箭头进行切换
        var $num = 5; //放大镜显示5张。
        $('.r_btn').on('click', function() {
            var $list = $('.img_list li');
            if ($list.length > $num) {
                $num++;
                $('.l_btn').css('color', '#333');
                if ($list.length == $num) {
                    $('.r_btn').css('color', '#fff');
                }
                $('.img_list').animate({
                    left: -($num - 5) * $list.eq(0).innerWidth()
                })
            }
        });

        $('.l_btn').on('click', function() {
            var $list = $('.img_list li');
            if ($num > 5) {
                $num--;
                $('.r_btn').css('color', '#333');
                if ($num <= 5) {
                    $('.l_btn').css('color', '#fff');
                }
                $('.img_list').animate({
                    left: -($num - 5) * $list.eq(0).innerWidth()
                })
            }
        });
    }();



})();