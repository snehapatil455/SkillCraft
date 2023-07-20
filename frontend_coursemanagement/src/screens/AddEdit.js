import { Link } from 'react-router-dom'

import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/App.css'

const AddEdit = () => {

    const [courseData, setCourseData] = useState([]);
    const [newCourse, setNewCourse] = useState("");
    const [description, setCourseDescription] = useState(1);
    const [videoFile, setVideoFile] = useState(null);

    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = () => {
        axios
            .get("http://localhost:8081/courses/")
            .then((response) => {
                console.log(response.data);
                setCourseData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setVideoFile(file);
    };
    const user = JSON.parse(localStorage.getItem('user'));

    const addCourse = () => {
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('course', JSON.stringify({
            title: newCourse,
            description: description,
            author: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            videoUrl: " ",

        }));


        axios.post("http://localhost:8081/courses/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);

            
            setVideoFile(null);
            setNewCourse("");
            setCourseDescription("");
            fetchCourseData();
        }).catch((error) => {
            console.log(error);
        });

        alert("Successfully added New course ! ")
    };
    const deleteCourse = (courseToDelete) => {
        axios.delete(`http://localhost:8081/courses/${courseToDelete.id}`)
            .then(response => {
               console.log("Course deleted"+courseToDelete.id);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });

        const updatedCourseData = courseData.filter((course) => course.id !== courseToDelete.id);
        setCourseData(updatedCourseData);
    };


    return (
        <div>
            <div className="header">
                <div className="container">
                    {/* MOBILE HEADER */}
                    <div className="mobile-header">
                        <div className="container ">
                            <div className="row ">
                                <div className="col-6 d-flex align-items-center">
                                    <Link className="navbar-brand" to="/home">
                                        <img alt="logo" src="/images/logo.png" />
                                    </Link>
                                </div>
                                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="name-button dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i class="fas fa-user"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item" to="/profile">
                                                Profile
                                            </Link>

                                            <Link className="dropdown-item" to="#">
                                                Logout
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12 d-flex align-items-center">
                                    <form className="input-group">
                                        <input
                                            type="search"
                                            className="form-control rounded search"
                                            placeholder="Search"
                                        />
                                        <button type="submit" className="search-button">
                                            search
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PC HEADER */}
                    <div className="pc-header">
                        <div className="row">
                            <div className="col-md-3 col-4 d-flex align-items-center">
                                <Link className="navbar-brand" to="/home">
                                    <img alt="logo" src="/images/logo.png" />
                                </Link>
                            </div>
                            <div className="col-md-2 col-2 d-flex align-items-center">
                                <Link className="dropdown-item" to="/home">
                                    Home
                                </Link>

                            </div>
                            <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">



                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="addCourse_main"  >
                <div className="addCourse">
                    <h2>Add Course </h2>

                    <label htmlFor="courseNameInput">Course Title:</label>

                    <input
                        id="courseNameInput"
                        type="text"
                        placeholder="course name"
                        value={newCourse}
                        onChange={(event) => setNewCourse(event.target.value)} formNoValidate

                    />

                    <label htmlFor="descriptionhere">Description:</label>
                    <input
                        id="courseDescInput"
                        type="text"
                        placeholder="description"
                        onChange={(event) => setCourseDescription(event.target.value)} formNoValidate

                    />
                    <label htmlFor="videoFileInput">Video File:</label>
                    <div className="fileInputContainer">
                        <input
                            id="videoFileInput"
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            formNoValidate
                        />
                        {/* <div className="fileInputLabel">
                            {videoFile ? videoFile.name : 'Choose a video file'}
                        </div> */}
                    </div>


                    <button className="add_course" onClick={addCourse}>Add course</button>
                </div>


                <div className='addedCourse'>
                    <table id="courses">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Video Url</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {courseData.map((course) => (
                                <tr key={course.id}>
                                    <td>{course.title}</td>
                                    <td>{course.description}</td>
                                    <td>{course.url}</td>
                                    <td>
                                        <button className='del_btn' onClick={() => deleteCourse(course)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};
export default AddEdit;
