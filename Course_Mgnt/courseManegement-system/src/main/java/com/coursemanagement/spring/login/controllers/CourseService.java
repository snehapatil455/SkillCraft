package com.coursemanagement.spring.login.controllers;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coursemanagement.spring.login.models.Course;
import com.coursemanagement.spring.login.models.UserCourse;
import com.coursemanagement.spring.login.repository.CourseRepository;
import com.coursemanagement.spring.login.repository.UserCourseRepository;
import com.coursemanagement.spring.login.repository.UserRepository;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserCourseRepository userCourseRepository;
    
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }
    
    public void enrollCourse(Long courseId, Long userId) {
        // Check if the user is already enrolled in the course
        if (userCourseRepository.existsByCourseIdAndUserId(courseId, userId)) {
            throw new RuntimeException("User is already enrolled in the course.");
        }

        // Create a new UserCourse entity
        UserCourse userCourse = new UserCourse();
        userCourse.setCourseId(courseId);
        userCourse.setUserId(userId);

        // Save the UserCourse entity to the database
        userCourseRepository.save(userCourse);
    }

    
    public Course updateCourse(Long id, Course course) {
        Course existingCourse = courseRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Course not found"));
        
        existingCourse.setTitle(course.getTitle());
        existingCourse.setDescription(course.getDescription());
        existingCourse.setAuthor(course.getAuthor());
        
        return courseRepository.save(existingCourse);
    }
    
    public void deleteCourse(Long id) {
        Course existingCourse = courseRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Course not found"));
        
        courseRepository.delete(existingCourse);
    }
    
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    public Course getCourse(Long id) {
    	return courseRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Course not found"));
    }
}
