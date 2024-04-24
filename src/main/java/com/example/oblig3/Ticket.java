package com.example.oblig3;

public class Ticket {
    private int id;
    private String movie;
    private int amount;
    private String first_name;

    private String last_name;
    private String number;

    private String email;

    public Ticket() {};


    public Ticket(int id, String movie, int amount, String first_name, String number, String email) {
        this.id = id;
        this.movie = movie;
        this.amount = amount;
        this.first_name = first_name;
        this.number = number;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
