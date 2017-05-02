
var menuDisabled = false;

jQuery(function($) {
    
    $(window).load(function() { // 确保整个站点被加载
            $('#status').fadeOut(); // will first fade out the loading animation
            $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
            $('#main-wrapper').delay(350).css({'overflow':'visible'});
    });
    
    $(document).ready( function() {


        
        
        // backstretch for background image
        var defaultImgSrc = $('img.main-img').attr('src');
        $.backstretch(defaultImgSrc, {speed: 500});
    
    // for responsive-menu
    $("#m-btn").click(function(){
        $("#responsive").toggle();
    });

    //图片轮播
   var timejg=3000;//轮播间隔时间
        var size = $('.box_img ul li').size();
        for(var i=1;i<=size;i++){
            $('.box_tab').append('<a href="javascript:(void)">'+i+'</a>')
        }

        $('.box_img ul li').eq(0).show();
        $('.box_tab a').eq(0).addClass('active')
        $('.box_tab a').mouseover(function(){
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            i=index;
            $('.box_img ul li').eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
        });

        var i = 0;
        var time = setInterval(move,timejg);

        function move(){
            i++;
            if(i==size){
                i=0;
            }

            $('.box_tab a').eq(i).addClass('active').siblings().removeClass('active');
            $('.box_img ul li').eq(i).fadeIn(300).siblings().fadeOut(300);
        }

        $('.box').hover(function(){
            clearInterval(time);
        },function(){
            time = setInterval(move,timejg);
        });
    
        // copy menu list to responsive menu
        var mainMenuList = $('#menu-list').html();
        $('#responsive').html(mainMenuList);
    
    //for image slide on menu item click(normal) and responsive
    $("#menu-list a, #responsive a").on('click',function(e){
            
            
            if(this.className == "external") {
                return;
            }
            
            e.preventDefault();

            if (menuDisabled == false) // check the menu has disabled?
            {
                menuDisabled = true; // disable to menu
                
                var name = $(this).attr('href');
                $('#menu-list li').removeClass('active');
                $('#responsive li').removeClass('active');

                //  set active to both menu
                var menuClass = $(this).parent('li').attr('class');
                $('.'+menuClass).addClass('active');

                // hide responsive menu
                $("#responsive").hide();
                
                // get image url and assign to backstretch for background
                var imgSrc = $("img"+name+"-img").attr('src');
                $.backstretch(imgSrc, {speed: 500}); //backstretch for background fade in/out
                
                // content slide in/out
                $("section.active").animate({left:$("section.active").outerWidth()}, 400,function(){
                    $(this).removeClass("active");
                    $(this).hide();
                    $(name+"-text").show();
                    $(name+"-text").animate({left:'0px'},400,function(){
                        $(this).addClass("active");
                        
                        
                        $.backstretch("resize"); // resize the background image
                        
                        menuDisabled = false; // enable the menu
                    });
                });
                
            }
            return;
    });
        
    });

});

 