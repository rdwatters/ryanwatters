$(document).ready(function() {
    console.log("This is showing up.");
    var mobileOS = true;
    //Regex to test user device            
    if (navigator.userAgent.match(/iphone/gi) || navigator.userAgent.match(/ipad/gi) || navigator.userAgent.match(/android/gi)) {
        mobileOS = true;
    } else {
        mobileOS = false;
    }
    var hasContainer = $('.js-paginate').length > 0;
    if (!mobileOS && hasContainer) {
        $('.pagination').hide();
    }
    //Check if there is no paginate container OR if user is accessing via mobile OS.
    if (!hasContainer || mobileOS) {
        //If on mobile, show pagination buttons and return the function to prevent infinite-scroll
        $('.pagination').show().attr('aria-hidden', false);
        $(window).unbind('scroll');
        return;
    }
    //Basic wh pagination
    var nextPage = $('.js-paginate').attr('data-next-page');
    var maxPage = $('.js-paginate').attr('data-max-page');
    var removeFirst = $('.js-paginate').attr('data-remove-first');
    if (maxPage === window.location.pathname) {
        return;
    }
    var finishedLoading = false;
    var loading = false;
    $(window).scroll(function() {
        if (loading || finishedLoading) {
            return;
        }

        var container = $('.js-paginate');
        var bottomOfContainer = container.position().top + container.outerHeight(true);
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if (scrollBottom > bottomOfContainer) {
            loading = true;
            $('#spinner').show();

            $.ajax({
                url: nextPage,
                success: function(html) {
                    if (html) {
                        var targetHtml = $(html).find('.js-paginate');

                        if (nextPage === maxPage) {
                            finishedLoading = true;
                        }

                        nextPage = targetHtml.attr('data-next-page');

                        if (nextPage) {
                            if (removeFirst)
                                targetHtml.find('li').first().remove();

                            $(".js-paginate").append(targetHtml.html());
                        } else {
                            finishedLoading = true;
                        }

                        $('#spinner').hide();
                    } else {
                        finishedLoading = true;
                        $('#spinner').hide();
                    }

                    loading = false;
                }
            });
        }
    });
});