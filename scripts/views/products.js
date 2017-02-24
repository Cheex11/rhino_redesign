var ajaxCart = (function($) {
  $(document).ready(function() {
    var product = Shopify.current_product;
      if (!product) { return; }

    // Video Controls
    function playPause(block) {
      video = $(block).find('.flex-video')
      video_dom = $(block).find('.flex-video').get(0)

      video.css("display","block");
      block.find('.rhino-block-content').fadeOut( "slow", function() { });
      video_dom.play();
    }

    function playPauseInner(block) {
      video = $(block).find('.inner-video')
      video_dom = $(block).find('.inner-video').get(0)
      video_dom.play();
      // if (video_dom.paused) {
      //   video_dom.play();
      // } else {
      //   video_dom.pause();
      // }
    }

    $('.play-button').click(function(event) {
      block = $(this).closest('.rhino-block');
      playPause(block);
    });

    $('.play-button-inner').click(function(event) {
      block = $(this).closest('.rhino-block');
      playPauseInner(block);
      $(this).css("display","none");
    })

    $('.flex-video').click(function(event) {
      this.pause();
      $(this).closest('.rhino-block').find('.rhino-block-content').fadeIn( "slow", function() { });
      video.css("display","none");
    });

    $('.inner-video').click(function(event) {
      this.pause();
      $(this).closest('.rhino-block').find('.play-button-inner').fadeIn( "slow", function() { });
    });

    // Scrolling Header
    $('.ph-menu-item').click(function(event) {
      event.preventDefault();

      // What is the index of the item clicked?
      this_index = $('.ph-menu-item').index(this)

      // Colors duplicates the header, so ther are two copies of each .ph-menu-item.
      // To compensate, we must perform the following if statement.
      if (this_index >= ($('.ph-menu-item').length / 2) ) {
        menuLength = $('.ph-menu-item').length
        this_index = this_index - ( menuLength / 2);
      }

      target = $('.rhino-block')[this_index]

      $('html, body').animate({
          scrollTop: $(target).offset().top - 85
      }, 500);
    });

    var sections = $('.rhino-block');

    function find_break_points() {
      var elmOffsets = {};
      for (var i = 0, j = sections.length; i < j; ++i) {
        var offset = sections[i].offsetTop + sections[i].clientHeight;
        elmOffsets[offset] = sections[i];
      }
      return elmOffsets
    }

    var value;
    var elmOffsets = find_break_points();
    var sorted_keys = _.keys(elmOffsets).sort();
    var menuSections = $('.ph-menu-item');
    var menuLength = menuSections.length

    // Because the Colors Theme copies the menu, two rows of menuSections will be made.
    // Adding (length / 2) to the array index we target in the loop will make sure we target the second row.
    $(window).resize(function() {
      elmOffsets = find_break_points();
      sorted_keys = _.keys(elmOffsets).sort();
    });

    $(document).on('scroll', function(){
      // Increase to push break farther from top of element
      //110 delayed the switch when scrolling, 150 made it better
      pixels_above_element = 100;
      value = $(window).scrollTop();
      minOffset = _.keys(elmOffsets).reduceRight(function(prev,current){
      return value < current - pixels_above_element ? current : prev;
      });

      $('.ph-flex').find('.active').removeClass('active');

      // Find where to start the "make active" function
      if (value >= sorted_keys[0] - $(sections[0]).height() - 240   ) {
        $(menuSections[sorted_keys.indexOf(minOffset) + (menuLength / 2) ]).addClass("active");
      }
    });
  })
}(jQuery));
