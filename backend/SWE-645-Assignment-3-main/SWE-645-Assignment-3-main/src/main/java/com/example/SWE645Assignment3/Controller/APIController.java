package com.example.SWE645Assignment3.Controller;

import com.example.SWE645Assignment3.exception.*;
import com.example.SWE645Assignment3.mapper.FormMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
		System.out.println("All Records="+surveydetailsrepo.findAll());
		return new ResponseEntity<>(formMapper.modelToDto(surveydetailsrepo.findAll()),HttpStatus.OK); 
	}

	@PostMapping("/form/submit")
	public ResponseEntity<SurveyDetails> submitForm(@RequestBody ViewSurveyDetailsDTO formDTO) {
//			System.out.println("Data From Frontend"+formDTO);
			return new ResponseEntity<>(surveydetailsrepo.save(formMapper.dtoToModel(formDTO)),HttpStatus.CREATED);
	}
	
	@DeleteMapping("/form/deleteRecord/{id}")
	public ResponseEntity<Void> deleteRecord(@PathVariable Integer id) {
	    Optional<SurveyDetails> surveyDetailsOptional = surveydetailsrepo.findById(id);

	    if (surveyDetailsOptional.isPresent()) {
	        surveydetailsrepo.deleteById(id);
	        return ResponseEntity.noContent().build();
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@PutMapping("/form/updateRecord/{id}")
    public ResponseEntity<Void> updateRecord(@PathVariable Integer id, @RequestBody ViewSurveyDetailsDTO formModel) {
        Optional<SurveyDetails> existingRecordOptional = surveydetailsrepo.findById(id);
        if (existingRecordOptional.isPresent()) {
            SurveyDetails existingRecord = existingRecordOptional.get();
            // Update the existing record with the new data
            existingRecord.setFirstName(formModel.getFirstName());
            existingRecord.setLastName(formModel.getLastName());
            existingRecord.setCity(formModel.getCity());
            existingRecord.setState(formModel.getState());
            existingRecord.setZipCode(formModel.getZipCode());
            existingRecord.setPhoneNumber(formModel.getPhoneNumber());
            existingRecord.setEmail(formModel.getEmail());
            existingRecord.setDate(formModel.getDate());
            existingRecord.setRecommendation(formModel.getRecommendation());
            // Save the updated record
            surveydetailsrepo.save(existingRecord);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
