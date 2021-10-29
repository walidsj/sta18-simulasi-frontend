import DashboardLayout from '../../layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../stores/user';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/ui/BackButton';
import trialService from '../../services/trialService';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import SimulationOption from '../../components/simulation/SimulationOption';
import agencyService from '../../services/agencyService';
import { majorAgenciesState, userAgenciesState } from '../../stores/agency';

const SimulationDetail = () => {
  const user = useRecoilValue(userState);
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
        <Alert status="warning" p="0" variant="subtle" rounded="full" mb="4">
          <AlertIcon />
          <Text as="div" fontSize="sm">
            Ditutup dalam{' '}
            <Text
              as={Countdown}
              fontWeight="bold"
              date={trial.closed_at}
              zeroPadDays={0}
              onComplete={() => fetchTrial()}
            />
          </Text>
        </Alert>
        {userAgencies.length > 0 && (
          <Flex
            p="3"
            direction="column"
            bg="white"
            rounded="xl"
            shadow="lg"
            mb="6"
          >
            <Heading size="sm">Pilihan Tersimpan</Heading>
            <Alert
              status="success"
              variant="subtle"
              fontSize="xs"
              p="1"
              my="2"
              rounded="lg"
            >
              <AlertIcon />
              Tidak perlu kunci data selama data pilihan tersimpan sudah sesuai
              dengan keinginan. Tinggal menunggu simulasi ditutup.
            </Alert>
            {userAgencies.map(({ id, title, name }) => (
              <Text key={id}>
                <strong>{title}</strong> - {name}
              </Text>
            ))}
          </Flex>
        )}
        {trial.trial_options.length > 0 &&
          trial.trial_options.map(option => (
            <SimulationOption key={option.id} trialOption={option} />
          ))}

        {trial.trial_options.length < 1 && (
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
            date={trial.opened_at}
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
      <Heading size="lg" mb="3" fontWeight="bold">
        {trial.title}
      </Heading>
      <Text mb="6">{trial.description}</Text>
      {children}
    </DashboardLayout>
  );
};

export default SimulationDetail;
