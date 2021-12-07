import React from 'react';
import {
	Routes,
	Route,
	Navigate
} from 'react-router-dom';

import Header from "./components/Header";
import Courses from './components/courses/Courses';
import CourseDetail from './components/courses/CourseDetail';
import UpdateCourse from './components/courses/UpdateCourse';
import CreateCourse from './components/courses/CreateCourse';
import NotFound from './components/Errors/NotFound';
import Forbidden from './components/Errors/Forbidden';
import UnhandledError from './components/Errors/UnhandledError';

function App() {
	return (
	  <div id="root">
		<Header />
		<main>
		  <Routes>
			<Route path="/" element={<Navigate replace to="/courses" />} />
			<Route path="/courses" element={<Courses />} />
			<Route path="/courses/:id" element={<CourseDetail />} />
			<Route path="/courses/:id/update" element={<UpdateCourse />} />
			<Route path='/courses/create' element={<CreateCourse />} />

			<Route path="/notfound" element={<NotFound />} />
			<Route path="/forbidden" element={<Forbidden />} />
			<Route path="/error" element={<UnhandledError />} />
			
			<Route path="*" element={<NotFound />} />
		  </Routes>
		</main>
	  </div>
	);
  }
  
  export default App;
