package com.coursemanagement.spring.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coursemanagement.spring.login.models.UserCourse;

@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {
    boolean existsByCourseIdAndUserId(Long courseId, Long userId);
}