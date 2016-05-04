var phrases = [
"I like pie",
"I dont like jQuery",
"I dont like work on holidays",
"This is another phrase to try",
"blbabalbalbalbalbalba",
"00101101010010101"
];

$(document).on('ready', function(){
 var rand_position = Math.floor((Math.random() * 5) + 0);
 var selected_phrase = phrases[rand_position]
 $('.text').html(selected_phrase);
});

$('.change').on('click', function(){
 var rand_position = Math.floor((Math.random() * 5) + 0);
 var selected_phrase = phrases[rand_position]
 $('.text').html(selected_phrase);
});


$('.form').on('keydown', function(e){
    if(e.which == 13) {
      var new_phrase = ($('#add :input'));
      $('.text').html(new_phrase);
      phrases.push(new_phrase);
      $('form#login').submit()
      return false;
    }
});
 
$('.form').keypress(function(e){
    if(e.which === 13){
        return false;
    }
});

// $('.form').on('keyup', function(event){
//   if(e.which == 13) {
//   event.preventDefault();  
//   }
// });