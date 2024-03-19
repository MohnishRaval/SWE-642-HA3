package com.example.SWE645Assignment3.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.SWE645Assignment3.dto.*;
import com.example.SWE645Assignment3.model.*;

@Mapper(componentModel = "spring")
public interface FormMapper {
	
	FormMapper INSTANCE =Mappers.getMapper(FormMapper.class);
	
	
	@Mapping(source = "raffleNumbers", target = "numbersEntered")
	@Mapping(source= "streetAddress", target="address")
	@Mapping(target = "date", source = "date", dateFormat = "yyyy-MM-dd")
	SurveyDetails dtoToModel(ViewSurveyDetailsDTO formDTO);
	 
	@Mapping(source = "numbersEntered", target = "raffleNumbers")
	@Mapping(source= "address", target="streetAddress")
	@Mapping(target = "date", source = "date", dateFormat = "yyyy-MM-dd")
	List<ViewSurveyDetailsDTO> modelToDto(List<SurveyDetails> formModel);
}
