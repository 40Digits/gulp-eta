import $ from 'jquery';

export default function () {
  // jQuery plugin to get a fresh reference to a DOM element
  $.fn.refresh = () => {
    const $element = $(this.selector);

    this.splice(0, this.length);
    this.push.apply(this, $element);

    return this;
  };
}
