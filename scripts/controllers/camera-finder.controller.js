(function($, CameraFinder) {

  console.log('in the camera finder controller.');

  $(function() {
    var ui = {
      help: $('.camera-finder-button').addClass('loaded'),
      finder: $('.camera-finder'),
      term: $('#camera-term'),
      results: $('.camera-results'),
      variant: $('#product-variant'),
      picker: $('#cable-picker')
    };
    
    // Don't do anything if there's not the right elements
    if (!ui.finder.length) {
      console.log('no camera finder!')
      return false;
    }

    if (!ui.picker.length) {
      ui.picker = ui.variant;
    }

    function search() {
      ui.results.empty();

      if (ui.term.val().trim()) {
        CameraFinder.search(ui.term.val().trim(), function(results) {
          if (results.length) {
            _.each(results, function(result) {
              var cable = result.gsx$cable.$t;
              $('<li/>').text(result.gsx$camera.$t).attr('data-cable', cable).appendTo(ui.results);
            });
          } else {
            $('<li/>').text("No results found").appendTo(ui.results);
          }
        });
      } else {
        $('<li/>').text(ui.results.attr('title')).appendTo(ui.results);
      }
    }

    function hideMenu() {
      ui.finder.removeClass('active');
      ui.picker.removeClass('hidden');
    }

    function showMenu() {
      ui.finder.addClass('active');
      ui.picker.addClass('hidden');
      ui.term.select();
    }

    search();

    ui.term.keyup(search);

    ui.help.click(function() {
      if (ui.finder.hasClass('active')) {
        hideMenu();
      } else {
        showMenu();
      }

    });

    ui.results.on('click', 'li', function() {
      var self = $(this);
      var cable = self.attr('data-cable');
      if (cable) {
        ui.picker.children().prop('selected', false).each(function() {
          if (cable.toLowerCase() == $(this).text().toLowerCase()) {
            $(this).prop('selected', true);
          }
        });

        hideMenu();
      }
    });

  });
})(jQuery, Colors.CameraFinder);
