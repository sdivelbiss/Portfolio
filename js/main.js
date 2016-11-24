(function($){



document.getElementById("launch").addEventListener("keypress", enterKey);

function enterKey (e) {
	if(e.keyCode == 13) {
		 getInfo();
			}
} false;

function getInfo(){
		window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 5);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
}


// // //<div class="first"><button type="button" onclick="smoothScroll(document.getElementById('about'))">Click Me!</button></div>
// // //<div class="about" id="second">Hi</div>
// function getInfo(){
// 		var launch = document.getElementById("launch").value.toLowerCase();
// 		for (i = 0; i < launchArray.length; i++) 
// 			if (launch == launchArray[i].answer) {
			
			
// window.smoothScroll = function(target) {
//     var scrollContainer = target;
//     do { //find scroll container
//         scrollContainer = scrollContainer.parentNode;
//         if (!scrollContainer) return;
//         scrollContainer.scrollTop += 1;
//     } while (scrollContainer.scrollTop == 0);
    
//     var targetY = 0;
//     do { //find the top of target relatively to the container
//         if (target == scrollContainer) break;
//         targetY += target.offsetTop;
//     } while (target = target.offsetParent);
    
//     scroll = function(c, a, b, i) {
//         i++; if (i > 30) return;
//         c.scrollTop = a + (b - a) / 30 * i;
//         setTimeout(function(){ scroll(c, a, b, i); }, 5);
//     }
//     // start scrolling
//     scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);

// }



	var body = $("body"),
	skill_bar_width,
	 
	scrollEvent = {
		
		displays: $(".display_js"),
		last_display: null,
		height_header: $(".fixed-panel").outerHeight(),
	
		init: function(){
			
			var display_active = scrollEvent.getActiveDisplay();
			
			scrollEvent.setBodyId(display_active);
			scrollEvent.initAnimationDisplay(display_active);
			
			$(document).on("scroll", function(){
			
				scrollEvent.setActiveDisplay();
				
			});
			
			$(".init-scroll_js").on("click", function(event){
			
				event.preventDefault();
				scrollEvent.scroll($(this));
				
			});
			
			scrollEvent.last_display = scrollEvent.displays.last();
			scrollEvent.last_display.prev().addClass("display-prev-last_js");
		},
		
		getActiveDisplay: function(){
		
			var window_top = $(window).scrollTop(),
			offsetTop, display_active, cache;
			
			display_active = scrollEvent.displays.filter(function(index, element){
			
				cache = $(element);
				offsetTop = cache.offset().top - scrollEvent.height_header;
				return window_top >= offsetTop && window_top < offsetTop + cache.outerHeight();
				
			});
			
			return display_active;
		},

		setActiveDisplay: function(){
			
			var window_top = $(window).scrollTop(),
			display_active = scrollEvent.getActiveDisplay();
				
			if(!display_active.hasClass("display_active")){	
			
				scrollEvent.initAnimationDisplay(display_active);
				scrollEvent.setBodyId(display_active);
				display_active.addClass("display_active").siblings(".display_js").removeClass("display_active");
				$("[data-scroll-nav=" + scrollEvent.displays.index(display_active) + "]").addClass("nav__link_active").siblings().removeClass("nav__link_active");
			
			}
			
			if(!scrollEvent.last_display.hasClass("active_container") && display_active.hasClass("display-prev-last_js") && window_top > display_active.offset().top + display_active.outerHeight() / 2){

				scrollEvent.initAnimationDisplay(scrollEvent.last_display);
					
			}				
		},
		
		setBodyId: function(display_active){
		
			body.attr("id", display_active.attr("id") + "_active");	
		
		},
		
		initAnimationDisplay: function(display_active){
		
			if(!display_active.hasClass("active_container")){

				$(this).magicLayout({
					
					container: display_active
					
				});
				
			}
			
		},
		
		scroll: function(element){

			var	display_active = $('#' + element.attr("data-id-section")); 

			$("html, body").animate({scrollTop: display_active.offset().top - scrollEvent.height_header}, 1200);
			body.removeClass("nav-panel_active");
			scrollEvent.setBodyId(display_active);

			setTimeout(function(){
				
				scrollEvent.initAnimationDisplay(display_active);
				
			}, 1100);
			
		}
		
	}; 
	 
	scrollEvent.init();
	
	body.addClass("load-page");
	$(".prelodader-animation_js").hide();
	
	$(".skill-bar_js").map(function(){
		
		skill_bar_width = $(this).attr("data-skill-bar-width");
		// $(this).width(skill_bar_width).find(".skill__value_js").text(skill_bar_width);

	});
	
	$(".mobile-menu-open_js").on("click", function(){
		
		body.addClass("nav-panel_active");
		
	});
	
	$(".mobile-menu-close_js").on("click", function(){
		
		body.removeClass("nav-panel_active");
		
	});
	
	$(".open-popup_js").on("click", function(event){
		
		event.preventDefault();
		
		$(this).LayerPopup({
			
			container: $("#" + $(this).attr("data-id"))
			
		});
		
	});
	
	$(".popup__close_js").on("click", function(){
		
		var active_popup = $(this).parents(".lrmw_active_popup");
		$(this).LayerPopup("closePopup", active_popup, true);
		
	});

	setTimeout(function(){
		
		$(".preloader_js").hide();
		
	}, 1000);
	
})(window.jQuery);
