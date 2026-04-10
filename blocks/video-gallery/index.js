(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var InspectorControls = blockEditor.InspectorControls;
  var useBlockProps = blockEditor.useBlockProps;
  var MediaUpload = blockEditor.MediaUpload;
  var PanelBody = components.PanelBody;
  var TextControl = components.TextControl;
  var Button = components.Button;

  blocks.registerBlockType("carra/video-gallery", {
    title: "Video Gallery",
    icon: "video-alt3",
    category: "media",

    attributes: {
      videos: {
        type: "array",
        default: [],
        // Each item: { id, title, videoUrl, thumbUrl, thumbAlt }
      },
    },

    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var videos = attributes.videos;

      // Add new empty video item
      function addVideo() {
        var newVideo = {
          id: "video-" + Math.random().toString(36).substr(2, 9),
          title: "",
          videoUrl: "",
          thumbUrl: "",
          thumbAlt: "",
        };
        setAttributes({ videos: videos.concat(newVideo) });
      }

      // Remove video by id
      function removeVideo(id) {
        setAttributes({
          videos: videos.filter(function (v) {
            return v.id !== id;
          }),
        });
      }

      // Update a specific video field
      function updateVideo(id, field, value) {
        setAttributes({
          videos: videos.map(function (v) {
            if (v.id === id) {
              var updated = Object.assign({}, v);
              updated[field] = value;
              return updated;
            }
            return v;
          }),
        });
      }

      return el(
        "div",
        useBlockProps(),

        // ── Sidebar ──────────────────────────────────
        el(
          InspectorControls,
          null,
          el(
            PanelBody,
            { title: "Video Gallery Settings", initialOpen: true },
            el(
              "p",
              { style: { fontSize: "12px", color: "#757575" } },
              "Add and manage videos below. Each video needs a URL and a thumbnail.",
            ),
          ),
        ),

        // ── Editor Preview ────────────────────────────
        el(
          "div",
          { className: "carra-video-gallery-editor" },

          el("h4", { style: { marginBottom: "16px" } }, "Video Gallery"),

          // Video Items
          videos.map(function (video) {
            return el(
              "div",
              {
                key: video.id,
                style: {
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "16px",
                  marginBottom: "16px",
                  background: "#fafafa",
                },
              },

              // Title
              el(TextControl, {
                label: "Video Title",
                value: video.title,
                placeholder: "e.g. Living Room Transformation",
                onChange: function (val) {
                  updateVideo(video.id, "title", val);
                },
              }),

              // Video Upload
              el(
                "p",
                {
                  style: {
                    fontWeight: "600",
                    fontSize: "11px",
                    marginBottom: "8px",
                  },
                },
                "Video File",
              ),
              el(MediaUpload, {
                onSelect: function (media) {
                  updateVideo(video.id, "videoUrl", media.url);
                },
                allowedTypes: ["video"], // only video files
                value: video.videoUrl,
                render: function (obj) {
                  return el(
                    "div",
                    { style: { marginBottom: "16px" } },
                    video.videoUrl
                      ? el(
                          "div",
                          null,
                          el("video", {
                            src: video.videoUrl,
                            style: {
                              width: "100%",
                              borderRadius: "4px",
                              marginBottom: "8px",
                            },
                            controls: true,
                          }),
                          el(
                            Button,
                            {
                              onClick: obj.open,
                              variant: "secondary",
                              style: { marginRight: "8px" },
                            },
                            "Replace Video",
                          ),
                          el(
                            Button,
                            {
                              onClick: function () {
                                updateVideo(video.id, "videoUrl", "");
                              },
                              variant: "link",
                              isDestructive: true,
                            },
                            "Remove",
                          ),
                        )
                      : el(
                          Button,
                          {
                            onClick: obj.open,
                            variant: "secondary",
                          },
                          "Upload Video",
                        ),
                  );
                },
              }),

              // Thumbnail Upload
              el(
                "p",
                {
                  style: {
                    fontWeight: "600",
                    fontSize: "11px",
                    marginBottom: "8px",
                  },
                },
                "Thumbnail Image",
              ),
              el(MediaUpload, {
                onSelect: function (media) {
                  updateVideo(video.id, "thumbUrl", media.url);
                  updateVideo(video.id, "thumbAlt", media.alt);
                },
                allowedTypes: ["image"],
                value: video.thumbUrl,
                render: function (obj) {
                  return el(
                    "div",
                    null,
                    video.thumbUrl
                      ? el(
                          "div",
                          null,
                          el("img", {
                            src: video.thumbUrl,
                            alt: video.thumbAlt,
                            style: {
                              width: "100%",
                              borderRadius: "4px",
                              marginBottom: "8px",
                            },
                          }),
                          el(
                            Button,
                            {
                              onClick: obj.open,
                              variant: "secondary",
                              style: { marginRight: "8px" },
                            },
                            "Replace Thumbnail",
                          ),
                          el(
                            Button,
                            {
                              onClick: function () {
                                updateVideo(video.id, "thumbUrl", "");
                                updateVideo(video.id, "thumbAlt", "");
                              },
                              variant: "link",
                              isDestructive: true,
                            },
                            "Remove",
                          ),
                        )
                      : el(
                          Button,
                          {
                            onClick: obj.open,
                            variant: "secondary",
                          },
                          "Upload Thumbnail",
                        ),
                  );
                },
              }),

              // Remove Video Button
              el(
                Button,
                {
                  onClick: function () {
                    removeVideo(video.id);
                  },
                  variant: "link",
                  isDestructive: true,
                  style: { marginTop: "12px" },
                },
                "✕ Remove Video",
              ),
            );
          }),

          // Add Video Button
          el(
            Button,
            {
              onClick: addVideo,
              variant: "primary",
              style: { marginTop: "8px" },
            },
            "+ Add Video",
          ),
        ),
      );
    },

    save: function (props) {
      var attributes = props.attributes;
      var videos = attributes.videos;

      return el(
        "div",
        useBlockProps.save(),
        el(
          "div",
          { className: "carra-video-gallery" },
          videos.map(function (video) {
            return el(
              "div",
              { key: video.id, className: "carra-video-item" },
              el(
                "a",
                {
                  href: video.videoUrl,
                  className: "glightbox",
                  "data-type": "video",
                  "data-title": video.title,
                },
                el(
                  "div",
                  { className: "carra-video-thumb" },
                  video.thumbUrl
                    ? el("img", { src: video.thumbUrl, alt: video.thumbAlt })
                    : null,
                  el("div", { className: "carra-play-btn" }, "▶"),
                ),
                video.title
                  ? el("p", { className: "carra-video-title" }, video.title)
                  : null,
              ),
            );
          }),
        ),
      );
    },
  });
})(
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components,
);
