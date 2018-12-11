$('snippet pre').on('click', function () {
    $(this).css({
        'max-height': '100%',
        'overflow-y': 'hidden'
    });
});

$('#m1 menu-item').on('click', function () {
    let activeItem = $(this).find('a').attr('href');
    $('#m1 menu-item').removeClass('is-active');
    $('.menu_content').removeClass('visible');
    $(this).addClass('is-active');
    $(activeItem).addClass('visible');
});

$('#show-password').on('click', function () {
    let input = <string>$(this).siblings('input').prop('type');
    let e = $(this).siblings('input');
    if (input === 'text') {
        e.prop('type', 'password');
    } else if (input === 'password') {
        e.prop('type', 'text');
    }
});

$('#mostrar-side-menu').on('click', function () {
    $('sidebar').css({
        'left': '0',
        'background-color': 'rgba(0,0,0, .8)',
    });
    $('#menu-close').css({
        'left': '0',
        'width': '100%',
    });

    $('#menu-close').on('click', (function () {
        $('#menu-principal').css({
            'left': '-150%',
            'background-color': 'rgba(0,0,0, .8)',
        });
        $('#menu-close').css({
            'left': '-150%',
            'width': '0',
        });
    }));
});

$('#toggle-size-tabs').on('click', 'button', function () {
    if ($(this).index() === 0) {
        $('#tabs5').addClass('is-small').removeClass('is-medium is-large');
    } else if ($(this).index() === 1) {
        $('#tabs5').addClass('is-medium').removeClass('is-small is-large');
    } else if ($(this).index() === 2) {
        $('#tabs5').addClass('is-large').removeClass('is-medium is-small');
    } else {
        $('#tabs5').removeClass('is-medium is-small is-large');
    }
});

$('#toggle-align-tabs').on('click', 'button', function () {
    if ($(this).index() === 0) {
        $('#tabs6').removeClass('is-right is-center is-fluid');
    } else if ($(this).index() === 1) {
        $('#tabs6').addClass('is-right').removeClass('is-center is-fluid');
    } else if ($(this).index() === 2) {
        $('#tabs6').addClass('is-center').removeClass('is-right is-fluid');
    } else {
        $('#tabs6').addClass('is-fluid').removeClass('is-center is-right');
    }
});

(function (d: Document, s: string, id: string) {
    let fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    let js = <HTMLScriptElement>d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.12';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
