import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../stores/user';
import { Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useParams } from 'react-router-dom';
import trialService from '../../../services/trialService';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import SimulationLayout from '../../../layouts/SimulationLayout';
import OpenSimulation from '../../../components/simulation/OpenSimulation';

const SimulationDetail = () => {
  const user = useRecoilValue(userState);

  let { id } = useParams();

  const [trial, setTrial] = useState();
  const [isLoading, setIsLoading] = useState();

  // fetcher trial
  const fetchTrial = async () => {
    setIsLoading(true);
    await trialService.get(id, user.token).then(({ data }) => setTrial(data));
  };

  // fetching trial
  useEffect(() => {
    fetchTrial();
  }, [user, setIsLoading]);

  // simulasi tidak ditemukan
  if (!trial)
    return (
      <SimulationLayout trial={{ title: 'Simulasi' }}>
        {isLoading ? <Spinner /> : <Text>Simulasi tidak ditemukan.</Text>}
      </SimulationLayout>
    );

  // simulasi sudah buka dan belum tutup
  if (
    dayjs(trial.opened_at) < dayjs(new Date()) &&
    dayjs(trial.closed_at) > dayjs(new Date())
  )
    return <OpenSimulation trial={trial} />;

  // simulasi sudah tutup
  if (dayjs(trial.closed_at) < dayjs(new Date()))
    return (
      <SimulationLayout trial={trial}>
        <Alert status="error" p="0" variant="subtle" rounded="full" mb="6">
          <AlertIcon />
          <Text as="div" fontSize="sm">
            Simulasi sudah ditutup.
          </Text>
        </Alert>
        <iframe src={trial.url_document} height="500px" />
      </SimulationLayout>
    );

  // simulasi belum buka
  return (
    <SimulationLayout trial={trial}>
      <Alert status="success" p="0" variant="subtle" rounded="full">
        <AlertIcon />
        <Text as="div" fontSize="sm">
          Simulasi belum buka. Dibuka dalam{' '}
          <Text
            as={Countdown}
            fontWeight="bold"
            date={trial.opened_at}
            zeroPadDays={0}
          />
        </Text>
      </Alert>
    </SimulationLayout>
  );
};

export default SimulationDetail;
