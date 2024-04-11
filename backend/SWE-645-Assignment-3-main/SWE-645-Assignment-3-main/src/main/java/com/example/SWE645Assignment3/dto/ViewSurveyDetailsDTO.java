package com.example.SWE645Assignment3.dto;


import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class ViewSurveyDetailsDTO {
	private Integer surveyId;
	private String firstName;
	private String lastName;
	private String streetAddress;
	private String city;
	private String state;
	private String zipCode;
	private String phoneNumber;
	private String email;
	private Date date;
	private Boolean optionStudent = false;
	private Boolean optionLocation = false;
	private Boolean optionCampus = false;
	private Boolean optionAtmosphere = false;
	private Boolean optionDormRooms = false;
	private Boolean optionSports = false;
	private String recommendation;
	private String raffleNumbers;
	private Boolean won;
	public ViewSurveyDetailsDTO(Integer surveyId,String firstName, String lastName, String streetAddress, String city, String state,
			String zipCode, String phoneNumber, String email, Date date, Boolean optionStudent, Boolean optionLocation,
			Boolean optionCampus, Boolean optionAtmosphere, Boolean optionDormRooms, Boolean optionSports,
			String recommendation, String raffleNumbers, Boolean won) {
		super();
		this.firstName = firstName;
		this.surveyId=surveyId;	
		this.lastName = lastName;
		this.streetAddress = streetAddress;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.date = date;
		this.optionStudent = optionStudent;
		this.optionLocation = optionLocation;
		this.optionCampus = optionCampus;
		this.optionAtmosphere = optionAtmosphere;
		this.optionDormRooms = optionDormRooms;
		this.optionSports = optionSports;
		this.recommendation = recommendation;
		this.raffleNumbers = raffleNumbers;
		this.won = won;
	}

	
}
