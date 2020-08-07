$(document).ready(function() {
    $('[href="#tour"], .contact, .main_nav [href="#sheldure"]').on('click', function() {
        // $('.overlay').fadeTo(1000, 0.5);
        $('.overlay').fadeToggle(1000);
        $('.modal').css({'display': 'block', 'top': '-500px'}).animate(
            {
                'top': '0',
            }, 1500
        );
    });

    $('.modal .close').on('click', function() {
        $('.overlay').fadeToggle(1000);
        $('.modal').animate(
            {
                'top': '-500px',
            }, 1500
        );
    });
});
