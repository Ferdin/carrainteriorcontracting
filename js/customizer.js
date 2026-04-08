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
