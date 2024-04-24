package com.example.oblig3;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {
    @Autowired
    private JdbcTemplate db;

    public List<Ticket> getTickets() {

        String sql = "SELECT * FROM Ticket";
        return db.query(sql, new BeanPropertyRowMapper<>(Ticket.class));
    }

    public Ticket getTicket(int id) {
        String sql = "SELECT * FROM Ticket WHERE id = ?";

        return db.queryForObject(sql, BeanPropertyRowMapper.newInstance(Ticket.class), id);
    }

    public void addTicket(Ticket ticket) {
        String sql = "INSERT INTO Ticket (movie, amount, first_name, last_name, number, email) VALUES(?, ?, ?, ?, ?, ?)";
        db.update(sql, ticket.getMovie(), ticket.getAmount(), ticket.getFirst_name(), ticket.getLast_name(), ticket.getNumber(), ticket.getEmail());
    }
}
