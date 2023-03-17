import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../App.css";
import { Col, FormGroup, Form, Input, Button, Row, Label } from 'reactstrap';
import 'animate.css';
import { Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment';


function Location() {
    const [location, setLocation] = React.useState('')
    const [hide, setHide] = React.useState(false);
    const [manager, setManager] = React.useState('')
    const [opsLeader, setOpsLeader] = React.useState('')
    const [answers, setAnswers] = React.useState([])
    const [showA, setShowA] = React.useState(false);

    return (
        <div>
            {/* toast for error handling */}
            <ToastContainer className="p-3" position="top-center">
                <Toast className='mx-auto' show={showA} onClose={() => setShowA(false)} delay={3000} autohide>
                    <Toast.Header className='mx-auto'>
                        <img src="holder.js/20x20?text=%20" className="rounded mx-auto" alt="" />
                        <img src="../images/ecosureLogo.png" className="tiny mx-auto" alt="wendy" />
                    </Toast.Header>
                    <Toast.Body className='rounded' style={{ backgroundColor: '#999999', color: 'white', fontSize: '1.5em' }}
                    >Select a Location to Continue!</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* getting started area */}
            <div className="text-center animate__animated animate__fadeIn">
                <Col className="mx-auto" xs="10" lg="6"><img style={{ width: hide && location ? '15%' : '30%' }} className="logo animate__animated animate__pulse animate__infinite infinite" alt="wendy" src="../images/wendyLogo.png" /></Col>
                <Col className="mx-auto" xs="10" lg="6"><img style={{ width: hide && location ? '40%' : '60%' }} className="logo" alt="ecosure" src="../images/ecosureLogo.png" /></Col>
                <h1 style={{ fontSize: hide && location ? '1.75em' : '2em' }} className="display-3 mt-2 animate__animated animate__backInRight">Critital Evaluation</h1>
                <hr className="display-3" />
                <p className="lead animate__animated animate__backInLeft">
                    <Form style={{ display: hide && location ? 'none' : 'block' }} onSubmit={(e) => { e.preventDefault(); setHide(false) }}>
                        <FormGroup className="animate__animated animate__fadeIn" tag="fieldset">
                            <h2>Select Your Location</h2>
                            <Col className="mx-auto" xs="5">
                                <Input required onChange={(e) => { setLocation(e.target.value); console.log(location) }}
                                    className="text-center" type="select" name="location" id="exampleSelect">
                                    <option value="" disabled selected>My location</option>
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
                                setShowA(true)

                            }
                        }} className="animate__animated animate__fadeIn" color="primary">Get Started</Button>
                    </Form>
                </p>
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
                <h2 className="animate__animated animate__backIn">1.1.4 Proper Glove Use
                </h2>
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
                                Handwashing sinks stocked with soap and paper towels
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
                                Gloves must be worn over band aids or bandages
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
                                Bandaids must be blue or bright in color
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
                <hr className="display2 mt-2 mb-4" />
                <Row className='mx-auto'>
                    {/* Center these columns */}

                    <Col className='col-sm-12 col-md-6 mx-auto offset-md-2'>
                        <FormGroup check>
                            <Input type="checkbox" />
                            <p className='text-start'>
                                No eating, drinking, chewing gum, or tobacco use in food preparation areas
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
                                Employees only eating and drinking in designated areas away from food
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
                <h2 className="animate__animated animate__backIn">1.1.1 No Employees Working ill</h2>
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
                <h2 className="animate__animated animate__backIn">1.2.1 Cutting Boards
                </h2>
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
            </div>
            <div style={{ display: hide && location ? 'block' : 'none' }} className="animate__animated animate__fadeIn padding20">
                <h2 className="animate__animated animate__backIn">1.2.2 Grill Spatulas
                </h2>
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
                                Cutting boards clean and free from food debris or contaminants

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
                        <Col className="mx-auto" xs="5">
                            <Input required onChange={(e) => { setManager(e.target.value); console.log(manager) }}
                                className="text-center" type="text" name="manager" id="manager" placeholder="Evaluator Name" />
                        </Col>
                        <h2>Operations Leader Name</h2>
                        <Col className="mx-auto" xs="5">
                            <Input required onChange={(e) => { setOpsLeader(e.target.value); console.log(opsLeader) }}
                                className="text-center" type="text" name="manager" id="manager" placeholder="Manager Name" />
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        </div>
    );
}


export default Location;