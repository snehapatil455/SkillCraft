import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link, useParams } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import axios from "axios";

const SingleCourse = ({ match }) => {
  const [courseData, setCourseData] = useState({
    title: 'Default Title',
    description: 'Default Description',
    videoUrl: 'https://example.com/default-video.mp4',
  });
  const { id } = useParams();

  useEffect(() => {
    fetchCourse();
    videoElement();
  }, [id]);

  // useEffect(() => {
  //   if (courseData) {
  //     axios
  //       .get(`http://localhost:8081/videos/${courseData.id}`, {
  //         responseType: "blob",
  //       })
  //       .then((response) => {
  //         const videoBlob = new Blob([response.data], { type: "video/mp4" });
  //         setVideoURL(URL.createObjectURL(videoBlob));
  //         console.log(videoURL);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [courseData]);


  const videoElement = (() => {
    if (courseData) {
      axios({
        method: 'get',
        url: "http://localhost:8081/courses/videos/" + id,
        responseType: 'blob', // Set the response type to 'blob' to handle binary data
      })
        .then(


          response => {
            // Create a blob URL from the response data
            const vUrl = URL.createObjectURL(response.data);
            // setVideoURL(vUrl);
            // Play the video using the created URL
            const videoElement = document.createElement('video');
            videoElement.style.width = '100%'; // Set the desired width
            videoElement.style.height = 'auto';
            videoElement.src = vUrl;
            videoElement.controls = true;
            const videoDiv = document.getElementById('videoElement');

            videoDiv.appendChild(videoElement);
          })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });


    }
  });
  const fetchCourse = () => {
    axios
      .get("http://localhost:8081/courses/" + id)
      .then((response) => {
        console.log("helllooo "+ JSON.stringify(response))
        setCourseData(response.data);
      })
      .catch((error) => {
        console.log("id" + id)
        console.log(error);
      });
  };



  return (
    <>
      <Header />
      <h2>Course { }</h2>

      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <div id="videoElement" ></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{courseData.title}</div>
              </div>
              <p>{courseData.description}</p>

              <div className="product-count col-lg-7 ">


                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Reviews</h6>
                  <Rating
                    value={3}
                    text={` reviews`}
                  />
                </div>
                {/* <button className="round-black-btn">ENROLL</button> */}


              </div>
            </div>
          </div>
        </div>

        {/* RATING */}
        <div className="row my-5">
          <div className="col-md-6">
            <h6 className="mb-3">REVIEWS</h6>
            <Message variant={"alert-info mt-3"}>No Reviews</Message>
            <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
              <strong>Admin Doe</strong>
              <Rating />
              <span>Jan 12 2021</span>
              <div className="alert alert-info mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6>WRITE A CUSTOMER REVIEW</h6>
            <div className="my-4"></div>

            {/* <form>
              <div className="my-4">
                <strong>Rating</strong>
                <select className="col-12 bg-light p-3 mt-2 border-0 rounded">
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="my-4">
                <strong>Comment</strong>
                <textarea
                  row="3"
                  className="col-12 bg-light p-3 mt-2 border-0 rounded"
                ></textarea>
              </div>
              <div className="my-3">
                <button className="col-12 bg-black border-0 p-3 rounded text-white">
                  SUBMIT
                </button>
              </div>
            </form> */}
            <div className="my-3">
              <Message variant={"alert-warning"}>
                Please{" "}
                <Link to="/login">
                  " <strong>Login</strong> "
                </Link>{" "}
                to write a review{" "}
              </Message>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCourse;
