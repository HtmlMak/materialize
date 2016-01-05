var app = {
    wrapper : $('#app'),
    document: $(document.body),

    state: {}
};

function resizeAside() {
    var asideResizer = $('#aside-slider'),
        aside = $('#aside'),
        moveAt = function (pageX) {
            if (app.state.asideResize) {
                aside.css({
                    width: pageX
                });
            }
        },
        getSize = function (size) {
            var scope = {
                    min: 200,
                    max: 394
                },
                result = size;

            if (size > scope.max) {
                result = scope.max
            } else if (size < scope.min) {
                result = scope.min
            }

            return result;
        },
        init = function () {
            try {
                var asideSize = Number(Cookies.get('asideSize'));
                if (asideSize !== NaN) {
                    moveAt(asideSize);
                }
            } catch (err) {

            }

            $(window).on('dragstart drag dragdrop', function () {
                return false;
            })
        };

    asideResizer.on('mousedown', function (e) {
        asideResizer.addClass('state-drag');
        app.state.asideResize = true;
        app.document.on('mousemove', function (e) {
            moveAt(e.pageX);
            $(window).trigger('resize');
        });

        $(window).on('mouseup', function (e) {
            app.document.off('mousemove mouseup');
            app.state.asideResize = false;
            Cookies.set('asideSize', getSize(e.pageX), {expires: 999, path: '/'});
            asideResizer.removeClass('state-drag')
        });
    });

    asideResizer.add(asideResizer.closest('.aside-slider')).on('dragstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    init();
}

(function ($) {
    $(document).ready(function () {
        resizeAside();

        $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15
        });
    });
}(jQuery));
