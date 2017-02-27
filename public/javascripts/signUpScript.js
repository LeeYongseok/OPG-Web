$(document).ready(function () {
    
    function screen_setting(){
        var full_width = $(window).width();
        var full_height = $(window).height();

        if(full_height<770){
            $('.container').height(770);
        }
        else{
            $('.container').height(full_height);
            $('.wrap').css('top',(full_height-770)/2);
        }

        $('.header>.logo>a>img').height(70).css('margin-top',5);
    }
    
    screen_setting();
    
    $( window ).resize(function() {
                screen_setting();
            });

})