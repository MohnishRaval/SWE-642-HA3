package com.example.SWE645Assignment3.model;
import lombok.*;

import java.util.Date;

import jakarta.persistence.*;


@Entity
@Table(name="surveydetails")
@Getter
@Setter
public class SurveyDetails {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    private Integer surveyId;
	
	@Column(name = "firstname")
	private String firstName;
	
	@Column(name = "lastname")
	private String lastName;
	
	@Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zipcode")
    private String zipCode;

    @Column(name = "telephone")
    private String phoneNumber;

    @Column(name = "email")
    private String email;   
    
    @Column(name = "surveydate")
    private Date date;
		
	@Column(name = "option_student")
    private Boolean optionStudent = false;

    @Column(name = "option_location")
    private Boolean optionLocation = false;

    @Column(name = "option_campus")
    private Boolean optionCampus = false;

    @Column(name = "option_atmosphere")
    private Boolean optionAtmosphere = false;

    @Column(name = "option_dormrooms")
    private Boolean optionDormRooms = false;

    @Column(name = "option_sports")
    private Boolean optionSports = false;
    
    @Column(name = "recommendation")
    private String recommendation;
  
    @Column(name = "raffle")
    private String numbersEntered;
    
    @Column(name = "surveyresult")
    private Boolean won;

	@Override
	public String toString() {
		return "SurveyDetails [surveyId=" + surveyId + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", address=" + address + ", city=" + city + ", state=" + state + ", zipCode=" + zipCode
				+ ", phoneNumber=" + phoneNumber + ", email=" + email + ", date=" + date + ", optionStudent="
				+ optionStudent + ", optionLocation=" + optionLocation + ", optionCampus=" + optionCampus
				+ ", optionAtmosphere=" + optionAtmosphere + ", optionDormRooms=" + optionDormRooms + ", optionSports="
				+ optionSports + ", recommendation=" + recommendation + ", numbersEntered=" + numbersEntered + ", won="
				+ won + "]";
	}
}
