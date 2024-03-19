package com.example.SWE645Assignment3.Controller;

import com.example.SWE645Assignment3.exception.*;
import com.example.SWE645Assignment3.mapper.FormMapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.RestController;
import com.example.SWE645Assignment3.dto.*;
import com.example.SWE645Assignment3.model.*;
import com.example.SWE645Assignment3.repository.*;

@CrossOrigin(origins = "*")
@RestController
public class APIController {
	@Autowired
	private SurveyDetailsRepository surveydetailsrepo;
	
	@Autowired
	private FormMapper formMapper;

	@GetMapping(path = "form/viewAllRecords")
	public ResponseEntity<List<ViewSurveyDetailsDTO>> getSurveyData() {
		//System.out.println(surveydetailsrepo.findAll());
		System.out.println(formMapper.modelToDto(surveydetailsrepo.findAll()));
		return new ResponseEntity<>(formMapper.modelToDto(surveydetailsrepo.findAll()),HttpStatus.OK); 
	}

	@PostMapping("/form/submit")
	public ResponseEntity<SurveyDetails> submitForm(@RequestBody ViewSurveyDetailsDTO formDTO) {
			System.out.println(formDTO);
			return new ResponseEntity<>(surveydetailsrepo.save(formMapper.dtoToModel(formDTO)),HttpStatus.CREATED);
	}
}
