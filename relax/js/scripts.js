$(document).ready(function() {
    $('[href="#tour"], .contact, .main_nav [href="#sheldure"]').on('click', function() {
        $('.overlay').fadeTo(1000, 0.5);
        $('.modal').css({'display': 'block', 'top': '-500px'}).animate(
            {
                'top': '0',
            }, 1500
        );
    });
});
