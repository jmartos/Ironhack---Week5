function onSubmit (event) {
  event.preventDefault();
  var searchTrack = $('.track').val()

  $.ajax({
    url: 'https://api.spotify.com/v1/search?q='+searchTrack+'&type=track&limit=1',
    success: function (response) {
      var artistId = (response.tracks.items[0].artists[0].id);
      $(".title").text(response.tracks.items[0].name);
      $(".author").text(response.tracks.items[0].artists[0].name);
      $(".cover").attr('src', (response.tracks.items[0].album.images[0].url));
      $(".js-player").attr('src', (response.tracks.items[0].preview_url));  
      showDetails(artistId)
    }
  });
}

$(".btn-play").on("click", function() {
  if($(this).hasClass('disabled')){
    $('.js-player').trigger('play');
  }else {
    $('.js-player').trigger('pause');
  }
  $(this).toggleClass('disabled');
  $(this).toggleClass('playing');
});

function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.log('Current time: ' + current);
  $('progress').prop('value', current)
}

$('.js-player').on('timeupdate', printTime);

function showDetails (id) {
  event.preventDefault();
  console.log(id)
  $.ajax({
    url: "https://api.spotify.com/v1/artists/"+ id +"",
    success: function (response) {
      console.log(response)

      console.log(response.genres.toString())

      $(".artist-name").text(response.name);
      $(".geners").text((response.genres) ? (response.genres.toString()) : "" );
      $(".followers").text((response.followers.total) ? (response.followers.total) : "");
      $(".popularity").text((response.popularity) ? (response.popularity) : "");
      $(".image").attr('src', (response.images[0].url) ? (response.images[0].url) : "" );
    }
  });
}

$(document).on('ready',function(){
  $('.js-submit').on('click', onSubmit);
})













