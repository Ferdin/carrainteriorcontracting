document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".carra-modal-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var target = button.getAttribute("data-bs-target");
      var modalEl = document.querySelector(target);

      if (modalEl && typeof bootstrap !== "undefined") {
        // Get existing instance or create new one
        var modalInstance = bootstrap.Modal.getInstance(modalEl);

        if (!modalInstance) {
          modalInstance = new bootstrap.Modal(modalEl, {
            backdrop: true,
            keyboard: true,
          });
        }

        modalInstance.show();

        // Clean up properly when modal is fully hidden
        modalEl.addEventListener(
          "hidden.bs.modal",
          function () {
            modalInstance.dispose();

            // Force remove any lingering backdrop
            var backdrops = document.querySelectorAll(".modal-backdrop");
            backdrops.forEach(function (backdrop) {
              backdrop.remove();
            });

            document.body.classList.remove("modal-open");
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("padding-right");
          },
          { once: true },
        ); // 'once' ensures listener doesn't stack on repeated opens
      }
    });
  });
});
