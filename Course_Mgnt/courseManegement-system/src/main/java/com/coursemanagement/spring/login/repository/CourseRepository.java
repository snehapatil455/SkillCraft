package com.coursemanagement.spring.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.coursemanagement.spring.login.models.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
