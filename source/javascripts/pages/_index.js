
$(function(){

  var tweetCountSuffixLength = 4;

  var example =
    'I wrote my first long tweet and it needed to span five tweets.\n\n' +
    'It was difficult to figure out where to split the tweets to make the most of the 140 characters. I also wanted to leave room for a tweet count.\n\n' +
    'I wrote this to help me write my first long tweet, it worked well enough that I decided to share it. Feedback appreciated.\n\n' +
    'Start typing at anytime to take over.';

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
  .focus()
  .typed({
    strings: [example],
    typeSpeed: -100,
    contentType: 'text',
    showCursor: false,
    callback: function() {
      clearInterval(refreshInterval);
      refresh();
    }
  });

  $('.option input')
  .keydown(refresh)
  .keyup(refresh)
  .change(refresh);
});
