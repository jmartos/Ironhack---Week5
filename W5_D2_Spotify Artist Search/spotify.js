function onSubmit (event) {
  event.preventDefault();
  console.debug('SUBMITTED');
  var searchArtist = $('.artist').val()
  
  var request = $.get('https://api.spotify.com/v1/search?q='+searchArtist+'&type=artist&limit5');

  function showArtists (artists){
    artists.artists.items.forEach(function appendLi (item) {
      console.log(item);
      id = item.id
      showAlbums(id)
      var html = [
        '<li>',
          '<h2>' + item.name + '</h2>',
          '<dl>',
            '<dd><img src= "'+ item.images[0].url +'" height="100" width="100"></dd>',
            '<dd>'album_list'</dd>',
          '</dl>',
        '</li>'
      ].join('\n');
       $('.js-artists-list').append(html);
    });
  }

  function showAlbums (id){
  var albums = $.get('https://api.spotify.com/v1/artists/'+id+'/albums')
    albums.responseJSON.items.forEach(function append (album) {
      htmlAlbum = [
        '<li>',
          '<h5>' + album.name + '</h5>',
        '</li>'
      ].join('\n');
       return (htmlAlbum);
       album_list = htmlAlbum
    });
  }

function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }


  //requestAlbum.done(showAlbums);
  request.done(showArtists);
  request.fail(handleError);

}

$(document).on('ready',function(){

$('.js-submit').on('click', onSubmit);

})