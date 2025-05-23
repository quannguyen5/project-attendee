package com.anhnd.attendeevdt.dao;

import com.anhnd.attendeevdt.model.Attendee;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class AttendeeDAO extends BaseDAO {
    public AttendeeDAO() {
        super();
    }

    /**
     * get all attendee
     */
    public List<Attendee> getAllAttendees() throws SQLException {
        String sql = "select * from attendee";
        List<Attendee> attendees = new ArrayList<>();
        try (Connection conn = this.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Attendee attendee = new Attendee();
                    attendee.setId(rs.getInt("id"));
                    attendee.setName(rs.getString("name"));
                    attendee.setDob(rs.getString("dob"));
                    attendee.setSchool(rs.getString("school"));
                    attendees.add(attendee);
                }
            }
        }
        return attendees;
    }
}