/**
 * @file
 * This is scripts.js file.
 */

(function ($) {
  'use strict';

  /**
   * Initializes needed stuff, on ready event.
   */
  $(document).ready(function() {
    init();
  });

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
   * Adds number element, on click event.
   */
  $(document).on('click', 'a.add-number', function (e) {
    e.preventDefault();
    const btn = $(this);
    addNumber(btn);
  });

  /**
   * Removes number element, on click event.
   */
  $(document).on('click', 'a.remove-number', function (e) {
    e.preventDefault();

    const numbers = $('.form-group .number').length;
    if (numbers === 1) {
      return false;
    }

    const btn = $(this);
    removeNumber(btn);
  });

  /**
   * Shows two positions, on submit event.
   */
  $(document).on('submit', 'form#objective-number-form', function (e) {
    e.preventDefault();

    // Show cool popup.
    const form = $(this);
    const objectiveNumber = parseInt($('input#objective-number').val(), 10);
    const list = objectiveNumberGetList(form);
    const title = 'Dos posiciones';
    const body = objectiveNumberGetTwoPositions(objectiveNumber, list);
    coolPopup(title, body);
  });

  /**
   * Initializes needed stuff.
   */
  function init() {
    // Init number dropdown.
    $('select.number-dropdown').select2({
      width: '100%'
    });
    // Init value on number local storage variable.
    setLocalStorageItem('number', 1);
  }

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

  /**
   * Adds number element.
   */
  function addNumber(btn) {
    // Get number markup.
    const numberMarkup = getElementMarkup(getLN(), $('.form-group .number'));
    // Add number element.
    $(btn).closest('.form-group').find('.number-wrapper').append(numberMarkup);
    // Get last number object.
    const lastNumberObj = $('.number-wrapper .number:last-child');
    // Remove unused select2 container.
    $(lastNumberObj).find('span.select2-container').remove();
    // Initialize number dropdown.
    $('select.number-dropdown').select2({
      width: '100%'
    });
    // Update number dropdown based on new number.
    const lastNumber = parseInt(getLocalStorageItem('number', 1), 10);
    const newNumber = lastNumber + 1;
    $(lastNumberObj).find('select.number-dropdown').val(newNumber).change();
    // Update number local storage variable.
    setLocalStorageItem('number', newNumber);
  }

  /**
   * Removes number element.
   */
  function removeNumber(btn) {
    // Remove number element.
    $(btn).closest('.number').remove();
    // Update number local storage variable.
    const lastNumber = parseInt(getLocalStorageItem('number', 1), 10);
    const newNumber = lastNumber - 1;
    setLocalStorageItem('number', newNumber);
  }

  /**
   * Gets element markup.
   */
  function getElementMarkup(line, element) {
    var element_markup = '';

    try {
      element_markup = $(element)[0].outerHTML;
    } catch (error) {
      var key = '(' + line + '): error';
      console.log({[key]: error });
    }

    return element_markup;
  }

  /**
   * Returns line number of the currently executing code.
   */
  function getLN() {
    var e = new Error();
    e = e.stack.split('\n')[2].split(':');
    e.pop();

    return e.pop();
  }

  /**
   * Sets or updates a local storage item.
   */
  function setLocalStorageItem(key, value) {
    // Add sunset prefix.
    key = 'problemas_' + key;
    // Check key and value.
    if (!key || value === undefined || value === null || value.length === 0) {
      return false
    }

    // Check if value is an object.
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  }

  /**
   * Gets local storage item by key.
   */
  function getLocalStorageItem(key) {
    // Add sunset prefix.
    key = 'problemas_' + key;
    // Set value based on key.
    var value = localStorage.getItem(key);

    // Check value.
    if (value === undefined || value === null || value.length === 0) {
      return false
    }

    // Assume it is an object or an array that has been stringified.
    if (value[0] === "{" || value[0] === "[") {
      value = JSON.parse(value);
    }

    return value;
  }

  /**
   * Gets list
   */
  function objectiveNumberGetList(form) {
    const numbers = [];
    $(form).find('.number-wrapper .number').each(function () {
      let number = $(this).find('span.select2-selection__rendered').text();
      number = parseInt(number, 10);
      numbers.push(number);
    });

    return numbers;
  }

  /**
   * Gets the two positions of a list that sum objective number.
   */
  function objectiveNumberGetTwoPositions(objectiveNumber, list) {
    let message = '';
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      for (let innerIndex = 0; innerIndex < list.length; innerIndex++) {
        const innerElement = list[innerIndex];
        if (element !== innerElement) {
          const sum = element + innerElement;
          if (sum === objectiveNumber) {
            message += 'El número objetivo es: ';
            message += '<strong>' + objectiveNumber + '</strong>. <br>';
            message += 'La lista es: <strong>' + list.join(', ') + '</strong>. <br>';
            message += 'Las dos posiciones de la lista que suman el numero objetivo ';
            message += 'son: <strong>' + index + '</strong> y ';
            message += '<strong>' + innerIndex + '</strong>. ';
            message += 'Los dos números de la lista que suman el numero objetivo ';
            message += 'son: <strong>' + element + '</strong> y ';
            message += '<strong>' + innerElement + '</strong>.';

            return message;
          }
        }
      }
    }
  }

})(jQuery);