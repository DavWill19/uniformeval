import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../App.css";
import {
    Col, FormGroup, Form, Input, Button, Row, Modal, Card,
    ModalHeader, ModalBody,
} from 'reactstrap';
import 'animate.css';
import { Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment';
import axios from "axios";

function Location() {
    const [location, setLocation] = React.useState('')
    const [thanks, setThanks] = React.useState(false)
    const [hide, setHide] = React.useState(false);
    const [manager, setManager] = React.useState('')
    const [opsLeader, setOpsLeader] = React.useState('')
    const [notes, setNotes] = React.useState('')
    const [answers, setAnswers] = React.useState([])
    const [wrongAnswers, setWrongAnswers] = React.useState([])
    const [showA, setShowA] = React.useState(false);
    const [showB, setShowB] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [image, setImage] = React.useState('../images/1.1.1.png')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [date, setDate] = React.useState(moment().format('MMMM Do YYYY, h:mm:ss a'))
    const [disabled, setDisabled] = React.useState(false)

    function thankYou() {

        axios.post("https://crewcoin.herokuapp.com/work", {
            location: location,
            manager: manager,
            opsLeader: opsLeader,
            notes: notes,
            answers: answers,
            wrongAnswers: wrongAnswers,
            date: date
        }, {
            headers: {
                Authorization: "none",
                "Accept": "application/json",
                "Content-Type": "application/json",
                mode: "cors"
            }
        })
            .then(res => {
                if (res.data.success) {
                    console.log('success');
                    console.log(res.data.work);
                    setThanks(true);

                } else {
                    setErrorMessage("Something went wrong, please try again.");
                    setShowB(true);
                }
            })
            .catch(err => {
                setErrorMessage("Something went wrong, please try again.");
                setShowB(true);
                setTimeout(() => {
                    setShowB(false)
                }, 5000);
            });

    }
    // get checked input .nextSibling.innerText
    function getChecked() {
        let checked = document.querySelectorAll('input:checked');
        let checkedArray = Array.from(checked); // or let checkedArray = [...checked];

        let filteredRemoveTemp = checkedArray.filter((item) => {
            //   doesnt include the word Holding
            return !item.nextSibling.innerText.includes('- Holding')
        });

        filteredRemoveTemp.forEach((item) => {
            answers.push(item.nextSibling.innerText)
        })
    }

    function getNonChecked() {
        let unchecked = document.querySelectorAll('.form-check-input:not(:checked)')

        unchecked.forEach((item) => {
            wrongAnswers.push(item.nextSibling.innerText)
        })
    }

    function setRed(item) {
        document.getElementById(item).style.borderColor = 'red'
    }
    function setGray(item) {
        document.getElementById(item).style.borderColor = '#ced4da'
        setShowB(false)
    }



    function sendData() {
        switch ('') {
            case manager:
                setErrorMessage('Please enter your name!');
                setRed('manager');
                setShowB(true);
                setTimeout(() => {
                    setShowB(false)
                }, 3000);
                break;
            case opsLeader:
                setErrorMessage('Please enter the name of your operations leader!');
                setRed('opsLeader');
                setShowB(true);
                setTimeout(() => {
                    setShowB(false)
                }, 3000);
                break;
            case notes:
                setErrorMessage('Please enter notes from the evaluation!');
                setRed('notes');
                setShowB(true);
                setTimeout(() => {
                    setShowB(false)
                }, 3000);
                break;
            default:
                console.log('all good');

                getChecked();
                getNonChecked();
                console.log('location:', location);
                console.log('manager:', manager);
                console.log('opsLeader:', opsLeader);
                console.log('notes:', notes);
                console.log('answers:', answers);
                console.log('wrongAnswers:', wrongAnswers);
                console.log('date:', moment().format('MMMM Do YYYY, h:mm:ss a'));
                thankYou();
        }
    }


    return (
        <div>
            {/* toast for error handling */}

            {/* thank you toast */}
            <Modal onClick={() => { setModal(false) }} isOpen={modal} className="">
                <ModalBody>
                    <img src={image} className="mx-auto modalImage" alt="wendy" />
                </ModalBody>
            </Modal>

            {/* homemade toast for error handling */}
            <div style={{ display: showB ? 'block' : 'none' }} className="animate__animated animate__fadeIn cardContainer">
                <Card className="mx-auto" style={{ width: '18rem' }}>
                    <img src="../images/wendyLogo.png" className="smallest mx-auto mt-2" alt="wendy" />
                    {errorMessage}
                </Card>
            </div>

            {/* thank you area */}
            <div style={{ display: thanks ? 'block' : 'none' }} className="animate__animated animate__fadeIn">
                <Col className="mx-auto" xs="10" lg="6"><img style={{ width: hide && location ? '15%' : '30%' }} className="logo animate__animated animate__pulse" alt="wendy" src="../images/wendyLogo.png" /></Col>
                <h1 className="display-3 mt-2 animate__animated animate__backInRight">Thank You!</h1>
                <hr className="display-3" />
                <p className="lead animate__animated animate__backInLeft">
                    Check your email for a copy of your completed evaluation.
                </p>
            </div>

            {/* getting started area */}
            <div style={{ display: thanks ? 'none' : 'block' }}>
                <div
                    className="text-center animate__animated animate__fadeIn">
                    <Col className="mx-auto" xs="10" lg="6"><img style={{ width: hide && location ? '15%' : '30%' }} className="logo animate__animated animate__pulse" alt="wendy" src="../images/wendyLogo.png" /></Col>
                    <h1 style={{ fontSize: hide && location ? '1.75em' : '2em' }} className="display-3 mt-2 animate__animated animate__backInRight">Uniform Evaluation</h1>
                    <hr className="display-3" />
                    <div className="lead animate__animated animate__backInLeft">
                        <Form style={{ display: hide && location ? 'none' : 'block' }} onSubmit={(e) => { e.preventDefault(); setHide(false) }}>
                            <FormGroup className="animate__animated animate__fadeIn" tag="fieldset">
                                <h2>Select Your Location</h2>
                                <Col className="mx-auto" xs="5">
                                    <Input required onChange={(e) => { setLocation(e.target.value); console.log(location) }}
                                        defaultValue=""
                                        className="text-center" type="select" name="location" id="exampleSelect">
                                        <option value="" disabled>My location</option>
                                        <option name="Johnstown" value="Johnstown">Johnstown</option>
                                        <option name="Somerset" value="Somerset">Somerset</option>
                                        <option name="Bedford" value="Bedford">Bedford</option>
                                        <option name="Hollidaysburg" value="Hollidaysburg">Hollidaysburg</option>
                                        <option name="Altoona-Plank Rd" value="Altoona-Plank Rd">Altoona-Plank Rd</option>
                                        <option name="Altoona-Cricketfield" value="Altoona-Cricketfield">Altoona-Cricketfield</option>
                                        <option name="Ebensburg" value="Ebensburg">Ebensburg</option>
                                        <option name="Clarion" value="Clarion">Clarion</option>
                                        <option name="Indiana" value="Indiana">Indiana</option>
                                        <option name="Dubois" value="Dubois">Dubois</option>
                                        <option name="St-Marys" value="St-Marys">St-Marys</option>
                                        <option name="Punxsutawney" value="Punxsutawney">Punxsutawney</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <Button onClick={() => {
                                if (location) {
                                    setHide(true)
                                } else {
                                    setErrorMessage('Please select a location')
                                    setShowA(true)

                                }
                            }} className="animate__animated animate__fadeIn" color="primary">Get Started</Button>
                        </Form>
                    </div>
                </div>
                {/* new form area */}
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn">
                    <h4 className=" smallText animate__animated animate__backIn">Location: {location}</h4>
                    <h4 className=" smallText animate__animated animate__backIn">Date: {moment().format('MMMM Do YYYY')}</h4>
                    <hr className="display-3" />
                </div>
                {/* form questions */}
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.1.1 No Employees Working ill</h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.1.1.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    No employees showing any signs of illness
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    No employees discussing being sick
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    No employees with open wounds or sores
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />

                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.1.2 Handwashing Sinks Accessible, Stocked and Used Properly</h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.1.2.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Handwashing is completed only at a designated hand washing sink.
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Access to handwashing sinks, soap, and paper towels should remain unobstructed at all
                                    times.
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Nothing in front of, on, or in the sink basin
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Sink area is not a source of hand re-contamination & is able to drain/function
                                    properly.
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Employees wash hands when returning from dining areas, outside areas, and restrooms.
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />

                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.1.3 Proper Handwashing and Hygiene Observed</h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.1.3.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Hands are washed for at least 20 seconds with soap and water
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Employees use paper towels to turn off faucets and immediately discard without re-contaminating hands
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Hands are washed every time employees touch their face, hair, or any other part of their body or leave their designated area
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />

                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.1.4 Proper Glove Use
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.1.4.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Disposable, vinyl gloves are worn by food handlers when touching ready-to-eat foods
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Soiled gloves are changed between tasks
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Hands are always washed before putting on gloves
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Handwashing water temp is above 100 degrees
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Gloves must be worn over band aids or bandages & Bandaids must be blue or bright in color
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Ice scoop is used to handle ice & when completed is stored in ice scoop holder
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Gloves must be worn when dropping product
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Contaminated gloves should be taken off prior to handling cooking baskets
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />

                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.1.5 Proper Eating/Drinking, No Gum or Tobacco-Use
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.1.5.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Employees remove apron prior to restroom use and trash handling
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Employees only eating and drinking in designated areas away from food / no chewing gum or tobacco use
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    No ciggarettes, cigars, pipes, or chewing tobacco in food preparation areas
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Handwashing sinks stocked with soap and paper towels
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.2.1 Cutting Boards/Tomato Slicer/Tomato Dicer
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.2.1.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    No black discoloration on cutting boards

                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Tomato slicer and tomato dicer cleaned and sanitized free of debris or soil
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    All prep equipment stored in clean and sanitized area
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.2.2 Grill Spatulas
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.2.2.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Grill operator only handles red spatula
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Grill operator only touches red buttons on DSG

                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    During breakfast, if the sandwich maker handles the amber spatula,
                                    white rubber spatula or the egg ring, they must wash their hands and change
                                    gloves before touching any other food or food-contact surface
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.2.3 Grill Towels
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.2.3.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Pink towels must be stored in sanitizer at the grill
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Pink towels cannot be used for anything other than sanitizing the grill
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Paper towels are not to be stored at the grill area
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.2.4 Storage Levels
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.2.4.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Raw protein items should be stored away from or below fresh produce and ready-to-eat foods
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Upright freezer shelving order follows product cook time
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Bacon, eggs, and beef are stored on bottom shelf in walk in cooler
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.2.5 Immediate cross-contamination
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.2.5.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Ice should be treated as a food item and no items should be stored directly in ice in the
                                    ice machine or ice bins
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Employees must wash hands and change gloves before starting new tasks
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Employees avoid touching contaminated surfaces, hair, and clothing
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Carryover chili must be stored in a 22-quart container with Rapi-Kool in
                                    center vented, and covered before cooling completely
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Chili meat observed in refrigeration must be in the thawing
                                    process and bags should only be stacked once completely frozen
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    No carryover cheese sauces or gravy should be stored in the walk-in cooler
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Employees wash hands before handling food, especially after handling money or cleaning chemicals
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Chemicals are stored in a separate area away from food and equipment
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.4.9 Frosty Cream Carafe - Holding Time
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.4.9.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Frosty Carafe must have 4 hour expiration time marked on carafe
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Hold time on carafes must not be expired
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.3.1 Flies (Large or Small)
                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.3.1.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    No more than 4 flies of the same type in one area (dead or alive)
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Only approved fly traps and chemicals are to be used
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">1.4.6 Prepped Sandwich Lettuce/Sliced Tomatoes

                    </h2>
                    <Button onClick={() => {
                        setModal(!modal)
                        setImage('../images/1.4.6.png')
                    }} className="animate__animated animate__fadeIn mt-2 mb-2" color="danger">View Documentation</Button>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Sliced tomatoes on the service line must be held at or below the temperature standard
                                    of 70°F/21°C and must be marked with a 6-hour hold time and the initial temperature
                                    of 41°F or less
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Ready-to-serve sandwich lettuce on the service line must be held at or below the
                                    temperature standard of 70°F/21°C and must be marked with a 6-hour hold time and
                                    the initial temperature of 41°F or less
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>

                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                    <h2 className="animate__animated animate__backIn">Product Temperatures
                    </h2>
                    <h6>(Calibrate thermometer and check the following temperatures:)</h6>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Eggs / Sausage- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Raw Beef- Holding 41°F or below
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Cooked Beef- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Raw Beef- Holding 41°F or below
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Classic Chicken- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Spicy Chicken- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Grilled Chicken- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Crispy Chicken- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Chicken Nuggets- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Chili- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Cheese Sauce- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Frosty Hopper - Holding 41°F or below
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Chili meat- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                    <Row className='mx-auto'>
                        {/* Center these columns */}

                        <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <p className='text-start'>
                                    Eggs and Sausage- Holding 135°F or above
                                </p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="display2 mt-2 mb-4" />
                </div>

                {/* form input for manager name */}
                <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn">
                    <hr className="display-3 mt-2 mb-2" />
                    <Form>
                        <FormGroup className="animate__animated animate__fadeIn" tag="fieldset">
                            <h2>Evaluator Name</h2>
                            <Col className="mx-auto" xs="6" md="4">
                                <Input required onChange={(e) => { setManager(e.target.value); setGray('manager') }}
                                    className="text-center" type="text" name="manager" id="manager" placeholder="Your Name" />
                            </Col>
                            <h2>Operations Leader Name</h2>
                            <Col className="mx-auto" xs="6" md="4">
                                <Input required onChange={(e) => { setOpsLeader(e.target.value); setGray('opsLeader') }}
                                    className="text-center" type="text" name="opsLeader" id="opsLeader" placeholder="Ops-Leader's Name" />
                            </Col>
                            <h2>Notes from evaluation</h2>
                            <Col className="mx-auto" xs="10" md="6">
                                <Input height="200" required onChange={(e) => { setNotes(e.target.value); setGray('notes') }}
                                    className="text-center" type="textarea" name="notes" id="notes" placeholder="Notes" />
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <ToastContainer className="p-3" position="bottom-center">
                    <Toast className='mx-auto' show={showA} onClose={() => setShowA(false)} delay={3000} autohide>
                        <Toast.Header className='mx-auto'>
                            <img src="holder.js/20x20?text=%20" className="rounded mx-auto" alt="" />
                        </Toast.Header>
                        <Toast.Body className='rounded' style={{ backgroundColor: '#999999', color: 'white', fontSize: '1.5em' }}
                        >{errorMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
                <Button disabled={disabled}
                    onClick={() => {
                        sendData();
                    }} style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn mx-auto mb-5" color="primary">Submit</Button>
            </div>
        </div>
    );
}


export default Location;