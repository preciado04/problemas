/**
 * @file
 * This is scripts.js file.
 */

(function ($) {
  'use strict';

  /**
   * Shows largest substring size, on submit event.
   */
  $(document).on('submit', 'form#largest-substring-size', function (e) {
    e.preventDefault();

    // Get largest substring size.
    const string = $('input#string').val();
    const largestSubstringSize = getLargestSubstringSize(string);
    // Show cool popup.
    const title = 'Substring más largo';
    const body = 'El substring más largo es: <strong>' + largestSubstringSize + '</strong>.';
    coolPopup(title, body);
  });

  /**
   * Closes cool popup, on click event.
   */
  $(document).on('click', 'a.continue', function (e) {
    e.preventDefault();

    closeCoolPopup();
  });

  /**
   * Gets the largest substring size.
   */
  function getLargestSubstringSize(string) {
    const array = string.split('');
    let elements = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (!elements.includes(element)) {
        elements.push(element);
      }
    }

    return elements.join('');
  }

  /**
   * Shows cool popup.
   */
  function coolPopup(title, body) {
    $('.cool-popup .title').append('<div class="inner">' + title + '</div>');
    $('.cool-popup .body').append('<div class="inner">' + body + '</div>');
    $('body').addClass('cool-popup-on');
  }

  /**
   * Closes cool popup.
   */
  function closeCoolPopup() {
     $('.cool-popup .title .inner').remove();
    $('.cool-popup .body .inner').remove();
    $('body').removeClass('cool-popup-on');
  }

})(jQuery);