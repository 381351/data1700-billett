$(function () {
    showTickets()
})

let valid;

let movie;
let amount;
let first_name;
let last_name;
let number;
let email;

let inputs;

function showTickets() {
    $.get("/getTickets", function(data) {
        let output = "<h2>All tickets</h2><table class='table' id='tickets'>" +
            "<tr><th>Movie</th><th>Number of tickets</th><th>First Name</th>" +
            "<th>Last Name</th><th>Phone</th><th>E-mail</th><th></th><th></th></tr>"
        for (let ticket of data) {
            output += "<tr><td>"+ ticket.movie +"</td>" +
                "<td>"+ticket.amount+"</td>" +
                "<td>"+ticket.first_name+"</td>" +
                "<td>"+ticket.last_name+"</td>" +
                "<td>"+ticket.number+"</td>" +
                "<td>"+ticket.email+"</td>" +
                "<td><button class='btn btn-primary' onclick='editTicket(ticket.id)'>Edit</button></td>" +
                "<td><button class='btn btn-danger' onclick='deleteTicket(ticket.id)'>Delete</button></td>" +
                "</tr>"
        }
        output += "</table><button class='btn btn-danger'>Delete all tickets</button>"
        $("#tickets").html(output)
    })
}


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
        $.get("/helloWorld", function (goddag) {
            console.log(goddag)
        })
        emptyInputs()
    }

}



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
