var streamableUrl = "https://api.streamable.com/import";

function uploadVideoToStreamable(url, title = "") {
  $.get(streamableUrl, { url, title }, function(response, status) {
    writeStatusMessage("Success! You may view your video at https://streamable.com/" +  response.shortcode);
  }, "json")
  .fail(function(jqXHR, status, error) {
    alert(error);
  });
}

function writeStatusMessage(message) {
  $(".upload-form > .status").text(message);
}

$(document).ready(function() {
  $(".upload-form > .btn").click(function() {
    var linkToUpload = $(".upload-form > #url").val();
    var titleOfVideo = $(".upload-form > #title").val();

    uploadVideoToStreamable(linkToUpload, titleOfVideo);
  });
});