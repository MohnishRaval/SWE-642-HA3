package com.example.SWE645Assignment3.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ErrorResponse {
	private String error;
    private String message;
    private int status;
    
    public ErrorResponse() {
    }

	public ErrorResponse(String error, String message,int status) {
		super();
		this.error = error;
		this.message = message;
		this.status=status;
	}
    
}
