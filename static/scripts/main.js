// Teh Javascripts!
$(window).bind("load", function() {
    var userAge = prompt("How old are you?");
    var intro;

    if (userAge < 18) {
        intro = "Once upon a time there was a very cuddly panda. He liked to laze around and eat bamboo."
    } else {
        intro = "Once upon a time there was a very angry panda. He was very big with sharp claws."
    }

    console.log(intro);

    console.log("Panda stares at you");

    var userAnswer = prompt("Do you want to hug panda?");

    if (userAnswer === "yes") {
        console.log("Panda liked the hug!");
    } else {
        console.log("Panda looks sad");
    }
});
