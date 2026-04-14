(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var useState = element.useState;
  var useEffect = element.useEffect;
  var InspectorControls = blockEditor.InspectorControls;
  var useBlockProps = blockEditor.useBlockProps;
  var MediaUpload = blockEditor.MediaUpload;
  var PanelBody = components.PanelBody;
  var TextControl = components.TextControl;
  var Button = components.Button;
  var useSelect = window.wp.data && window.wp.data.useSelect;

  function getMediaUrl(media, size) {
    if (!media) {
      return "";
    }

    var mediaItem = Array.isArray(media) ? media[0] : media;
    if (!mediaItem) {
      return "";
    }

    var sizes =
      mediaItem.sizes ||
      (mediaItem.media_details && mediaItem.media_details.sizes) ||
      {};
    var sized =
      size && sizes[size]
        ? sizes[size]
        : sizes.medium ||
          sizes.large ||
          sizes.full ||
          sizes.medium_large ||
          sizes.thumbnail;

    if (!sized) {
      var sizeKeys = Object.keys(sizes);
      if (sizeKeys.length) {
        sized = sizes[sizeKeys[0]];
      }
    }

    return (
      (sized && (sized.url || sized.source_url)) ||
      mediaItem.url ||
      mediaItem.source_url ||
      (mediaItem.guid && mediaItem.guid.rendered) ||
      ""
    );
  }

  blocks.registerBlockType("carra/video-gallery", {
    title: "Video Gallery",
    icon: "video-alt3",
    category: "media",

    attributes: {
      videos: {
        type: "array",
        default: [],
        // Each item: { id, title, videoUrl, thumbUrl, thumbAlt, thumbId }
      },
    },

    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var videos = attributes.videos;

      var selectedVideo = useState(null);
      var selectedId = selectedVideo[0];
      var setSelectedId = selectedVideo[1];

      var activeVideo = videos.find(function (v) {
        return v.id === selectedId;
      });

      var activeThumbMedia = useSelect
        ? useSelect(
            function (select) {
              if (!activeVideo || !activeVideo.thumbId) {
                return null;
              }
              return select("core").getMedia(activeVideo.thumbId);
            },
            [activeVideo && activeVideo.thumbId],
          )
        : null;

      var activeThumbUrl = activeVideo
        ? activeVideo.thumbUrl || getMediaUrl(activeThumbMedia, "medium")
        : "";

      useEffect(
        function () {
          if (!activeVideo || !activeVideo.thumbId) {
            return;
          }

          if (activeVideo.thumbUrl) {
            return;
          }

          if (!activeThumbMedia) {
            return;
          }

          var resolvedThumbUrl = getMediaUrl(activeThumbMedia, "medium");
          if (resolvedThumbUrl) {
            updateVideo(activeVideo.id, "thumbUrl", resolvedThumbUrl);
          }
        },
        [
          activeVideo && activeVideo.id,
          activeVideo && activeVideo.thumbId,
          activeVideo && activeVideo.thumbUrl,
          activeThumbMedia,
        ],
      );

      function addVideo() {
        var newVideo = {
          id: "video-" + Math.random().toString(36).substr(2, 9),
          title: "",
          videoUrl: "",
          thumbUrl: "",
          thumbAlt: "",
          thumbId: 0,
        };
        setAttributes({ videos: videos.concat(newVideo) });
      }

      function removeVideo(id) {
        setAttributes({
          videos: videos.filter(function (v) {
            return v.id !== id;
          }),
        });
      }

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
            { title: "Video Settings", initialOpen: true },
            activeVideo
              ? el(
                  "div",
                  null,
                  el(TextControl, {
                    label: "Video Title",
                    value: activeVideo.title,
                    onChange: function (val) {
                      updateVideo(activeVideo.id, "title", val);
                    },
                  }),
                  el(TextControl, {
                    label: "Video URL",
                    value: activeVideo.videoUrl,
                    onChange: function (val) {
                      updateVideo(activeVideo.id, "videoUrl", val);
                    },
                  }),
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
                      var thumbUrl = getMediaUrl(media, "medium");
                      var mediaItem = Array.isArray(media) ? media[0] : media;
                      updateVideo(activeVideo.id, "thumbUrl", thumbUrl);
                      updateVideo(
                        activeVideo.id,
                        "thumbAlt",
                        (mediaItem && (mediaItem.alt || mediaItem.title)) || "",
                      );
                      updateVideo(
                        activeVideo.id,
                        "thumbId",
                        (mediaItem && mediaItem.id) || 0,
                      );
                    },
                    allowedTypes: ["image"],
                    value: activeVideo.thumbId || 0,
                    render: function (obj) {
                      return el(
                        "div",
                        null,
                        activeThumbUrl
                          ? el(
                              "div",
                              null,
                              el("img", {
                                src: activeThumbUrl,
                                alt: activeVideo.thumbAlt,
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
                                    updateVideo(activeVideo.id, "thumbUrl", "");
                                    updateVideo(activeVideo.id, "thumbAlt", "");
                                    updateVideo(activeVideo.id, "thumbId", 0);
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
                )
              : el(
                  "p",
                  { style: { fontSize: "12px", color: "#757575" } },
                  "Click a video card in the editor to see its settings here.",
                ),
          ),
        ),

        // ── Editor Preview ────────────────────────────
        el(
          "div",
          { className: "carra-video-gallery-editor" },

          el("h4", { style: { marginBottom: "16px" } }, "Video Gallery"),

          videos.map(function (video) {
            return el(
              "div",
              {
                key: video.id,
                onClick: function () {
                  setSelectedId(video.id);
                },
                style: {
                  border:
                    selectedId === video.id
                      ? "2px solid #007cba"
                      : "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "16px",
                  marginBottom: "16px",
                  background: "#fafafa",
                  cursor: "pointer",
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
                  var videoUrl = getMediaUrl(media);
                  updateVideo(video.id, "videoUrl", videoUrl);
                },
                allowedTypes: ["video"],
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
              null,

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
                    ? el("img", {
                        src: video.thumbUrl,
                        alt: video.thumbAlt,
                      })
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
