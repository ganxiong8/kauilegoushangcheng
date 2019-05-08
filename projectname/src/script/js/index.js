;
(function($) {
    class Banner {
        constructor() {
            this.banner = $('.banner');
            this.picLi = $('.lunbo_big li');
            this.btnLi = $('.ol_li li');
            this.btn_left = $('.left');
            this.btn_right = $('.right');
            this.time = null;
            this.num = 0;
        }
        init() {
            var _this = this;
            this.btnLi.each(function() {
                $(this).on('click', function() {
                    _this.btnliover(this)
                })
            })

            this.banner.hover(function() {
                _this.arrowover()
            }, function() {
                _this.arrowout()
            })
            this.btn_right.on('click', function() {
                _this.rightclick()
            })
            this.btn_left.on('click', function() {
                _this.leftclick()
            })
        }
        btnliover(bli) {
            this.num = $(bli).index()
            $(bli).addClass('active').siblings('li').removeClass('active');
            this.picLi.eq($(bli).index()).stop(true).animate({
                'opacity': 1
            }).siblings().stop(true).animate({
                'opacity': 0
            })

        }
        arrowover() {
            this.btn_left.show();
            this.btn_right.show();
            clearInterval(this.timer)

        }
        arrowout() {
            var _this = this
            this.btn_left.hide();
            this.btn_right.hide()
            this.timer = setInterval(function() {
                _this.btn_right.click()
            }, 2000);
        }
        rightclick() {
                this.num++;
                if (this.num > this.btnLi.size() - 1) {
                    this.num = 0;
                }
                this.btnLi.eq(this.num).addClass('active').siblings('li').removeClass('active');
                this.picLi.eq(this.num).stop(true).animate({
                    'opacity': 1
                }).siblings().stop(true).animate({
                    'opacity': 0
                })

            }
            // leftclick() {
            //     this.num--;
            //     if (this.num < 0) {
            //         this.num = this.btnLi.size() - 1
            //     }
            //     this.btnLi.eq(this.num).addClass('active').siblings('li').removeClass('active');
            //     this.picLi.eq(this.num).stop(true).animate({
            //         'opacity': 1
            //     }).siblings().stop(true).animate({
            //         'opacity': 0
            //     })
            // }

    }
    new Banner().init()
})(jQuery);