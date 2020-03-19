(function() {

	var headline,
	 	headlineText,
	 	subheadline,
	 	subheadlineText,	
	 	currentYear,
		$container = $('#container'),
	 	$yearItem = $('.yearItem'),	
	 	$yearContent1Container = $('#yearContent1Container'),
	 	$yearContent2Container = $('#yearContent2Container'),
	 	$yearHeader1 =  $('#yearContent1Container > .yearHeader1'),
	 	$yearContent1 = $('#yearContent1Container > .yearContent1'),
	 	$yearHeader2 =  $('#yearContent2Container > .yearHeader2'),
	 	$yearContent2 = $('#yearContent2Container > .yearContent2'),
		$carImg = $('#carImg'),
		$yearLabel = $('.yearLabel'),
	 	$arrowP = $('#arrowP'),
	 	$arrowN = $('#arrowN'),
	 	yearsAr = new Array(),
	 	totalYears = $("#yearNav > div").length;
		
	function init() {
		
		//
		setupJQaddress();
		
		//
		$yearLabel.each(function() {	
			yearsAr.push($(this).text());
		});				
		
		//	
		var containerTop = ($(window).height() * .5) - ($container.height() * .5) + 'px';
		$container.css({'top': containerTop});
    
    //
    //TweenMax.set($('#container'), {scale: 1.5});
	}
	
	init();
	
	// setup JQuery address
	function setupJQaddress() {
			
		$.address.init(function(event) {
			
			$.address.strict(false);		
					
			if($.address.path() == undefined || $.address.path() == '') {				
				$.address.path(yearsAr[yearsAr.length-1]); // yearsAr[0]       
			}			
			
			$.address.value($.address.path());		
		})
		
		.change(function(evt) {			
			changeHandler(evt.value);			
		});
	};
		
			
	// load year	
	function changeHandler(imgID) {		
		yearID = imgID;				
		loadYear(yearID);	
	};
		
	// year items
	$yearItem.hover(
	  function () {
			setHover($(this), true);
	  },
	  function () {			
			if($(this).attr('id').split('-')[1] == currentYear) return;
		  	setHover($(this), false);
	  }
	);
	
	$yearItem.click(function() {		
				
		var $t = $(this),
			yearID = $t.attr('id').split('-')[1];		
		
		//		
		if(yearID == currentYear) return;
				
		//
		$.address.value(yearID);		
	});
	
	// arrows
	$arrowP.hover(
		function () {setHover($(this), true)},
	  	function () {setHover($(this), false)}
	);
	
	$arrowN.hover(
	  function () {setHover($(this), true)},
	  function () {setHover($(this), false)}
	);
	
	$arrowP.click(function() {
		currentYear--;
		if(currentYear < 1961) {
			currentYear = 1961;
			return;
		};
		
		$.address.value(currentYear.toString());
	});
	
	$arrowN.click(function() {		
		currentYear++;
		if(currentYear > 2012) {
			currentYear = 2012;
			return;
		};		
		
		$.address.value(currentYear.toString());
	});
	
	function setHover(elem, flag)
	{
		var hex = flag ? 0xCC3300 : 0xFFFFFF;		
		TweenMax.to(elem, .5, {color: hex});
	};
	
	// numbers slider
	function slideDigits(yearID)
	{
		var totalNumberAr = yearID.split('');		
		for(var i = 1; i <= 4; i++) {
			TweenLite.to($('#digit' + i), 1, {backgroundPosition: '0px ' + (totalNumberAr[i - 1] * -100) + 'px', ease:Power2.easeInOut});
		};
		
		setContent(yearID);		
	};
	
	// year content
	function setContent(yearID)
	{				
		//		
		var content1Left = Number($('#year-' + yearID + ' .content-1').attr('data-left')),
		 	content1Top = $('#year-' + yearID + ' .content-1').attr('data-top'),
		 	content1Width = $('#year-' + yearID + ' .content-1').attr('data-width'),		
		 	content2Left = Number($('#year-' + yearID + ' .content-2').attr('data-left')),
		 	content2Top = $('#year-' + yearID + ' .content-2').attr('data-top') ,
		 	content2Width = $('#year-' + yearID + ' .content-2').attr('data-width');
		
		// content 1
		TweenMax.fromTo($yearContent1Container, 1, {left: content1Left, top: content1Top}, {left:  content1Left + 100, ease: Circ.easeOut});		
		TweenMax.fromTo($yearContent1, 1, {left: 0, opacity: 0}, {left: 40, opacity: 1, ease: Circ.easeOut, delay: .25});
		TweenLite.to($yearContent1Container, 1, {opacity: 1});
		$yearContent1.css({width: content1Width});		
		$yearHeader1.html($('#year-' + yearID + ' div.header1').text());
		$yearContent1.html($('#year-' + yearID + ' div.content1').text());
		
		// content 2
		TweenMax.fromTo($yearContent2Container, 1, {left: content2Left, top: content2Top}, {left: content2Left + 100, ease: Circ.easeOut, delay: .35});
		TweenMax.fromTo($yearContent2, 1, {left: 0, opacity: 0}, {left: 40, opacity: 1, ease: Circ.easeOut, delay: .45});
		TweenLite.to($yearContent2Container, 1, {opacity: 1, delay: .45});
		$yearContent2.css({width: content2Width});	
		$yearHeader2.html($('#year-' + yearID + ' div.header2').text());
		$yearContent2.html($('#year-' + yearID + ' div.content2').text());	
		
		//		
		if($('#year-' + yearID + ' .content-1').attr('data-color') == 'dark') {			
			$yearContent1.removeClass('yearContent1');
			$yearContent1.addClass('contentDark');			
		} else {			
			$yearContent1.addClass('yearContent1');	
			$yearContent1.removeClass('contentDark');			
		}
		
		if($('#year-' + yearID + ' .content-2').attr('data-color') == 'dark') {			
			$yearContent2.removeClass('yearContent1');
			$yearContent2.addClass('contentDark');			
		} else {			
			$yearContent2.addClass('yearContent1');	
			$yearContent2.removeClass('contentDark');			
		}
	}
	
	//
	function loadYear(yearID)
	{	
		//
		if(jQuery.inArray(yearID, yearsAr) == -1) {		
			yearID = yearsAr[0];
			$.address.value(yearID);	
		};
		
		//
		currentYear = yearID; 
		
		//
		var fadeSpeed = 300;
		var imgPath = 'https://www.primesync.net/img2/' + yearID + '.jpg';
		
		//
		TweenMax.to($yearItem, .5, {color: 0xFFFFFF});
		TweenMax.to($('div #year-' + yearID), .5, {color: 0xCC3300})
			
		//
		TweenMax.to([$yearContent1Container, $yearContent2Container], .25, {opacity: 0});
			
        $carImg.fadeOut(fadeSpeed, function () {
		
            var $t = $(this);
					 
            // image loaded
            $t.one('load', function () {
                
				//			
				$t.fadeIn(fadeSpeed, function () {
					fadeInDone(yearID);					
				});
				
				//		
				TweenMax.fromTo($t, 1, {scale: 1.5}, {scale: 1, ease: Circ.easeOut});
				
				//
				slideDigits(yearID);
            })
			
			.attr('src', imgPath);
        });
	};
	
	function fadeInDone(yearID)
	{
		//console.log(yearID + ' done');
	};		
})();