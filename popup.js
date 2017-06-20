var streamableUrl = "https://api.streamable.com/import";

function uploadVideoToStreamable(url, title = "") {
  $.get(streamableUrl, { url, title }, function(response, status) {
    writeStatusMessage("Success! You may view your video at ", response.shortcode);
  }, "json")
  .fail(function(jqXHR, status, error) {
    alert(error);
  });
}

function writeStatusMessage(message, shortcode="") {
  

  $(".upload-form > .status").text(message)

  /*
    For a success status, a valid shortcode should exist.
    Append this valid shortcode to the message for easy access.

    Validation of shortcode is based on string length. This will
    break when Streamable changes its shortcode format.
  */
  .append(function(index, oldHtml) {
    var videoUrl = "https://streamable.com/" + shortcode;
    if (shortcode.toString().length === 5) {
      return "<a target='_blank' href='" + videoUrl + "'>" + videoUrl + "</a>";
    } else {
      return false;
    }
  });

}

$(document).ready(function() {
  $(".upload-form > .btn").click(function() {
    var linkToUpload = $(".upload-form > #url").val();
    var titleOfVideo = $(".upload-form > #title").val();

    uploadVideoToStreamable(linkToUpload, titleOfVideo);
  });
});