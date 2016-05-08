// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

PokemonApp.Pokemon = function (pokemonUri) {
  this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
}

PokemonApp.Pokemon.prototype.render = function () {
  console.log("Rendering pokemon: #" + this.id);

  var self = this;
  var id = this.id;

  $.ajax({
    url: "/api/pokemon/" + this.id,
    success: function (response) {
      self.info = response;

      $(".js-pkmn-name").text(self.info.name);
      $(".js-pkmn-number").text(self.info.pkdx_id);
      $(".js-pkmn-height").text(self.info.height);
      $(".js-pkmn-weight").text(self.info.weight);
      $(".js-pkmn-image").attr('src', "http://pokeapi.co/media/img/" + id + ".png");

      $(".js-pokemon-modal").modal("show");
    }
  });

  $.ajax({
    url: "/api/v1/description/" + this.id,
    success: function (response) {
      self.info = response;

      $(".js-pkmn-description").text(self.info.description);
    }
  });

    $.ajax({
    url: "/api/v1/pokemon/" + id,
    success: function (response) {
      self.info = response;

      if (typeof(self.info.evolutions[0]) != "undefined") {
        $(".js-pkmn-evolution").text(self.info.evolutions[0].to);
        $(".js-pkmn-image-evol").attr('src', "http://pokeapi.co/media/img/" + (parseInt(id)+1) + ".png");
      } else {
        $(".js-pkmn-evolution").text("This pokemon has no evolution");
      }
    }
  });
}

PokemonApp.Pokemon.idFromUri = function (pokemonUri) {
  var uriSegments = pokemonUri.split("/");
  var secondLast = uriSegments.length - 2;
  return uriSegments[secondLast];
}

$(document).on("ready", function () {
  $(".js-show-pokemon").on("click", function (event){
    var $button = $(event.currentTarget);
    var pokemonUri = $button.data("pokemon-uri");

    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
  });
});