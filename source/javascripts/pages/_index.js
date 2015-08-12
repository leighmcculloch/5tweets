
$(function(){

  var tweetCountSuffixLength = 4;

  function refresh(){
    $('#tweets').empty();

    var prefix = $('#prefix').val();
    if (prefix.length > 0) {
      prefix += ' ';
    }

    var tweetCountEnabled = $('#count').is(':checked');
    var characterLimit = parseInt($('#character-limit').val()) - prefix.length - (tweetCountEnabled ? tweetCountSuffixLength : 0);

    var chunkingRegex = new RegExp('(.){1,' + characterLimit + '}', 'g');
    var chunks = $('#raw').val().match(chunkingRegex);

    if (chunks.length == 1) {
      tweetCountEnabled = false;
    }

    chunks.forEach(function(chunk, index) {
      var text = prefix + chunk.toString();
      if (tweetCountEnabled) {
        var tweetCount = index + 1;
        var totalTweetCount = chunks.length;
        text += ' ' + tweetCount + '/' + totalTweetCount;
      }

      $('<a class="tweet" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '" target="_blank"></a>')
      .text(text)
      .appendTo('#tweets');
    });
  };

  var refreshInterval = setInterval(refresh, 100);
  $('#raw')
  .keydown(refresh)
  .keyup(refresh)
  .change(refresh)
  .focus();

  $('.option input')
  .keydown(refresh)
  .keyup(refresh)
  .change(refresh);
});
