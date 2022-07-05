import React from 'react'
import { useShelters, ShelterType } from '../../../AppContext'
import { useTranslation } from 'react-i18next'
import { Form, ListGroup, Row } from 'react-bootstrap'
import { Loader } from '../../utils/Loader'
import { motion } from 'framer-motion'

// Constants
const specificShelter = 'specificShelter'
const entireFoundation = 'entireFoundation'

const API_GET_SHELTERS = import.meta.env.VITE_API_GET_SHELTERS

const FirstFormStep = () => {
  const { t } = useTranslation()
  const contributionAmounts = t('contributionAmount', { returnObjects: true }) as string[]
  const { shelters, setShelters, formData, setFormData, currentFormStep, setCurrentFormStep } = useShelters()
  const [ loading, setLoading ] = React.useState(false)

  React.useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const getShelters = async () => {
      setLoading(true)
      try {
        const response = await fetch(API_GET_SHELTERS, { signal })
        const shelters = await response.json() as { shelters: ShelterType[] }
        if (shelters.shelters.length > 0) {
          setShelters(shelters.shelters)
          setFormData({
            ...formData,
            selectedShelterId: shelters.shelters[ 0 ].id,
            contributionAmount: contributionAmounts[ 0 ],
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    getShelters()
    return () => controller.abort()
  }, [])

  return (
    <>
      <Loader show={ loading } />
      {
        !loading && (
          <>
            <Form className='w-50 p-5 mt-4 bg-white rounded-3 border border-dark'>
              <Row className='text-center'>
                <h4>{ t('donateTitle') }</h4>
              </Row>
              <Row className='mt-4'>
                <ListGroup horizontal>
                  <ListGroup.Item
                    id={ specificShelter }
                    action
                    active={ !formData.supportEntireFoundation }
                    onClick={ (e: any) => {
                      e.preventDefault()
                      setFormData({ ...formData, supportEntireFoundation: false })
                    } }
                  >
                    <Row className='text-center'>
                      <p>{ t('specificShelter') }</p>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='38'
                        height='38'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                      >
                        <path d='M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z' />
                      </svg>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item
                    id={ entireFoundation }
                    action
                    active={ formData.supportEntireFoundation }
                    onClick={ (e: any) => {
                      e.preventDefault()
                      setFormData({ ...formData, supportEntireFoundation: true })
                    } }
                  >
                    <Row className='text-center'>
                      <p>{ t('entireFoundation') }</p>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='38'
                        height='38'
                        fill='currentColor'
                        viewBox='0 0 512 512'
                      >
                        <path d='M256 224c-79.37 0-191.1 122.7-191.1 200.2C64.02 459.1 90.76 480 135.8 480C184.6 480 216.9 454.9 256 454.9C295.5 454.9 327.9 480 376.2 480c44.1 0 71.74-20.88 71.74-55.75C447.1 346.8 335.4 224 256 224zM108.8 211.4c-10.37-34.62-42.5-57.12-71.62-50.12S-7.104 202 3.27 236.6C13.64 271.3 45.77 293.8 74.89 286.8S119.1 246 108.8 211.4zM193.5 190.6c30.87-8.125 46.37-49.1 34.5-93.37s-46.5-71.1-77.49-63.87c-30.87 8.125-46.37 49.1-34.5 93.37C127.9 170.1 162.5 198.8 193.5 190.6zM474.9 161.3c-29.12-6.1-61.25 15.5-71.62 50.12c-10.37 34.63 4.75 68.37 33.87 75.37c29.12 6.1 61.12-15.5 71.62-50.12C519.1 202 503.1 168.3 474.9 161.3zM318.5 190.6c30.1 8.125 65.62-20.5 77.49-63.87c11.87-43.37-3.625-85.25-34.5-93.37c-30.1-8.125-65.62 20.5-77.49 63.87C272.1 140.6 287.6 182.5 318.5 190.6z' />
                      </svg>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Row>
              <Row className='d-flex justify-content-center'>
                {
                  !formData.supportEntireFoundation && (
                    <Row className='mt-4 ps-0'>
                      <Form.Select
                        value={ formData.selectedShelterId ?? '' }
                        onChange={ (e: any) => {
                          e.preventDefault()
                          setFormData({ ...formData, selectedShelterId: parseInt(e.target.value) })
                        } }
                      >
                        {
                          shelters.length > 0 ? (
                            shelters.map((shelter, index) => (
                              <option key={ index } value={ shelter.id }>
                                { shelter.name }
                              </option>
                            ))
                          ) : (
                            <option>{ t('noShelters') }</option>
                          )
                        }
                      </Form.Select>
                    </Row>
                  )
                }
              </Row>
              <Row>
                <ListGroup horizontal className='mt-4'>
                  {
                    contributionAmounts.map((amount, index) => (
                      <ListGroup.Item
                        key={ index }
                        action
                        active={ formData.contributionAmount === amount }
                        onClick={ (e: any) => {
                          e.preventDefault()
                          setFormData({ ...formData, contributionAmount: amount })
                        } }
                      >
                        { amount + t('currency') }
                      </ListGroup.Item>
                    ))
                  }
                </ListGroup>
              </Row>
            </Form>
            <Row className='w-50 mt-4 d-flex justify-content-end'>
              <motion.button
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                className='btn btn-success btn-sm w-25'
                onClick={ () => setCurrentFormStep(currentFormStep + 1) }
              >
                { t('next') }
              </motion.button>
            </Row>
          </>
        )
      }
    </>
  )
}

export default FirstFormStep