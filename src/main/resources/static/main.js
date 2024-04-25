
// Loads ticket array when page is initialized
$(function () {
    showTickets()
})

// Initializes attributes that are used across several functions
let valid;

let movie;
let amount;
let first_name;
let last_name;
let number;
let email;

let inputs;

function showTickets() {
    // GET-call that returns a ticket-array
    $.ajax( {
        type: "GET",
        url: "/getTickets",
        success: function (data) {
            // Formats the array into HTML
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

                    // Adds buttons for editing and deleting tickets individually
                    "<td><button class='btn btn-primary' onclick='editTicket("+ ticket.id +")'>Edit</button></td>" +
                    "<td><button class='btn btn-danger' onclick='deleteTicket("+ ticket.id+")'>Delete</button></td>" +
                    "</tr>"
            }
            // Button for deleting all tickets
            output += "</table><button class='btn btn-danger' onclick='deleteAllTickets()'>Delete all tickets</button>"
            $("#tickets").html(output)
        }
    })
}

function setAttributes() {
    // "Refreshes" the global variables
    movie = $("#movies")
    amount = $("#amount")
    first_name = $("#first-name")
    last_name = $("#last-name")
    number = $("#number")
    email = $("#email")

    inputs = [movie, amount, first_name, last_name, number, email] // Array of inputs
}

// Function that controls the input values
function inputValidation() {
    valid = true;
    for (let input of inputs) {
        let error_msg = ""
        let id = input.attr("id")
        // Checks if number of tickets are larger than 0
        if ((id === "amount" && input.val() <= 0) ||
            // RegEx for valid e-mail
            (id === "email" && !input.val().match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) ||
            // RegEx for valid 8-figured Norwegian phone number
            (id=== "number" && !input.val().match(/^[1-9]\d{7}/))) {

            // Prints invalid values out to associated error-outputs
            error_msg = "Fill out valid " + id
            valid = false
        }
        if (input.val() === "") {
            error_msg = "Fill out " + id // Prints error message if an input is left empty
            valid = false;

        }
        $("#"+ id + "-error").html(error_msg)
    }
}

// Clears out input fields
function emptyInputs() {
    for (let input of inputs) {
        input.val("")
    }
}


// Function for ordering a ticket
function buy() {
    setAttributes()
    inputValidation()
    if (valid) {
        // Creates ticket-object
        ticket = {
            "movie" : movie.val(),
            "amount" : amount.val(),
            "first_name" : first_name.val(),
            "last_name" : last_name.val(),
            "number" : number.val(),
            "email" : email.val()
        }
        // Posts ticket-object to server
        $.ajax({
            type: "POST",
            url: "/addTicket",
            data: ticket,
            success: function () {
                showTickets()
                emptyInputs()
            }
        })

    }
}

// Function for editing individual tickets
function editTicket(id) {
    setAttributes()
    // Retrieves ticket based on given id
    $.ajax( {
        TYPE: "GET",
        url: "/getTicket?id="+ id,
        success: function(data) {
            // Auto-fills input fields with ticket data
            movie.val(data.movie)
            amount.val(data.amount)
            first_name.val(data.first_name)
            last_name.val(data.last_name)
            number.val(data.number)
            email.val(data.email)

            // Edits button to show "Edit" instead of "Buy" in order to re-use existing input fields
            $("#ticket-submit").text("Edit")
            $("#ticket-form").attr("action", "javascript:submitEdit("+data.id+")")
        }
    })
}

function submitEdit(id) {
    setAttributes()
    inputValidation()
    if (valid) {
        ticket = {
            "id" : id,
            "movie" : movie.val(),
            "amount" : amount.val(),
            "first_name" : first_name.val(),
            "last_name" : last_name.val(),
            "number" : number.val(),
            "email" : email.val()
        }
        // Submits ticket object to server for updating
        $.ajax({
            type: "PUT",
            url : "/editTicket",
            data : ticket,
            success : function () {
                showTickets()
                emptyInputs()

                // Reverts button back into "buy"
                $("#ticket-submit").text("Buy")
                $("#ticket-form").attr("action", "javascript:buy()")
            }
        })
    }
}

function deleteTicket(id) {
    $.ajax({
        type: "DELETE",
        url: "/deleteTicket?id=" + id,
        success: function () {
            showTickets()
        }
    })
}

function deleteAllTickets() {
    $.ajax({
        type: "DELETE",
        url: "/deleteAllTickets",
        success: function () {
            showTickets()
        }
    })
}
