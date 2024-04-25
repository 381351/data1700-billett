package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class TicketController {
    @Autowired
    private TicketRepository rep;


    @GetMapping("/getTickets")
    public List<Ticket> getTickets() {
        List<Ticket> tickets = rep.getTickets();
        // Formats tickets to sorter accordingly by last name
        Collections.sort(tickets, new TicketComparator());
        return tickets;
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

    @DeleteMapping("/deleteAllTickets")
    public void deleteAllTickets() {
        rep.deleteAllTickets();
    }


}
