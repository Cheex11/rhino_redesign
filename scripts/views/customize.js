var customize = (function($) {
  $(document).ready(function() {
    if (Shopify.template.indexOf('customize') < 0) { console.log('returning'); return; }

    // Camera Finder
    function getVariantId(name, $select) {
      var $selection = $select.find('option').filter(function() {
        return $(this).text() == name;
      });

      return $selection.val();
    }

    Colors.CameraFinder.data(function(data) {
      $('.cable-select').each(function() {
        var $select = $(this);

        var mappedData = _.map(data, function(row) {
          var value = getVariantId(row.gsx$cable.$t, $select);

          return {
            value: value,
            name: row.gsx$camera.$t,
            label: row.gsx$cable.$t
          };
        });

        $(this).searchSelect({
          data: mappedData
        });
      });
    });

    // other
    var visual_top = $('#visual-container').css('top');

    var activate = function(element)  {
      if ( $(element).hasClass('variant') ) {
        $(element).siblings().removeClass('active');
      };

      $(element).addClass('active');
    }

    $( ".option" ).click(function() {
      console.log('an option was clicked.');
      activate(this);
    });

    $(document).on('scroll', function(){
      var $productWindow = $('#customize-container');
      var $visualContainer = $('#visual-container')

      var gutterHeight = $('#gutter').height();
      var gutterPosition = $("#gutter").offset().top;
      var gutterFull = gutterHeight + gutterPosition;

      var visualHeight = $visualContainer.outerHeight(true);
      var visualPosition = $("#visual-container").offset().top;
      var visualFull = visualHeight + visualPosition;

      var windowHeight = $(window).height();
      var scrollPosition = window.scrollY;

      // console.log(scrollPosition);
      // console.log($productWindow.outerHeight(true));

      var footerHeight = $('#customize-footer').height();

      // console.log($("#visual-container").$productWindow.outerHeight()-$("#visual-container").$viewPlaceholder.outerHeight())

      if (visualFull  > gutterFull - footerHeight ) {
        // console.log('it happned.');
        newHeight = gutterHeight - visualHeight - footerHeight;
        $('#visual-container').css('position', 'absolute');
        $('#visual-container').css('top', newHeight + 'px');
      } else {
        $('#visual-container').css('fixed', 'absolute');
        $('#visual-container').css('top', visual_top);
      }

      if (scrollPosition + windowHeight > gutterFull) {
        $("#customize-footer").addClass('attach');
      } else {
        $("#customize-footer").removeClass('attach');
      }
    });
  })
}(jQuery));
