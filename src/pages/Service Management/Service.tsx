/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import ServiceManagement from './ServiceManagement';
import JobCardDetailsPage from './jobCardDetailsPage';
import { useNavigate } from 'react-router-dom';

const Service = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  // const [apiData, setapiData] = useState<any>([]);
  const navigate = useNavigate()
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };
  return (
    <div>
      {activeStep === 0 && (
          <ServiceManagement onView={() => setActiveStep(1)}  />
        )}
        {activeStep === 1 && (
          <JobCardDetailsPage handleBack={handleBack}/>
        )}
    </div>
  )
}

export default Service