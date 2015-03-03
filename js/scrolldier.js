function scrolldier() {
	var consolePrefix = "[Scrolldier API] ";
	init()

	function getOffset(pageY) {
		var h = $(window).height();
		
		if (pageY > h-400) {
			return 400;
		} else {
			return 0;
		}
		
	}
	function addIMGsrc(src, X, Y) {
		$("body").append('<img src="'+src+'" width="300" style="display: block; z-index: 99999; position: absolute; left: '+X+'px; top: '+Y+'px;" class="scrolldier_api_hover_image"  alt="Image of a scroll" />');
	}
	
	function addIMGsrcH(src, X, Y) {
		$("body").append('<img src="'+src+'" width="300" style="display: none; z-index: 99999; position: absolute; left: '+X+'px; top: '+Y+'px;" class="scrolldier_api_hover_image"  alt="Image of a scroll" />');
	}
	
	var image = $("[class*=scrolldier_api_hover_image]");
	var url_id = "http://api.scrolldier.com/view/php/api/scrollimage.php?id=";
	var url_name = "http://api.scrolldier.com/view/php/api/scrollimage.php?name=";
	var url_id_deck = "http://api.scrolldier.com/view/php/api/deckimage.php?id="
	
	$('a[href^="http://scrolldier.com/deck/"]').hover(function(e) {
	var offset = getOffset(e.pageY);
		var id = $(this).attr("href").replace(/http:\/\/scrolldier.com\/deck\/([0-9]*)/gi, "$1");
		console.log(consolePrefix+"scrolldier deck with id: " + id);
		
		var deck = $("img[src^='"+url_id_deck+id+"']");
		
		if (!$(deck).length) {
			console.log(consolePrefix+"fetching image by id: " + id);
			addIMGsrc(url_id_deck+id, 0, 0);
		}
		
		$(deck).show();
		
		$(this).mousemove(function(e) {
			$(deck).css("left", e.pageX + 10);
			$(deck).css("top", e.pageY - 160);
		});
	});
	
	$('a[href^="http://scrolldier.com/deck/"]').mouseleave(function() {
		 $("[class*=scrolldier_api_hover_image]").hide();
	});
	$('a[href*=#scrolls]').mouseleave(function() {
		 $("[class*=scrolldier_api_hover_image]").hide();
	});
	
	function init(e) {
	 
	  var total = $('a[href=#scrolls]').length;
	  console.log(consolePrefix+"scrolls found: " + total);
	}
	$('a[href^="http://scrolldier.com/deck/"]').each(function(e) {
		var offset = getOffset(e.pageY);
		var id = $(this).attr("href").replace(/http:\/\/scrolldier.com\/deck\/([0-9]*)/gi, "$1");
		console.log(consolePrefix+"scrolldier deck with id: " + id);
		
		var deck = $("img[src^='"+url_id_deck+id+"']");
		
		if (!$(deck).length) {
			console.log(consolePrefix+"fetching image by id: " + id);
			addIMGsrcH(url_id_deck+id, 0, 0);
		}
	});
	
	$('a[href*=#scrolls]').each(function(e) {
		if ($(this).attr("data-id") != undefined) {
			var text = $(this).attr("data-id");
			var scroll = $("img[src^='"+url_id+text+"']");
			
			if (!$(scroll).length) {
				console.log(consolePrefix+"fetching image by id: " + text);
				addIMGsrcH(url_id+text, 0, 0);
			}
		} else {
			var text = $(this).text();
			var scroll = $('img[src^="'+url_name+text+'"]');
			
			if (!$(scroll).length) {
				console.log(consolePrefix+"fetching image by name: " + text);
				addIMGsrcH(url_name+text, 0, 0);
			}	
		}
		
		$(scroll).hide();
	});
	 
    $('a[href*=#scrolls]').hover(function(e){
    	e.preventDefault();
    	var offset = getOffset(e.pageY);

    	if ($(this).attr("data-id") != undefined) {
    		var text = $(this).attr("data-id");
    		var scroll = $("img[src='"+url_id+text+"']");
    		
    		if (!$(scroll).length) {
    			console.log(consolePrefix+"fetching image by id: " + text);
    			addIMGsrc(url_id+text, e.pageX + 10, e.pageY - offset);
    		}
    	} else {
    		var text = $(this).text();
    		var scroll = $('img[src="'+url_name+text+'"]');
    		
    		if (!$(scroll).length) {
    			console.log(consolePrefix+"fetching image by name: " + text);
    			addIMGsrc(url_name+text, e.pageX + 10, e.pageY - offset);
    		}	
    	}
    	
    	$(scroll).show();
    	
    	$(this).mousemove(function(e) {
    		$(scroll).css("left", e.pageX + 10);
    		$(scroll).css("top", e.pageY - offset);
    	});
    }); 
    
    
    
     $('a[href*=#scrolls]').mouseleave(function() {
    	 $("[class*=scrolldier_api_hover_image]").hide();
     });
    
}