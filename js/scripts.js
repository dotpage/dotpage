window.onload = function () {
    var coordScrollTop = 100;
    var coord = $('html, body');

    var slider = new Slider({
        images: '.rectangle-slider__img',
        btnPrev: '.slider_btn-left',
        btnNext: '.slider_btn-right',
        auto: true
    });

    $('.nav__link').on('click', function (e) {
        e.preventDefault();

        $('.menu a').removeClass('active').filter(this).addClass('active');

        var selector = $(this).attr('href'); /* #about - строка */
        var h = $(selector); /* jquery-элемент заголовка */
        moveScroll(h.offset().top);
    });

    btnOn(coordScrollTop);

    $(document).on('scroll', function () {
        btnOn(coordScrollTop);
    });

    $('.btn-up').on('click', function () {
        moveScroll();
    });

    function Slider(obj) {
        var self = this;
        var images = $(obj.images);
        console.log(images);
        var i = 0;
        var sens = 1000;
        var isFlag = false;

        $(obj.btnPrev).on('click', function () {
            self.prev();
        });

        $(obj.btnNext).on('click', function () {
            self.next();
        });

        this.prev = function () {

            if (isFlag) {
                return;
            }

            isFlag = true;

            $(images[i]).animate({
                'opacity': 0
            }, sens, function () {
                isFlag = false;
            });
            i--;

            if (i < 0) {
                i = images.length - 1;
            }
            $(images[i]).animate({
                'opacity': 1
            }, sens, function () {
                isFlag = false;
            });
        };

        this.next = function () {

            if (isFlag) {
                return;
            }

            isFlag = true;
            $(images[i]).animate({
                opacity: 0
            }, sens, function () {
                isFlag = false;
            });
            i++;

            if (i >= images.length) {
                i = 0;
            }

            $(images[i]).animate({
                opacity: 1
            }, sens, function () {
                isFlag = false;
            });
        };

        if (obj.auto) {
            setInterval(this.next.bind(this), 5000);
        }
    }


    function moveScroll(top) {
        var value = top || 0;
        coord.animate({
            scrollTop: value
        }, 400);
    }

    function btnOn(value) {

        if (coord.scrollTop() >= value) {
            return $('.btn-up').css('display', 'block');
        }
        return $('.btn-up').css('display', 'none');

    }
};