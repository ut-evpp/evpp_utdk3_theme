// /**
//  * @file
//  * Placeholder file for custom theme behaviors.
//  *
//  */
(function ($, Drupal, debounce) {

  /**
   * Use this behavior as a template for custom Javascript.
   */
  Drupal.behaviors.headerBehavior = {
    attach: function (context, settings) {

      // Initialize megamenu library on main menu.
      $('nav#block-accessible-main-menu').accessibleMegaMenu({
          uuidPrefix: "accessible-megamenu",
          menuClass: "nav-menu",
          topNavItemClass: "main-menu__list-item",
          panelClass: "sub-nav",
          panelGroupClass: "sub-nav-wrapper",
          hoverClass: "hover",
          focusClass: "focus",
          openClass: "open",
          openDelay: 0,
          closeDelay: 250
      });

      // Enable main menu dropdown trigger and set aria-expanded attribute.
      var menuToggler = $('#js-nav-toggle');
      var togglerTarget = $('#ut-main_menu-wrapper');
      menuToggler.on('click', function () {
        if (menuToggler.text() == 'CLOSE') {
          resetDefaults();
        }
        togglerTarget.toggleClass('active');
        togglerTarget.hasClass('active') ? menuToggler.html('CLOSE') : menuToggler.html('MENU');
        menuToggler.attr('aria-expanded', function(index, attr) { return (attr == 'false') ? 'true' : 'false'; });
      });

      // Adding column and overflowing classes to the navigation dynamically.
      $('nav#block-accessible-main-menu .sub-nav').each(function(i, el){
        var $el = $(el),
          children = $el.find('.main-menu__list-item--subnav'),
          navWidth = $el.parent().parent().width(),
          navOffsetLeft = $el.parent().parent().offset().left,
          subnavOffsetLeft = $el.offset().left,
          subnavWidth;

        // Add column classes based on number of submenu items.
        var numColumns = (children.length % 3 === 0) ? 'three-columns' : 'two-columns';
        if (children.length === 1) {
            numColumns = 'one-column';
        }
        $el.addClass(numColumns);

        // Determine subnavWidth here because it needs to be calculated after the column
        // classes have been added.
        subnavWidth = $el.children().outerWidth();
        // Insure subnavs don't open to the right of the container.
        if ((subnavWidth + subnavOffsetLeft) > (navWidth + navOffsetLeft)) {
          $el.addClass('overflowing');
        }
      });

      // Click event on L2 links on mobile menu trigger.
      var iconClick = function() {
        $('i.subnav-trigger').on('touchstart mousedown keydown', function(e) {
          if (e.type == 'mousedown' || e.type == 'touchstart' || e.keyCode == 13) {
            // Keep mousedown event from grabbing focus.
            e.preventDefault();
            $(this).toggleClass('icon--open');
            // Add border on sibling link when active.
            $(this).siblings('.main-menu__link').toggleClass('add-border');
            // Add 'open' class to subnav associated with icon.
            $(this).siblings('.sub-nav-wrapper').find('.main-menu__list--subnav').toggleClass('open');
            // Remove 'open' class from all other subnavs.
            $(this).parent('.main-menu__list-item').siblings().find('.main-menu__list--subnav').removeClass('open');
            // Remove 'icon--open' class from all other icons.
            $(this).parent('.main-menu__list-item').siblings().find('i.subnav-trigger').removeClass('icon--open');
            // Toggle aria attributes.
            $(this).siblings('.main-menu__link').attr('aria-expanded', function(index, attr) { return (attr == 'true') ? 'false' : 'true'; });
            $(this).siblings('.sub-nav-wrapper').attr('aria-hidden', function(index, attr) { return (attr == 'true') ? 'false' : 'true'; });
            $(this).siblings('.sub-nav-wrapper').attr('aria-expanded', function(index, attr) { return (attr == 'true') ? 'false' : 'true'; });
            // Reset aria attributes and styles of the clicked item's siblings.
            $(this).parent('.main-menu__list-item').siblings().find('.main-menu__link').removeClass('add-border');
            $(this).parent('.main-menu__list-item').siblings().find('.sub-nav-wrapper').attr('aria-expanded', 'false').attr('aria-hidden', 'true');
            $(this).parent('.main-menu__list-item').siblings().find('.main-menu__link').attr('aria-expanded', 'false');
          }
        });
      }

      // Reset aria attributes and remove dynamic classes from main menu list items.
      var resetDefaults = function() {
        $('.main-menu__link').removeClass('add-border');
        $('ul.main-menu__list.nav-menu .sub-nav-wrapper').removeClass('open hover focus').attr('aria-expanded', 'false').attr('aria-hidden', 'true');
        $('ul.main-menu__list.nav-menu .main-menu__link').removeClass('open').attr('aria-expanded', 'false');
        $('ul.main-menu__list.nav-menu .main-menu__list--subnav').removeClass('open');
        $('i.subnav-trigger').removeClass('icon--open');
      }

      $('.main-menu__link').on('mousedown touchstart', function (event) {
        // When href does not exist on the element, prevent the default behavior
        // of "focus on mousedown" from occurring. This is neccessary when
        // no-link behavior causes Drupal to output a <span> instead of a <a>.
        if ($(this).attr('href') === undefined) {
            event.preventDefault();
          }
        // When href does exist, add back the "go to href" behavior that has
        // been removed elsewhere in the accessibleMegaMenu.js library.
        else {
          window.location.href = $(this).attr('href');
        }
      });

      var resizeEvent = debounce(function() {
        // Reset to defaults
        $('#js-nav-toggle').html('MENU').attr('aria-expanded', 'false');
        $('#ut-main_menu-wrapper').removeClass('active');
        resetDefaults();
        // Attach click event to chevron on mobile.
        if (window.innerWidth < 1200) {
          // Add click handler to mobile nav chevron.
          iconClick();
          // Remove mouseover and touchstart event from main menu.
          $('.main-menu__list').off('mouseover touchstart');
        }
        // Disable click event on chevron on desktop.
        else {
          $("i.subnav-trigger").off("click");
        }
      }, 100);
      $(window).on('load resize', resizeEvent);

    }
  };

  /**
   * Add custom functionality to make mobile menu a11y friendly.
   */
  Drupal.behaviors.utexasAccessibleMobileMenu = {
    attach: function (context, settings) {
      var closeMenu = function() {
        // 1. Remove the active class from the menu wrapper to close it.
        $("#ut-main_menu-wrapper").removeClass("active");
        // 2. Set button attributes back to their defaulr values.
        $(".ut-btn--toggle").attr("aria-expanded", "false");
        $(".ut-btn--toggle").text("MENU");
        // 3. Set focus to the mobile menu button.
        $(".ut-btn--toggle").focus();
      }
      // When a key is pressed.
      $(document).on('keydown', function (event) {
        // If it is the Esc key, and mobile menu is open, close it.
        if (event.key === "Escape" && $("#ut-main_menu-wrapper").hasClass("active")) {
          closeMenu();
        }
      });
      // If children of mobile menu loses focus.
      $("#ut-main_menu-wrapper").children().focusout(function (e) {
        // Grab all parents and get their IDs.
        var parentIds = $(e.relatedTarget).parents().map(function() {
          return this.id;
        }).get().join();
        // If none of the parent has the menu wrapper ID, close the menu.
        if (parentIds.indexOf("ut-main_menu-wrapper") === -1) {
          closeMenu();
        }
      });
    }
  };

})(jQuery, Drupal, Drupal.debounce);
