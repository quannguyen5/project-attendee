package com.anhnd.attendeevdt.controller;

import com.anhnd.attendeevdt.dao.AttendeeDAO;
import com.anhnd.attendeevdt.model.Attendee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AttendeeController {
    @Autowired
    private AttendeeDAO attendeeDAO;


    @GetMapping("/all-attendees")
    public List<Attendee> getAllAttendee() throws SQLException {
        return attendeeDAO.getAllAttendees();
    }
}
