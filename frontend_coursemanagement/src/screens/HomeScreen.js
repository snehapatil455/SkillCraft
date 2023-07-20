import React from "react";
import Header from "./../components/Header";
import CourseSection from "../components/homeComponents/CourseSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import AddEdit from "./AddEdit";
import { useHistory } from 'react-router-dom';

const HomeScreen = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.roles.includes('ROLE_ADMIN');
  const history = useHistory();

  const handleAddCourse = () => {
    history.push('/add');
  };
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      {isAdmin && (
        <div>
                 <button onClick={handleAddCourse}>Add Course</button>

        </div>
      )}
      <CourseSection />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
