var socialPosition = $('#social-media-icons-bar').position(),
socialLeft,
socialTop;
$(window).resize(function(){
	socialPosition = $('#social-media-icons-bar').position();
	socialLeft = socialPosition.left;
	socialTop = socialPosition.top;
	console.log(socialLeft, socialTop);
});