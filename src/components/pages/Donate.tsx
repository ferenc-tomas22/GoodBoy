import { useShelters } from '../../AppContext'
import { Container } from 'react-bootstrap'
import FirstFormStep from './form/FirstFormStep'
import SecondFormStep from './form/SecondFormStep'
import ThirdFormStep from './form/ThirdFormStep'

const Donate = () => {
  const currentFormStep = useShelters(state => state.currentFormStep)
  return (
    <Container fluid className='d-flex flex-column align-items-center pb-5'>
      {
        currentFormStep === 1 ? (
          <FirstFormStep />
        ) : currentFormStep === 2 ? (
          <SecondFormStep />
        ) : currentFormStep === 3 ? (
          <ThirdFormStep />
        ) : null
      }
    </Container>
  )
}

export default Donate
