import DashboardLayout from '../../layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
import { userState } from '../../stores/user';
import { Heading, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';
import trialService from '../../services/trialService';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';

const SimulationDetail = () => {
  const user = useRecoilValue(userState);
  let { id } = useParams();

  const [trial, setTrial] = useState();
  const [isLoading, setIsLoading] = useState();

  const fetchTrial = async () => {
    setIsLoading(true);
    const { data } = await trialService.get(id, user.token);
    setTrial(data);
    console.log(data);
    setIsLoading(false);
  };

  // fetching trial
  useEffect(() => {
    fetchTrial();
  }, [user, setIsLoading]);

  // simulasi tidak ditemukan
  if (!trial)
    return (
      <Layout trial={{ title: 'Simulasi' }}>
        {isLoading ? <Spinner /> : <Text>Simulasi tidak ditemukan.</Text>}
      </Layout>
    );

  // simulasi sudah buka dan belum tutup
  if (
    dayjs(trial.opened_at) < dayjs(new Date()) &&
    dayjs(trial.closed_at) > dayjs(new Date())
  )
    return (
      <Layout trial={trial}>
        {trial.trial_options.length > 0 ? (
          trial.trial_options.map(({ title }) => <Text>{title}</Text>)
        ) : (
          <Alert status="warning" p="0" variant="subtle" rounded="full">
            <AlertIcon />
            <Text as="div" fontSize="sm">
              Belum ada opsi pilihan tersedia
            </Text>
          </Alert>
        )}
      </Layout>
    );

  // simulasi sudah tutup
  if (dayjs(trial.closed_at) < dayjs(new Date()))
    return (
      <Layout trial={trial}>
        <Alert status="error" p="0" variant="subtle" rounded="full">
          <AlertIcon />
          <Text as="div" fontSize="sm">
            Simulasi sudah ditutup.
          </Text>
        </Alert>
      </Layout>
    );

  // simulasi belum buka
  return (
    <Layout trial={trial}>
      <Alert status="success" p="0" variant="subtle" rounded="full">
        <AlertIcon />
        <Text as="div" fontSize="sm">
          Simulasi belum buka. Dibuka dalam{' '}
          <Text
            as={Countdown}
            fontWeight="bold"
            date={dayjs(trial.opened_at)}
            zeroPadDays={0}
            onComplete={() => fetchTrial()}
          />
        </Text>
      </Alert>
    </Layout>
  );
};

const Layout = ({ trial, children }) => {
  return (
    <DashboardLayout>
      <Helmet title={trial.title} />
      <BackButton to="/simulasi" mb="4" />
      <Heading size="lg" mb="4" fontWeight="bold">
        {trial.title}
      </Heading>
      <Text mb="6">{trial.description}</Text>
      {children}
    </DashboardLayout>
  );
};

export default SimulationDetail;
