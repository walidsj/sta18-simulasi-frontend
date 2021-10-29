import { Alert, AlertIcon } from '@chakra-ui/alert';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { useEffect } from 'react';
import Countdown from 'react-countdown';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import agencyService from '../../services/agencyService';
import { majorAgenciesState, userAgenciesState } from '../../stores/agency';
import { userState } from '../../stores/user';
import SimulationLayout from '../../layouts/SimulationLayout';
import SimulationOption from './SimulationOption';

export default function OpenSimulation({ trial }) {
  const user = useRecoilValue(userState);
  const bgColor = useColorModeValue('white', 'gray.800');

  let { id } = useParams();

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

  // fetching trial
  useEffect(() => {
    fetchMajorAgency();
    fetchUserAgency();
  }, [user]);

  return (
    <SimulationLayout trial={trial}>
      <Alert status="warning" p="0" variant="subtle" rounded="full" mb="4">
        <AlertIcon />
        <Text as="div" fontSize="sm">
          Ditutup dalam{' '}
          <Text
            as={Countdown}
            fontWeight="bold"
            date={trial.closed_at}
            zeroPadDays={0}
          />
        </Text>
      </Alert>
      {userAgencies.length > 0 && (
        <Flex
          p="3"
          direction="column"
          bg={bgColor}
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
            Tidak perlu kunci data selama data pilihan sudah tersimpan. Jika
            sudah sesuai dengan keinginan, kamu hanya perlu menunggu simulasi
            ditutup.
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
          <SimulationOption key={option.title} trialOption={option} />
        ))}

      {trial.trial_options.length < 1 && (
        <Alert status="warning" p="0" variant="subtle" rounded="full">
          <AlertIcon />
          <Text as="div" fontSize="sm">
            Belum ada opsi pilihan tersedia
          </Text>
        </Alert>
      )}
    </SimulationLayout>
  );
}
