(function (blocks, element, blockEditor, components, media) {
  var el = element.createElement;
  var InspectorControls = blockEditor.InspectorControls;
  var useBlockProps = blockEditor.useBlockProps;
  var RichText = blockEditor.RichText;
  var MediaUpload = blockEditor.MediaUpload;
  var PanelBody = components.PanelBody;
  var TextControl = components.TextControl;
  var Button = components.Button;

  blocks.registerBlockType("carra/modal-button", {
    title: "Modal Button",
    icon: "button",
    category: "design",

    attributes: {
      buttonText: { type: "string", default: "Open Modal" },
      buttonColor: { type: "string", default: "#000000" },
      modalTitle: { type: "string", default: "Modal Title" },
      modalContent: { type: "string", default: "Add your content here..." },
      imageUrl: { type: "string", default: "" },
      imageAlt: { type: "string", default: "" },
      uniqueId: { type: "string", default: "" },
    },

    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      if (!attributes.uniqueId) {
        setAttributes({
          uniqueId: "carra-modal-" + Math.random().toString(36).substr(2, 9),
        });
      }

      return el(
        "div",
        useBlockProps(),

        // ── Sidebar ──────────────────────────────────────────
        el(
          InspectorControls,
          null,
          el(
            PanelBody,
            { title: "Button Settings", initialOpen: true },
            el(TextControl, {
              label: "Button Text",
              value: attributes.buttonText,
              onChange: function (val) {
                setAttributes({ buttonText: val });
              },
            }),
            el(TextControl, {
              label: "Button Color (hex)",
              value: attributes.buttonColor,
              onChange: function (val) {
                setAttributes({ buttonColor: val });
              },
            }),
          ),

          el(
            PanelBody,
            { title: "Modal Settings", initialOpen: true },
            el(TextControl, {
              label: "Modal Title",
              value: attributes.modalTitle,
              onChange: function (val) {
                setAttributes({ modalTitle: val });
              },
            }),
            el(components.TextareaControl, {
              label: "Modal Content",
              value: attributes.modalContent,
              rows: 6,
              onChange: function (val) {
                setAttributes({ modalContent: val });
              },
              help: "You can also edit content directly in the preview below.",
            }),
          ),

          el(
            PanelBody,
            { title: "Modal Image", initialOpen: true },
            // Image Upload
            el(MediaUpload, {
              onSelect: function (media) {
                setAttributes({ imageUrl: media.url, imageAlt: media.alt });
              },
              allowedTypes: ["image"],
              value: attributes.imageUrl,
              render: function (obj) {
                return el(
                  "div",
                  null,
                  attributes.imageUrl
                    ? el(
                        "div",
                        null,
                        el("img", {
                          src: attributes.imageUrl,
                          alt: attributes.imageAlt,
                          style: {
                            width: "100%",
                            marginBottom: "8px",
                            borderRadius: "4px",
                          },
                        }),
                        el(
                          Button,
                          {
                            onClick: obj.open,
                            variant: "secondary",
                            style: {
                              marginBottom: "4px",
                              display: "block",
                              width: "100%",
                            },
                          },
                          "Replace Image",
                        ),
                        el(
                          Button,
                          {
                            onClick: function () {
                              setAttributes({ imageUrl: "", imageAlt: "" });
                            },
                            variant: "link",
                            isDestructive: true,
                          },
                          "Remove Image",
                        ),
                      )
                    : el(
                        Button,
                        {
                          onClick: obj.open,
                          variant: "primary",
                        },
                        "Upload Image",
                      ),
                );
              },
            }),
          ),
        ),

        // ── Editor Preview ────────────────────────────────────
        el(
          "button",
          {
            className: "carra-modal-btn",
            style: { backgroundColor: attributes.buttonColor },
          },
          attributes.buttonText,
        ),

        // Modal Preview inside editor
        el(
          "div",
          {
            className: "carra-modal-preview",
            style: {
              marginTop: "16px",
              border: "1px dashed #ccc",
              padding: "16px",
              borderRadius: "4px",
            },
          },
          el(
            "p",
            { style: { fontSize: "11px", color: "#999", margin: "0 0 8px" } },
            "↓ Modal Preview",
          ),

          // Modal Title (editable inline)
          el(RichText, {
            tagName: "h4",
            className: "carra-modal-title-preview",
            value: attributes.modalTitle,
            onChange: function (val) {
              setAttributes({ modalTitle: val });
            },
            placeholder: "Modal Title...",
          }),

          // Side by Side Layout
          el(
            "div",
            { style: { display: "flex", gap: "16px", marginTop: "12px" } },

            // Left — Image
            el(
              "div",
              { style: { flex: "1" } },
              attributes.imageUrl
                ? el("img", {
                    src: attributes.imageUrl,
                    alt: attributes.imageAlt,
                    style: {
                      width: "100%",
                      borderRadius: "4px",
                      objectFit: "cover",
                    },
                  })
                : el(
                    "div",
                    {
                      style: {
                        background: "#f0f0f0",
                        height: "180px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                        color: "#999",
                      },
                    },
                    "Upload image in sidebar →",
                  ),
            ),

            // Right — Content (editable inline)
            el(
              "div",
              { style: { flex: "1" } },
              el(RichText, {
                tagName: "div",
                className: "carra-modal-content-preview",
                value: attributes.modalContent,
                onChange: function (val) {
                  setAttributes({ modalContent: val });
                },
                placeholder: "Add your modal content here...",
                multiline: "p",
              }),
            ),
          ),
        ),
      );
    },

    save: function (props) {
      var attributes = props.attributes;
      var uniqueId = attributes.uniqueId;

      return el(
        "div",
        useBlockProps.save(),

        // Trigger Button
        el(
          "button",
          {
            type: "button",
            className: "carra-modal-btn",
            style: { backgroundColor: attributes.buttonColor },
            "data-bs-toggle": "modal",
            "data-bs-target": "." + uniqueId,
          },
          attributes.buttonText,
        ),

        // Modal
        el(
          "div",
          {
            className: "modal fade " + uniqueId,
            tabIndex: "-1",
            role: "dialog",
            "aria-hidden": "true",
          },
          el(
            "div",
            { className: "modal-dialog modal-lg", role: "document" },
            el(
              "div",
              { className: "modal-content" },

              // Header
              el(
                "div",
                { className: "modal-header" },
                el(RichText.Content, {
                  tagName: "h5",
                  className: "modal-title",
                  value: attributes.modalTitle,
                }),
                el("button", {
                  type: "button",
                  className: "btn-close",
                  "data-bs-dismiss": "modal",
                  "aria-label": "Close",
                }),
              ),

              // Body — Side by Side
              el(
                "div",
                { className: "modal-body" },
                el(
                  "div",
                  { className: "carra-modal-body-inner" },
                  // Left — Image (only rendered when an image URL exists)
                  attributes.imageUrl
                    ? el(
                        "div",
                        { className: "carra-modal-image" },
                        el("img", {
                          src: attributes.imageUrl,
                          alt: attributes.imageAlt,
                        }),
                      )
                    : null,

                  // Right — Content
                  el(
                    "div",
                    {
                      className: `${attributes.imageUrl ? "" : "carra-no-modal-image"} carra-modal-content`,
                    }, //"carra-modal-content"
                    el(RichText.Content, {
                      tagName: "div",
                      value: attributes.modalContent,
                    }),
                  ),
                ),
              ),
            ),
          ),
        ),
      );
    },
  });
})(
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components,
  window.wp.media,
);
