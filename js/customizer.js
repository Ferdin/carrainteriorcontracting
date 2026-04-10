wp.customize("header_bg_color", function (value) {
  value.bind(function (newVal) {
    document.querySelector(".site-header").style.backgroundColor = newVal;
  });
});

wp.customize("nav_bg_color", function (value) {
  value.bind(function (newVal) {
    document.querySelector(".offcanvas.offcanvas-end").style.backgroundColor =
      newVal;
  });
});

// Background color
wp.customize("footer_bg_color", function (value) {
  value.bind(function (newval) {
    document.querySelector(".site-footer").style.backgroundColor = newval;
  });
});

// Text color
wp.customize("footer_text_color", function (value) {
  value.bind(function (newval) {
    document.querySelector(".site-footer").style.color = newval;
  });
});
