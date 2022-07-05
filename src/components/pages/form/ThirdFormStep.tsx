import React from 'react'
import { useShelters, defaultFormDataStructure } from '../../../AppContext'
import { useTranslation } from 'react-i18next'
import { Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../utils/Loader'
import { motion } from 'framer-motion'

// Constants
const formName = 'checkInformationForm'

const API_POST_SHELTERS = import.meta.env.VITE_API_POST_SHELTERS

const ThirdFormStep = () => {
  const { t } = useTranslation()
  const navigate  = useNavigate()
  const formData = useShelters(state => state.formData)
  const shelters = useShelters(state => state.shelters)
  const currentFormStep = useShelters(state => state.currentFormStep)
  const setFormData = useShelters(state => state.setFormData)
  const setCurrentFormStep = useShelters(state => state.setCurrentFormStep)
  const [ formValidate, setFormValidate ] = React.useState(false)
  const [ loading, setLoading ] = React.useState(false)

  const submitForm = async () => {
    const personalInfoForm = document.forms[ formName ] as HTMLFormElement
    if (!personalInfoForm.checkValidity()) {
      setFormValidate(true)
      return
    }
    setLoading(true)
    try {
      const response = await fetch(API_POST_SHELTERS, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          value: parseInt(formData.contributionAmount),
          ...(formData.phone && { phone: formData.phone }),
          ...(formData.selectedShelterId && { shelterID: formData.selectedShelterId }),
        })
      })
      if (response.status === 200) {
        navigate('/thankyou')
        setCurrentFormStep(1)
        setFormData(defaultFormDataStructure)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Loader show={ loading } />
      <Form
        name={ formName }
        validated={ formValidate }
        className='w-50 p-4 mt-5 bg-white rounded-3 border border-dark'
      >
        <Form.Group className='d-flex flex-column mb-3'>
          <Form.Label className='fw-bold m-0'>{ t('supportType') }</Form.Label>
          <Form.Label className='m-0'>
            { formData.supportEntireFoundation ? t('entireFoundation') : t('specificShelter') }
          </Form.Label>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3'>
          <Form.Label className='fw-bold m-0'>{ t('shelterType') }</Form.Label>
          <Form.Label className='m-0'>
            { shelters.find(shelter => shelter.id === formData.selectedShelterId)?.name ?? '' }
          </Form.Label>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3'>
          <Form.Label className='fw-bold m-0'>{ t('amountType') }</Form.Label>
          <Form.Label className='m-0'>{ formData.contributionAmount }</Form.Label>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3'>
          <Form.Label className='fw-bold m-0'>{ t('firstName') + ' ' + t('lastName') }</Form.Label>
          <Form.Label className='m-0'>{ `${ formData.firstName } ${ formData.lastName }` }</Form.Label>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3'>
          <Form.Label className='fw-bold m-0'>{ t('email') }</Form.Label>
          <Form.Label className='m-0'>{ formData.email }</Form.Label>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3'>
          <Form.Label className='fw-bold m-0'>{ t('phone') }</Form.Label>
          <Form.Label className='m-0'>{ `${ formData.phonePrefix }${ formData.phone }` }</Form.Label>
        </Form.Group>
        <Form.Group className='d-flex flex-column mb-3'>
          <Form.Check
            label={ t('processingPersonalInfo') }
            type='checkbox'
            value={ formData.processingPersonalData }
            onChange={ (e: any) => setFormData({ ...formData, processingPersonalData: e.target.value }) }
            required
          />
        </Form.Group>
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
          onClick={ submitForm }
        >
          { t('submit') }
        </motion.button>
      </Row>
    </>
  )
}

export default ThirdFormStep