import React, { useState } from 'react';
import './conversor.css';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import CoinList from './coin-list';
import axios from 'axios';

function Conversor() {

  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3';

  const [value, setValue] = useState('1');
  const [coinTypeFrom, setCoinTypeFrom] = useState('BRL');
  const [coinTypeTo, setCoinTypeTo] = useState('USD');
  const [showSpinner, setShowSpinner] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [conversionResult, setConversionResult] = useState('');
  const [ showErrorMsg, setShowErrorMsg]  = useState(false);

  function changeValue(event) {
    setValue(event.target.value.replace(/\D/g, ''));
  }

  function changeCoinTypeFrom(event) {
    setCoinTypeFrom(event.target.value);
  }

  function changeCoinTypeTo(event) {
    setCoinTypeTo(event.target.value);
  }

  function hideModal(event) {
    setValue('1');
    setCoinTypeFrom('BRL');
    setCoinTypeTo('USD');
    setFormValidated(false);
    setShowModal(false);
  }

  function convert(event) {

    event.preventDefault();
    setFormValidated(true);

    if (event.currentTarget.checkValidity() === true) {
      //requisição fixer.io
      setShowSpinner(true);

      axios.get(FIXER_URL).then(res =>{

        const finalPrice = getFinalPrice(res.data);

        if (finalPrice) {
          setConversionResult(`${value} ${coinTypeFrom} = ${finalPrice} ${coinTypeTo}`);
          setShowModal(true);
          setShowSpinner(false);
          setShowErrorMsg(false);
        } else {
          showError();
        }
      }).catch(err => showError());      
    } 
  }

  function getFinalPrice(dataPrice){
    if (!dataPrice || dataPrice.success !== true) {
      return false;
    }
    const priceFrom = dataPrice.rates[coinTypeFrom];
    const priceTo = dataPrice.rates[coinTypeTo];
    const finalPrice = (1 / priceFrom * priceTo) * value;
    return finalPrice.toFixed(2);
  }

  function showError() {
    setShowErrorMsg(true);
    setShowSpinner(false);
  }

  return (
    <div>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={showErrorMsg}>
        Erro obtendo dados de conversão. Tente novamente.
      </Alert>
      <Jumbotron>
        <Form onSubmit={convert} noValidate validated={formValidated}>
          <Form.Row>

            <Col sm="3">
              <Form.Control 
                placeholder="0"
                value={value}
                onChange={changeValue}
                required />
            </Col>

            <Col sm="3">
              <Form.Control as="select"
              value={coinTypeFrom}
              onChange={changeCoinTypeFrom}>
                <CoinList />
              </Form.Control>
            </Col>

            <Col sm="1" className="text-center" style={{paddingTop:'5px'}}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>

            <Col sm="3">
              <Form.Control as="select"
              value={coinTypeTo}
              onChange={changeCoinTypeTo}>
                <CoinList />
              </Form.Control>
            </Col>

            <Col sm="2">
              <Button variant="success" type="submit" data-testid="btn-converter">
                <span className={showSpinner ? null : 'hidden'}>
                  <Spinner animation="border" size="sm" />
                </span>
                <span className={showSpinner ? 'hidden' : null} >
                  Converter
                </span>
              </Button>
            </Col>

          </Form.Row>
        </Form>

        <Modal show={showModal} onHide={hideModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {conversionResult} 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={hideModal}>
              Nova conversão
            </Button>
          </Modal.Footer>
        </Modal>

      </Jumbotron>
    </div>
  );
}

export default Conversor;
