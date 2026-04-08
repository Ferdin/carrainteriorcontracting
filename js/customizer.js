wp.customize("header_bg_color", function (value) {
  value.bind(function (newVal) {
    document.querySelector(".site-header").style.backgroundColor = newVal;
  });
});
