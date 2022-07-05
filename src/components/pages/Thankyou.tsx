import { useTranslation } from 'react-i18next'
import { Container, Col, Row } from 'react-bootstrap'

const Thankyou = () => {
  const { t } = useTranslation()
  return (
    <Container className='d-flex justify-content-center'>
      <Col>
        <Row className='text-center p-5'>
          <h1>{ t('foundationName') }</h1>
          <h5>{ t('thankYou') }</h5>
        </Row>
        <Row className='d-flex justify-content-center p-5'>
          <div className='dog'>
            <div className='heart heart--1'></div>
            <div className='heart heart--2'></div>
            <div className='heart heart--3'></div>
            <div className='heart heart--4'></div>
          </div>
        </Row>
      </Col>
    </Container>
  )
}

export default Thankyou
