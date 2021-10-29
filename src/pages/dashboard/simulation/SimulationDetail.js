import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../stores/user';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useParams } from 'react-router-dom';
import trialService from '../../../services/trialService';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import SimulationOption from '../../../components/simulation/SimulationOption';
import agencyService from '../../../services/agencyService';
import { majorAgenciesState, userAgenciesState } from '../../../stores/agency';
import { useColorModeValue } from '@chakra-ui/color-mode';
import SimulationLayout from '../../../components/simulation/SimulationLayout';
import OpenSimulation from '../../../components/simulation/OpenSimulation';

const SimulationDetail = () => {
  const user = useRecoilValue(userState);
  const bgColor = useColorModeValue('white', 'gray.800');

  let { id } = useParams();

  const [trial, setTrial] = useState();
  const [isLoading, setIsLoading] = useState();

  const setMajorAgencies = useSetRecoilState(majorAgenciesState);
  const [userAgencies, setUserAgencies] = useRecoilState(userAgenciesState);

  // fetcher major_agencies sebagai daftar pilihan
  const fetchMajorAgency = async () => {
    await agencyService
      .getMajorAgencies(user.major.id, user.user_type.id, user.token)
      .then(({ data }) => setMajorAgencies(data));
  };

  // fetcher user_agencies
  const fetchUserAgency = async () => {
    await agencyService.getUserAgency(id, user.token).then(({ data }) => {
      setUserAgencies(data);
    });
  };

  // fetcher trial
  const fetchTrial = async () => {
    setIsLoading(true);
    await trialService.get(id, user.token).then(({ data }) => setTrial(data));
  };

  // fetching trial
  useEffect(() => {
    fetchTrial();
    fetchMajorAgency();
    fetchUserAgency();
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
    return <OpenSimulation />;

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
            onComplete={() => fetchTrial()}
          />
        </Text>
      </Alert>
    </SimulationLayout>
  );
};

export default SimulationDetail;
