package com.example.SWE645Assignment3.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class FormDTO {
	// fields from Student class
    private String firstName;
    private String lastName;
    private String streetAddress;
    private String city;
    private String state;
    private String zip;
    private String telephoneNumber;
    private String email;
    
    // fields from Survey class
    private Date surveyDate;
    private String recommendation;
    
    
    // fields from CampusLike class
    private List<String> campusLikingArray;
    
    // fields from Raffle class
    private String numbersEntered;
    private Boolean won;
}
