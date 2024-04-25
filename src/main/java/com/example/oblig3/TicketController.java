package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {
    @Autowired
    private TicketRepository rep;

    @GetMapping("/helloWorld")
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping("/getTickets")
    public List<Ticket> getTickets() {
        return rep.getTickets();
    }

    @GetMapping("/getTicket")
    public Ticket getTicket(int id) {

        return rep.getTicket(id);
    }

    @PostMapping("/addTicket")
    public void addTicket(Ticket ticket) {
        rep.addTicket(ticket);
    }

    @PutMapping("/editTicket")
    public void editTicket(Ticket ticket) {
        rep.editTicket(ticket);
    }

    @DeleteMapping("/deleteTicket")
    public void deleteTicket(int id) {
        rep.deleteTicket(id);
    }
}
