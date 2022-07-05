import React from 'react'
import { useShelters } from '../../../AppContext'
import { useTranslation } from 'react-i18next'
import { Form, InputGroup, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'

// Constants
const formName = 'personalInfoForm'
const skPhonePrefix = '+421'
const czPhonePrefix = '+420'
const emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
const phonePattern = '[0-9]{9}'

const SecondFormStep = () => {
  const { t } = useTranslation()
  const formData = useShelters(state => state.formData)
  const setFormData = useShelters(state => state.setFormData)
  const currentFormStep = useShelters(state => state.currentFormStep)
  const setCurrentFormStep = useShelters(state => state.setCurrentFormStep)
  const [ formValidate, setFormValidate ] = React.useState(false)

  const validateForm = () => {
    const warehouseForm = document.forms[ formName ] as HTMLFormElement
    if (!warehouseForm.checkValidity()) {
      setFormValidate(true)
      return
    }
    setCurrentFormStep(currentFormStep + 1)
  }

  return (
    <>
      <Form
        name={ formName }
        validated={ formValidate }
        className='w-50 p-4 mt-5 bg-white rounded-3 border border-dark'
      >
        <Row className='text-center'>
          <h4>{ t('personalInfo') }</h4>
        </Row>
        <Row>
          <Form.Group className='mb-3'>
            <Form.Label>{ t('firstName') }</Form.Label>
            <Form.Control
              type='text'
              placeholder={ t('enterFirstNamePlaceholder') }
              value={ formData.firstName }
              onChange={ (e: { target: { value: string } }) => setFormData({ ...formData, firstName: e.target.value }) }
              required
            />
            <Form.Control.Feedback type='invalid'>
              { t('emptyField', { name: t('firstName') }) }
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className='mb-3'>
            <Form.Label>{ t('lastName') }</Form.Label>
            <Form.Control
              type='text'
              placeholder={ t('enterLastNamePlaceholder') }
              value={ formData.lastName }
              onChange={ (e: { target: { value: string } }) => setFormData({ ...formData, lastName: e.target.value }) }
              required
            />
            <Form.Control.Feedback type='invalid'>
              { t('emptyField', { name: t('lastName') }) }
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className='mb-3'>
            <Form.Label>{ t('email') }</Form.Label>
            <Form.Control
              type='email'
              placeholder={ t('enterEmailPlaceholder') }
              pattern={ emailPattern }
              value={ formData.email }
              onChange={ (e: { target: { value: string } }) => setFormData({ ...formData, email: e.target.value }) }
              required
            />
            <Form.Control.Feedback type='invalid'>
              { t('emptyField', { name: t('email') }) }
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className='mb-3'>
            <Form.Label>{ t('phone') }</Form.Label>
            <InputGroup>
              <InputGroup.Text className='px-2'>
                {
                  formData.phonePrefix === skPhonePrefix ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16"
                      height="16"
                      viewBox="0 0 512 512"
                    >
                      <path fill="#ee1c25" d="M0 0h512v512H0z"/>
                      <path fill="#0b4ea2" d="M0 0h512v341.3H0z"/>
                      <path fill="#fff" d="M0 0h512v170.7H0z"/>
                      <path fill="#fff" d="M203.2 395.5c-45.9-22-111.5-66-111.5-152.8s4.1-126.2 4.1-126.2h214.8s4.2 39.4 4.2 126.2S249 373.4 203.2 395.5z"/>
                      <path fill="#ee1c25" d="M203.2 384c-42.1-20.3-102.3-60.5-102.3-140.2s3.8-115.8 3.8-115.8h197s3.8 36.2 3.8 115.8-60.2 120-102.3 140.2z"/>
                      <path fill="#fff" d="M212.2 223c11.4.2 33.7.6 53.5-6 0 0-.6 7-.6 15.3s.6 15.3.6 15.3a172 172 0 0 0-53.5-6v44h-18v-44a172 172 0 0 0-53.5 6s.6-7 .6-15.3-.6-15.3-.6-15.3c19.9 6.6 42.1 6.2 53.5 6v-27.7a128 128 0 0 0-42.3 6.1s.5-7 .5-15.3-.5-15.4-.5-15.4c17 5.7 31.9 6.2 42.2 6-.5-17.4-5.6-39.4-5.6-39.4s10.5.8 14.7.8c4.2 0 14.7-.8 14.7-.8s-5.1 22-5.7 39.5a126 126 0 0 0 42.3-6s-.5 7-.5 15.3.5 15.3.5 15.3c-17-5.7-31.9-6.1-42.3-6V223z"/>
                      <path fill="#0b4ea2" d="M203.2 280.8c-21.2 0-32.6 29.4-32.6 29.4s-6.3-14-23.6-14c-11.7 0-20.3 10.5-25.8 20.2 21.3 33.8 55.3 54.7 82 67.6 26.7-12.9 60.7-33.8 82-67.7-5.5-9.6-14.1-20-25.8-20-17.3 0-23.6 14-23.6 14s-11.4-29.5-32.6-29.5z"/>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="16"
                      height="16" 
                    >
                      <path fill="#fff" d="M0 0h512v256H0z"/>
                      <path fill="#d7141a" d="M0 256h512v256H0z"/>
                      <path fill="#11457e" d="M300 256 0 56v400z"/>
                    </svg>
                  )
                }
              </InputGroup.Text>
              <InputGroup.Text className='bg-white'>
                <Form.Select
                  className='border-0'
                  size='sm'
                  onChange={ (e: { target: { value: string } }) => setFormData({ ...formData, phonePrefix: e.target.value }) }
                >
                  <option value={ skPhonePrefix }>
                    { skPhonePrefix }
                  </option>
                  <option value={ czPhonePrefix }>
                    { czPhonePrefix }
                  </option>
                </Form.Select>
              </InputGroup.Text>
                <Form.Control
                  type='tel'
                  size='sm'
                  pattern={ phonePattern }
                  placeholder={ t('enterPhonePlaceholder') }
                  value={ formData.phone }
                  onChange={ (e: { target: { value: string } }) => setFormData({ ...formData, phone: e.target.value }) }
                />
            </InputGroup>
          </Form.Group>
        </Row>
      </Form>
      <Row className='w-50 mt-4 d-flex justify-content-between'>
        <motion.button
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          className='btn btn-secondary btn-sm w-25'
          onClick={ () => setCurrentFormStep(currentFormStep - 1) }
        >
          { t('back') }
        </motion.button>
        <motion.button
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          className='btn btn-success btn-sm w-25'
          onClick={ validateForm }
        >
          { t('next') }
        </motion.button>
      </Row>
    </>
  )
}

export default SecondFormStep