package com.coursemanagement.spring.login.controllers;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.coursemanagement.spring.login.models.Course;
import com.coursemanagement.spring.login.utils.FileUploadUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;
    
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestParam("file") MultipartFile file,
                                                @RequestParam("course") String courseJson) {
        try {
            // Convert course JSON to object
            ObjectMapper objectMapper = new ObjectMapper();
            Course course = objectMapper.readValue(courseJson, Course.class);

            // Get the file name
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            // Set the video URL to the file name
            course.setVideoUrl(fileName);
            System.out.println(file.getOriginalFilename());

            // Create the course
            Course newCourse = courseService.createCourse(course);

            // Save the file
            String uploadDir = "C:\\Users\\Dell\\Desktop\\final evaluation\\Course_Mgnt\\courseManegement-system\\src\\main\\resources\\static\\videos"+File.separator +"\\"+ newCourse.getId();
            FileUploadUtil.saveFile(uploadDir, fileName, file);

            // Return the created course
            return ResponseEntity.status(HttpStatus.CREATED).body(newCourse);
        } catch (IOException ex) {
            throw new RuntimeException("Error uploading video: " + ex.getMessage());
        }
    }
    
    @PostMapping("/enroll")
    public ResponseEntity<String> enrollCourse(@RequestParam Long courseId, @RequestParam Long userId) {
        try {
            courseService.enrollCourse(courseId, userId);
            return ResponseEntity.ok("User enrolled successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error enrolling user to the course: " + e.getMessage());
        }
    }


    
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        Course updatedCourse = courseService.updateCourse(id, course);
        return ResponseEntity.ok(updatedCourse);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        String folderPath = "C:\\Users\\Dell\\Desktop\\final evaluation\\Course_Mgnt\\courseManegement-system\\src\\main\\resources\\static\\videos\\" + id;

        try {
            // Create a Path object using the folder path
            Path folder = Paths.get(folderPath);

            // Check if the folder exists
            if (Files.exists(folder) && Files.isDirectory(folder)) {
                // Delete the folder and its contents recursively
                Files.walk(folder)
                        .sorted(Comparator.reverseOrder())
                        .map(Path::toFile)
                        .forEach(File::delete);
            }
        } catch (IOException e) {
            // Handle any potential exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.noContent().build();
    }
    
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
    	
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
    	
        Course course = courseService.getCourse(id);
        System.out.print(course);
        return ResponseEntity.ok(course);
    }
    
    
    @GetMapping("/videos/{id}")
    public ResponseEntity<InputStreamResource> streamVideo(@PathVariable String id) throws IOException {
        String videoFolderPath = "C:\\Users\\Dell\\Desktop\\final evaluation\\Course_Mgnt\\courseManegement-system\\src\\main\\resources\\static\\videos\\";  // Update with the path to the folder containing video folders

        // Build the path to the folder
        String folderPath = videoFolderPath + id;
        File folder = new File(folderPath);


        if (!folder.exists() || !folder.isDirectory()) {
            // Handle case when folder doesn't exist or is not a directory
            // Return an appropriate error response
            return ResponseEntity.notFound().build();
        }
        // Retrieve the single file in the folder
        File[] files = folder.listFiles();
        if (files == null || files.length == 0) {
            // Handle case when folder is empty
            // Return an appropriate error response
            return ResponseEntity.notFound().build();
        }

        File videoFile = files[0];  // Assuming there is only one file in the folder

        // Create an InputStreamResource from the video file
        InputStream videoInputStream = Files.newInputStream(videoFile.toPath());
        InputStreamResource inputStreamResource = new InputStreamResource(videoInputStream);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("video/mp4"))  // Set the content type to video/mp4 (adjust as needed)
                .body(inputStreamResource);
    }
}
