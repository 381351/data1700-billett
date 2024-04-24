let valid;

let movie;
let amount;
let first_name;
let last_name;
let number;
let email;

let inputs;
function buy() {
    movie = $("#movies")
    amount = $("#amount")
    first_name = $("#first-name")
    last_name = $("#last-name")
    number = $("#number")
    email = $("#email")

    inputs = [movie, amount, first_name, last_name, number, email]
    inputValidation()
    if (valid) {
        $.get("/helloWorld", function (data) {
            console.log(data)
        })
        emptyInputs()
    }

}



let message = "hei"
function inputValidation() {
    valid = true;
    for (let input of inputs) {
        let error_msg = ""
        let id = input.attr("id")
        if ((id === "amount" && input.val() <= 0) ||
            (id === "email" && !input.val().match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) ||
            (id=== "number" && !input.val().match(/^[1-9]\d{7}/))) {

            error_msg = "Fill out valid " + id
            valid = false
        }
        if (input.val() === "") {
            error_msg = "Fill out " + id
            valid = false;

        }
        $("#"+ id + "-error").html(error_msg)
    }

}

function emptyInputs() {
    for (let input of inputs) {
        input.val("")
    }

}
