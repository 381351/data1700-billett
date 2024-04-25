package com.example.oblig3;

import java.util.Comparator;

public class TicketComparator implements Comparator<Ticket> {
    @Override
    // Overrides the Collections.sort, in order to sort Ticket-array based on last name
    public int compare(Ticket n1, Ticket n2) {
        return n1.getLast_name().compareTo(n2.getLast_name());
    }
}
