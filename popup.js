var streamableUrl = "https://api.streamable.com/import";

function writeToInput(inputId, textToWrite) {
  $(".upload-form > #" + inputId).val(textToWrite);
}

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
  /*
    Copy current activeTab url to URL Input
      > activeTabs permission grants temporary acccess to a user's tabs.
  */
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    // tabs is an array of one tab
    var currentTab = tabs[0];
    writeToInput("title", currentTab.title);
    writeToInput("url", currentTab.url);
  });


  /*
    Upload Button Event Listener
  */
  $(".upload-form > .btn").click(function() {
    var linkToUpload = $(".upload-form > #url").val();
    var titleOfVideo = $(".upload-form > #title").val();

    uploadVideoToStreamable(linkToUpload, titleOfVideo);
  });

});