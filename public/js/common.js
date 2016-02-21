$(document).ready(function() {

	function heightDetect() {
		$(".content").css("height", $(window).height());
		$(".video-container").css("height", $(window).height());
		$(".navigation").css("height", $(window).height());
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

	$(".navigation").hover(function(){
		$(".icons").css("opacity", "1");
		$(".name").css("opacity", "1");
	}, function(){
		$(".icons").css("opacity", "0");
		$(".name").css("opacity", "0");
	});

    $(".navigation .popup-open").hover(function(){
       clearInterval(animation);
        animate_hover_logo_dection(this,true);
    },function(){
        clearInterval(animation);
        animate_hover_logo_dection(this,false);
        ;
    });

    var animation;
    var imgHeight = 36;
    var numImgs = 7;
    var cont = 0;
    function animate_hover_logo_dection(obj,dir){
        

        if(dir){
            animation = setInterval(function(){
                var position =  -1 * (cont*imgHeight);
                $(obj).find('.logo img').css('margin-top', position);
                cont++;
                if(cont == numImgs){
                    cont = 0;
                    position = 0;
                }
                if(cont > numImgs){
                	cont = 0;
                	$(obj).find('.logo img').css('margin-top', 0);
                }
                if(cont < 0){
                	cont = 0;
                	$(obj).find('.logo img').css('margin-top', 0);
                }
            },50);
        } else {
            animation = setInterval(function(){
                var position =  -1 * (cont*imgHeight) + imgHeight;
                $(obj).find('.logo img').css('margin-top', position);
                cont--;
                if(cont == 0){
                    clearInterval(animation);
                    position = 0;
                }
                if(cont > numImgs){
                	cont = 0;
                	$(obj).find('.logo img').css('margin-top', 0);
                }
                if(cont < 0){
                	cont = 0;
                	$(obj).find('.logo img').css('margin-top', 0);
                }
            },50);
        }
    }

	$(".popup-open").click(function(){
		$(".popup").css("opacity", "1");
		$(".popup").css("z-index", "10");
		$(".logo").css("opacity", "0");
	});
	$(".left-line a").click(function(){
		$(".popup").css("opacity", "0");
		$(".logo").css("opacity", "1");
		$(".popup").css("z-index", "1");
	});
	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				
				$("#form").trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
