$(document).ready(function () {
  // Initialize _imagesData
  var _imagesData = [];

  // Function to get URL parameter
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Get the 'ch' parameter from the URL
  var chValue = getUrlParameter('ch');

  if (!chValue) {
    chValue = "test";    
  }
  // Fetch and initialize _imagesData
  if (chValue) {
    $.getJSON(`../../metadata/${chValue}/mapping.json`, function(data) {
      _imagesData = data;
      initializeGallery(chValue);
    }).fail(function() {
      console.error(`Failed to load mapping.json for ch=${chValue}`);
    });
  } else {
    console.error('No "ch" parameter found in the URL');
  }

  function initializeGallery(chValue) {
    // Set the chapter title
    $("#chapter-title").text(_imagesData.title || "Gallery");

    // Image thumbnails generator
    $.map(_imagesData.data, function (_data, i) {
      console.log(JSON.stringify(_data));

      for (var key in _data) {
        console.log(key + ": " + _data[key].thumb_img + " " + _data[key].main_img + " " + _data[key].info);
      }

      $(".thumbnails-slider").append(
        "<button class='thumbnail-button'><img data-info='" +
          _data.info +
          "' src='../../metadata/" + chValue + "/images/" +
          _data.thumb_img +
          "'/></button>"
      );
      $(".main-image-slider").append(
        "<a href='../../metadata/" + chValue + "/images/" +
          _data.main_img +
          "' target='_blank' class='image-link'><img src='" +
          "../../metadata/" + chValue + "/images/" +
          _data.main_img +
          "'/></a>"
      );
    });

    /*********************
        Thumbnails slider
    *********************/
    // Change the main image whenever a thumbnail button is activated
    $(".thumbnails-slider").on("init", function (e, slider) {
      $(slider.$slides.find(".thumbnail-button")).each(function (index) {
        $(this).on("click", function () {
          // Move aria-current="true" to this button
          $(slider.$slides.find(".thumbnail-button").removeAttr("aria-current"));
          $(this).attr("aria-current", true);

          console.log("img " + $(this));

          // Change the main image to match this thumbnail button
          var index = $(this).closest(".slick-slide").data("slick-index");
          $(".main-image-slider").slick("slickGoTo", index);
          console.log("$(this).children() - " + $(this).children());
          _text = $(this).children().attr("data-info");
          $(".note").text(_text);
        });
      });
    });

    // Initialize the slider
    $(".thumbnails-slider").slick({
      vertical: true,
      slidesToShow: 4,
      infinite: false,
      instructionsText:
        "This carousel contains a column of small thumbnails. Selecting a thumbnail will change the main image in the carousel that follows. Use the Previous and Next buttons to cycle through all the thumbnails, use Enter to select.",
      regionLabel: "thumbnails carousel",
    });

    /********************
        Main image slider
    *********************/
    $(".main-image-slider").slick({
      slidesToShow: 1,
      draggable: false,
      instructionsText:
        "This carousel shows one large product image at a time. Use the Previous and Next buttons to move between images, or use the preceding thumbnails carousel to select a specific image to display here.",
      regionLabel: "main image carousel",
    });

    // Update the thumbnail slider when the user changes the main slider directly.
    $(".main-image-slider").on(
      "beforeChange",
      function (e, slider, currentSlide, nextSlide) {
        // Remove aria-current from the last selected thumbnail image button
        $('.thumbnails-slider .thumbnail-button[aria-current="true"]').removeAttr(
          "aria-current"
        );

        // Select the thumbnail image button that goes with this main image. Most importantly, this updates Slick's internal state to be consistent with the visual change.
        $(".thumbnails-slider").slick("slickGoTo", nextSlide);

        // Add aria-current="true" to the correct thumbnail image button to convey to screen readers that it's active.
        $(".thumbnails-slider .thumbnail-button:eq(" + nextSlide + ")").attr(
          "aria-current",
          true
        );
        _text = $(".thumbnails-slider .thumbnail-button:eq(" + nextSlide + ") img").attr("data-info");
        $(".note").text(_text);

        console.log(
          "nextSlide= " + nextSlide + " currentSlide = " + currentSlide
        );
        console.log(JSON.stringify($("button img")));
      }
    );
  }
});
