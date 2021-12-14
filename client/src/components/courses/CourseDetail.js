import React, { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import Context from '../../Context';
import ReactMarkdown from 'react-markdown';
import Loading from '../Loading';

function CourseDetail() {
    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;
    const { id } = useParams();
    let navigate = useNavigate();
    let [courseDetail, setCourseDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        if(!/^\d+$/.test(id)){
            console.log("Not a Number id");
            navigate('/notfound');
        }

        context.data.getCourse(id)
        .then(response => {
            setCourseDetail(response);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
        });

        return () => {
            controller.abort();
        }
    }, [id, navigate, context]);

    const handleDelete = () => {

    }

    return (
        isLoading ?
            <Loading />
        :
            <>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            authUser && (authUser.id === courseDetail.userId) ?
                            <>
                                <Link to={`/courses/${id}/update`} className="button">Update Course</Link>
                                <button className="button" onClick={handleDelete}>Delete Course</button>
                            </>
                            : null
                        }
                        <Link className="button button-secondary" to="/">Return to List</Link> 
                    </div>
                </div>
                
                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{courseDetail.title}</h4>
                                <p>By: {courseDetail.user.firstName} {courseDetail.user.lastName}</p>
                                <p>{courseDetail.description}</p>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <ReactMarkdown>{courseDetail.estimatedTime}</ReactMarkdown>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkdown>{courseDetail.materialsNeeded}</ReactMarkdown>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </>
    )
}   

export default CourseDetail;