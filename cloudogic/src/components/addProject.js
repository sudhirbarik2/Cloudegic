import React, { useState, useEffect } from 'react';
import axios from "axios";
import Home from "./home";

function AddProject() {
    const [backButton, setBackButton] = useState(false);
    const [successMessage,setSuccessMessage]=useState("")
    const [successStatus,setSuccessStatus]=useState(false)

    const [errorMessage,setErrorMessage]=useState("")
    const [errorStatus,setErrorStatus]=useState(false)
    const [inputValues, setInputValue] = useState({
        pName: "",
        pDescription: "",
        skillSet: [],
        noOfMembers: "",
        isActive: false,
    });

    const [validation, setValidation] = useState({
        pName: "",
        pDescription: "",
        skillSet: "",
        noOfMembers: "",
        isActive: "",
    });

    const [btnStatus, setbtnStatus] = useState(false)


    function goBack() {
        setBackButton(true)
    }

    function handleChange(event) {
        setSuccessStatus(false)
        const { name, value } = event.target;
        if(name==="skillSet"){
            let value = Array.from(event.target.selectedOptions, option => option.value)
            setInputValue({ ...inputValues, [name]: value });

        }else{
            setInputValue({ ...inputValues, [name]: value });
        }

    }
    function isActivehandler() {
        setInputValue({ ...inputValues, isActive: !inputValues.isActive });
    }
    function register(){
        axios.post('http://localhost:4000/addData', inputValues)
            .then(response => {
                setSuccessMessage("Project Added successfully ...")
                setSuccessStatus(true)
                setErrorStatus(false)
            }).catch(error => {
                setErrorMessage("Project addition failed...!")
                setErrorStatus(true)
                setSuccessStatus(false)
            })
    }
    function handleSubmit(event) {
        event.preventDefault();
        register();
        // goBack()

    }


    const checkValidation = () => {
        let errors = validation;


        if (!inputValues.pName.trim()) {
            errors.pName = "Project name is required";
        } else {
            errors.pName = "";
        }

        if (!inputValues.pDescription.trim()) {
            errors.pDescription = "Description is required";
        } else {
            errors.pDescription = "";
        }

        if (inputValues.skillSet.length === 0) {
            errors.skillSet = "Select skills";
        } else {
            errors.skillSet = "";
        }

        if (!inputValues.noOfMembers.trim()) {
            errors.noOfMembers = "select no. of members";
        } else {
            errors.noOfMembers = "";
        }
        
        if(!validation.pName.trim() && !validation.pDescription.trim() && !validation.skillSet.trim() && !validation.noOfMembers.trim()){
            setbtnStatus(false)
        }
        else{
            setbtnStatus(true)
        }
        setValidation(errors);
    };

    useEffect(() => {
        checkValidation();
    }, [inputValues]);


    return (

        <div >
            {backButton ? <Home /> :
                <div className='addForm  shadow-lg p-3 mb-5 bg-white rounded'>
                    <h1 className="form-group"> Add a new Project here</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={handleChange} name="pName" id="pName" aria-describedby="emailHelp" placeholder="Project Name" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={handleChange} name='pDescription' id="pDescription" placeholder="Project Description" />
                        </div>

                        <div className="form-group ">
                            <label className="form-check-label" htmlFor="skillset">Select Skills</label>
                            <select multiple className="form-control select" id='skillset' name='skillSet' onChange={handleChange}>
                                <option>Asp.Net</option>
                                <option>PHP</option>
                                <option>Java</option>
                                <option>ReactJs</option>
                                <option>React Native</option>
                                <option>AngularJs</option>
                                <option>NodeJs</option>
                                <option>PWA</option>
                                <option>Flutter</option>
                                <option>VueJs</option>
                                <option>Vanilla Js</option>
                                <option>SQL Server</option>
                                <option>My SQL</option>
                                <option>MongoDB</option>
                                <option>HTML</option>
                                <option>CSS</option>
                                <option>JavaScript/jQuery</option>

                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-check-label" htmlFor="noOfMembers">Select Number of members</label>
                            <select className="form-control" id="noOfMembers" value={inputValues.noOfMembers} name='noOfMembers' onChange={handleChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5 or 5+">5 or 5+</option>
                            </select>
                        </div>

                        <div className="form-check ">
                            <input type="checkbox" className="form-check-input" id="isActive" onChange={isActivehandler} name='isActive' />
                            <label className="form-check-label" htmlFor="isActive" >Is Active?</label>
                        </div>
                        <div className='buttonMap row text-center'>
                            <div className='buttonPlace col-md-6'>
                                <button type="submit" className="btn btn-primary btn-lg " disabled={btnStatus}>Save</button>
                            </div>
                            <div className='buttonPlace col-md-6'>
                                <button type="button" className="btn btn-warning btn-lg" onClick={goBack}>Back</button>
                            </div>
                        </div>
                        <div>
                            {
                                successStatus? <span className='text-success'>{successMessage}</span>:""
                                
                            }
                            {
                                errorStatus? <span className='text-danger'>{errorMessage}</span>:""
                            }
                        </div>
                    </form>
                </div>
            }
        </div>

    );
}

export default AddProject;
