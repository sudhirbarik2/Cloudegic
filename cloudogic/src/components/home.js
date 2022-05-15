import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ProgressSpinner } from 'primereact/progressspinner';
import AddProject from "./addProject";
import EditProject from "./editProject"
function Home() {
    const [data, setData] = useState([]);
    const [loadAddComponent, setLoadAddComponent] = useState(false);
    const [loadHome, setLoadHome] = useState(false)
    const [loadModifyComponent, setLoadModifyComponent] = useState(false);
    const [modificationData, setModificationdata]=useState({})
    useEffect(() => {
        axios.get("http://localhost:4000/projects")
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log("Fetching data Error!!!");
            })
    }, [loadAddComponent, loadHome]);
    function loadAdd() {
        setLoadAddComponent(true)
    }
    function deleteProject(pId) {
        axios.delete("http://localhost:4000/delete/" + pId)
            .then(response => {
                setLoadHome(!loadHome)
            }).catch(error => {
                console.log("Delete Error!!!");
            })
    }
    function searchProject(event) {
        const { name, value } = event.target;
        axios.get("http://localhost:4000/projects/" + value)
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log("data fetch Error!!!");
            })
    }
    function updateProject(projectData) {
        setModificationdata(projectData);
        console.log("Project data from Home",projectData);
        setLoadModifyComponent(true);

    }
    function displayBookings() {
        let projectArray = [];
        if (data) {
            data.map((project, i) => {
                let skills=project.skillSet.join(", ")
                let element = (
                    <tr key={project.pId}>
                        <th scope="row">{project.pName}</th>
                        <td>{project.pDescription}</td>
                        <td>
                                 { skills}
                            
                        </td>
                        <td>{project.noOfMembers}</td>
                        <td>{project.isActive ? "Yes" : "No"}</td>
                        <td>{project.creationDate}</td>
                        <td colSpan={2}>
                            <button type="text" onClick={() => { updateProject(project) }} className="btn btn-link">Edit</button>
                            <button type="text" onClick={() => { deleteProject(project.pId) }} className="btn btn-link">Delete</button>
                        </td>
                    </tr>

                );
                projectArray.push(element);
            })
        }


        return projectArray;
    }

    return (
        <div>
            {
                loadAddComponent ? <AddProject></AddProject> :
                loadModifyComponent?<EditProject projectData={modificationData}></EditProject>:
                    <div className='paper shadow-lg p-3 mb-5 bg-white rounded'>
                        <div className='tableDesign'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <button type="button" className="btn btn-dark btn-lg buttons" onClick={loadAdd}>Add Project</button>
                                </div>
                                <div className='col-md-6'>
                                    <div className="form-outline">
                                        <input type="search" onChange={searchProject} id="form1" className="text-dark shadow-lg p-3 mb-5 bg-white rounded form-control" placeholder="Search project or description..." aria-label="Search" />
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped table-dark ">
                                <thead>
                                    <tr>
                                        <th scope="col">Project Name</th>
                                        <th scope="col">Project Description</th>
                                        <th scope="col">Skill set</th>
                                        <th scope="col">No. of members</th>
                                        <th scope="col">Is Active?</th>
                                        <th scope="col">Created Date</th>
                                        <th scope="col" colSpan={2}> Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data ? displayBookings() : <ProgressSpinner></ProgressSpinner>}
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>


    );
}

export default Home;
