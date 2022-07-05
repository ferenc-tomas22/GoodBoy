import { useTranslation } from 'react-i18next'
import Footer from './Footer'
import { Container, Col, Row } from 'react-bootstrap'

const Home = () => {
  const { t } = useTranslation()
  return (
    <>
      <Container className='d-flex justify-content-center'>
        <Col>
          <Row className='text-center mt-2'>
            <h1>{ t('foundationName') }</h1>
            <h5>{ t('foundationDesc') }</h5>
          </Row>
          <Row className='d-flex justify-content-center'>
            <div className='dog'>
              <div className='heart heart--1'></div>
              <div className='heart heart--2'></div>
              <div className='heart heart--3'></div>
              <div className='heart heart--4'></div>
              <div className='head'>
                <div className='year year--left'></div>
                <div className='year year--right'></div>
                <div className='nose'></div>
                <div className='face'>
                  <div className='eye eye--left'></div>
                  <div className='eye eye--right'></div>
                  <div className='mouth'></div>
                </div>
              </div>
              <div className='body'>
                <div className='cheast'></div>
                <div className='back'></div>
                <div className='legs'>
                  <div className='legs__front legs__front--left'></div>
                  <div className='legs__front legs__front--right'></div>
                  <div className='legs__back legs__back--left'></div>
                  <div className='legs__back legs__back--right'></div>
                </div>
                <div className='tail'></div>
              </div>
            </div>
          </Row>
        </Col>
      </Container>
      <Footer />
    </>
  )
}

export default Home