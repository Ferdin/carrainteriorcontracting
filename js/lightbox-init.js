document.addEventListener("DOMContentLoaded", function () {
  // Wrap gallery images in <a> tags automatically if not already linked
  var galleryFigures = document.querySelectorAll(
    ".wp-block-gallery .wp-block-image img",
  );

  galleryFigures.forEach(function (img) {
    var parent = img.parentElement;

    // Only wrap if not already inside an <a> tag
    if (parent.tagName !== "A") {
      var link = document.createElement("a");
      link.href = img.src; // use full size if available
      link.classList.add("glightbox");
      parent.insertBefore(link, img);
      link.appendChild(img);
    } else {
      // Already wrapped, just add the class
      parent.classList.add("glightbox");
    }
  });

  // Initialize GLightbox
  var lightbox = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    zoomable: true,
    autoplayVideos: true, // autoplay when opened
    plyr: {
      // optional — better video player controls
      css: "https://cdn.plyr.io/3.7.8/plyr.css",
      js: "https://cdn.plyr.io/3.7.8/plyr.js",
    },
  });
});
