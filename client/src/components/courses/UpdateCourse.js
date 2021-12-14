import React, { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import Context from '../../Context';

function UpdateCourse() {
    const context = useContext(Context.Context);
    const { id } = useParams();
    let navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errors, setErrors] = useState('');


    useEffect(() => {
        const controller = new AbortController();
        if(!/^\d+$/.test(id)){
            console.log("Not a Number id");
            navigate('/notfound');
        }

        context.data.getCourse(id)
        .then(response => {
            setTitle(response.title);
            setDescription(response.description);
            setEstimatedTime(response.estimatedTime);
            setMaterialsNeeded(response.materialsNeeded);
            setFirstName(response.user.firstName);
            setLastName(response.user.lastName);
        })
        .catch(error => {
            console.log(error);
        });

        return () => {
            controller.abort();
        }
    }, [id, navigate, context]);

    const submit = (e) => {
        e.preventDefault();
        const course = {
            title: title,
            description: description,
            materialsNeeded: materialsNeeded,
            estimatedTime: estimatedTime
        };

        context.data.updateCourse(id, course, context.authenticatedUser.emailaddress, context.authenticatedUser.password)
        .then((response) => {
            if (response.length) {
                setErrors(response);
            } else {
                navigate(`/courses/${id}`);
            }
        })
        .catch((error) => {
            console.error(error);
            navigate('/error');
        });
    }

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            {errors.length ?
                <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                </div>
                : null
            }
            <form onSubmit={submit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e)=> {setTitle(e.target.value)}} />

                        <p>By {firstName} {lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e)=> {setDescription(e.target.value)}}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e)=> {setEstimatedTime(e.target.value)}}/>

                        <label htmlFor="materialsNeeded">Materials Needed (<a href="https://commonmark.org/help/">Markdown</a>)</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e)=> {setMaterialsNeeded(e.target.value)}}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <Link className="button button-secondary" to={`/courses/${id}`}>Cancel</Link>
            </form>
        </div>
    )
}

export default UpdateCourse;