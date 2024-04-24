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
}
