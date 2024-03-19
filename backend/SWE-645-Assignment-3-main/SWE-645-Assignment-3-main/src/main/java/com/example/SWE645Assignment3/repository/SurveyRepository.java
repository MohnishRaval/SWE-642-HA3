package com.example.SWE645Assignment3.repository;
import com.example.SWE645Assignment3.model.*;
import com.example.SWE645Assignment3.dto.*;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



//public interface SurveyRepository extends JpaRepository<Survey, Integer> {
//	@Query(nativeQuery = true, value = "SELECT stu.first_name AS firstName, stu.last_name AS lastName, raf.won AS won_raffleTickets, sur.date AS survey_date "
//			+ "FROM students stu, raffles raf, surveys sur "
//			+ "WHERE stu.student_id = sur.student_id AND stu.student_id = raf.student_id")
//	 List<Object[]> getSurveyData();
//}

//@Query(nativeQuery = true, value = "SELECT stu.first_name AS firstName, stu.last_name AS lastName, raf.won AS won_raffleTickets, sur.date AS survey_date "
//		+ "FROM students stu, raffles raf, surveys sur "
//		+ "WHERE stu.student_id = sur.student_id AND stu.student_id = raf.student_id")
//	@Query("select stu.first_name, stu.last_name, raf.won as won_raffleTickets, sur.date as survey_date "
//            + "FROM students stu,raffles raf,surveys sur "
//            + "where stu.student_id=sur.student_id and stu.student_id=raf.student_id")
//@Query("SELECT stu.first_name AS firstName, stu.last_name AS lastName, raf.won AS won_raffleTickets, sur.date AS survey_date "
//        + "FROM students stu, raffles raf, surveys sur "
//        + "WHERE stu.student_id = sur.student_id AND stu.student_id = raf.student_id")
