'use strict';


//function to Get to quantities input by user
function getDogImage(numInput) {
    if (numInput <3){
        fetch('https://dog.ceo/api/breeds/image/random/3')
        .then(response => response.json())
        .then(responseJson => console.log(responseJson));
    } else if (numInput >50){
        return alert("Please choose a number equal or less than 50");
    }else{
        fetch(`https://dog.ceo/api/breeds/image/random/${numInput}`)
        .then(response => response.json())
       
       .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
    }
}    
//function for displaying quantities of dogs 
function displayResults(responseJson) {
    //console.log(responseJson);
  for (let i = 0; i <responseJson.message.length; i++){
    //console.log(i);
    let output = responseJson.message[i];
    //console.log(output);
    $('.results-img').append(`
       <img src="${responseJson.message[i]}" class="results-img" >
       `);
    }
    //display the results section
    $(".qty-hide").removeClass();
}






 //function to Get breed of dogs
function getBreedImage(breedTypeInput){
 fetch(`https://dog.ceo/api/breed/${breedTypeInput}/images`)
 .then(response => response.json())
 .then(responseJson => 
 displayBreed(responseJson))
 .catch(error => alert(console.log(`doesn't work`))
)
}
//function to display Breed
function displayBreed(responseJson){
    if (responseJson.message === "Breed not found (master breed does not exist)"){
        console.log('oh shit');
        $('.breed-img').html(
            `<h2>
            Error...Enter another Breed...</h2>`)
        alert(`Error, your breed was not found`);
        $(".breed-hide").removeClass();
    }else{
    var breedX = Math.floor((Math.random() * 100)+1);
    $('.breed-img').html(
        `<img src="${responseJson.message[breedX]}" class="breed-img">`
      )
      $(".breed-hide").removeClass();
      
    }
}

//Quantity function to listen User Input//
function qtyInputForm() {
  $('.input-qty').submit(event => {
    event.preventDefault();
    let userNumInput = $("#num-dog").val();
    $('.results-img').empty();
    $('.breed-img').empty();
    getDogImage(userNumInput);
   
    
    
  });
}
//Breed function to listen User Input 
function breedInputForm(){ 
    $('.input-type').submit(event => {
    event.preventDefault();
    let breedTypeInput = $("#breed-type").val();

    $('.results-img').empty();
    getBreedImage(breedTypeInput);
   
  });
}



//start function//
$(function() {
  console.log('App loaded! Waiting for submit!');
  qtyInputForm();
  breedInputForm();
});