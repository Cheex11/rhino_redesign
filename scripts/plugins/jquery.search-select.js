(function($) {

  console.log('inside search select.');

  $.fn.searchSelect = function(options) {
    // Some basic options
    var settings = $.extend({
      data: []
    }, options);

    this.each(function() {
      var self = $(this),
          placeholder = self.attr('placeholder');

      var $searchWrap = $('<div/>').addClass('search-select-wrap'),
          $activeItem = $('<div/>').addClass('active-item'),
          $selected   = $('<span/>').addClass('name').text(value()),
          $dropdown   = $('<div/>').addClass('search-dropdown'),
          $search     = $('<input/>').attr('type','search')
                                     .attr('placeholder', placeholder),
          $results    = $('<div/>').addClass('results')

      // Returns the value of the current selection
      function value() {
        return self.find('option:selected').text();
      }

      // Search through our data
      function search(q) {
        return _.filter(settings.data, function(item) {
          var _q = q.toLowerCase();

          return item.name.toLowerCase().search(_q) > -1;
        });
      }

      function resetResults() {
        $results.empty();

        // self.find('option').each(function() {
        //   var result = {
        //     value: $(this).val(),
        //     label: $(this).text(),
        //     name: $(this).text()
        //   }
        //
        //   addResult(result);
        // });
      }

      function addResult(result) {
        var $result = $('<span/>').addClass('result')
                                  .attr('data-value', result.value)
                                  .attr('data-label', result.label)
                                  .text(result.name);

        $results.append($result);
      }

      function openMenu() {
        $dropdown.addClass('active');
        $activeItem.addClass('opened');

        $search.focus();
      }

      function closeMenu() {
        $dropdown.removeClass('active');
        $activeItem.removeClass('opened');

        if ($search.val() == "") {
          resetResults();
        }
      }

      // Bind event handlers
      function bindHandlers() {
        // Click opens menu
        $activeItem.click(function() {
          if ($dropdown.hasClass('active')) {
            closeMenu();
          } else {
            openMenu();
          }
        });

        // Document click closes the menu
        $(document).click(function(event) {
          if (!$(event.target).closest('.search-select-wrap').length) {
            closeMenu();
          }
        });

        // Typing searches
        $search.on('keyup', function(e) {
          // clear the results
          $results.empty();

          if ($(this).val() == "") {
            resetResults();
          } else {
            var results = search($(this).val());

            _.each(results, function(result) {
              addResult(result)
            });
          }
        });

        // When a result is clicked, update the selection
        $dropdown.on('click', '.result', function() {
          self.val($(this).data('value')).change();
          $selected.text($(this).data('label'));

          $(this).closest('.bundle-item').removeClass('invalid');

          closeMenu();
        });
      }

      // Genreates markup
      function generate() {
        var $arrow = $('<span/>').addClass('icon-ui-bundle-dropdown');

        $activeItem.appendTo($searchWrap)
                   .append($selected)
                   .append($arrow);

        $dropdown.append($search).append($results);
        $searchWrap.append($activeItem).append($dropdown);

        // Append after select box
        self.before($searchWrap);

        bindHandlers();
      }

      generate();
    });
  }
})(jQuery);
