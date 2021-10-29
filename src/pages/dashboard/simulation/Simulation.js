import DashboardLayout from '../../../layouts/DashboardLayout';
import { Helmet } from 'react-helmet';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../../stores/user';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { trialsState } from '../../../stores/trial';
import trialService from '../../../services/trialService';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/spinner';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Icon from '@chakra-ui/icon';
import dayjs from 'dayjs';
import Countdown from 'react-countdown';
import { useColorModeValue } from '@chakra-ui/color-mode';

const Simulation = () => {
  const user = useRecoilValue(userState);
  const bgColor = useColorModeValue('white', 'gray.800');

  const [trials, setTrials] = useRecoilState(trialsState);
  const [isLoading, setIsLoading] = useState();

  const fetchTrials = async () => {
    setIsLoading(true);
    const { data } = await trialService.getAll(user.token);
    setTrials(data);
    setIsLoading(false);
  };

  // fetching list of trial
  useEffect(() => {
    fetchTrials();
  }, []);

  if (!trials)
    return (
      <DashboardLayout>
        <Helmet title="Simulasi" />
        <Heading size="lg" mb="4" fontWeight="bold">
          Simulasi
        </Heading>
        {isLoading ? <Spinner /> : <Text>Tidak ada simulasi.</Text>}
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <Helmet title="Simulasi" />
      <Heading size="lg" mb="4" fontWeight="bold">
        Simulasi
      </Heading>
      <Alert
        status="warning"
        alignItems="start"
        fontSize="sm"
        rounded="xl"
        mb="6"
      >
        <AlertIcon />
        Perlu diingat bahwa proses dan hasil dari simulasi ini bersifat
        probable, sehingga kondisi yang tergambarkan dari hasil simulasi ini
        tidak 100% benar namun tetap bisa membantu dalam pengambilan keputusan
        ketika pengisian Survei/Polling Penempatan oleh Biro SDM Kementerian
        Keuangan.
      </Alert>

      <Heading size="md" mb="3">
        Simulasi Terbaru
      </Heading>
      {trials
        .filter(({ closed_at }) => {
          return dayjs(closed_at) > dayjs(new Date());
        })
        .map(({ id, title, description, opened_at, closed_at }) => (
          <Flex
            key={id}
            as={Link}
            to={`/simulasi/${id}`}
            direction="row"
            bg={bgColor}
            shadow="md"
            rounded="lg"
            p="3"
            alignItems="center"
            my="2"
          >
            <Flex bg="red.100" rounded="full" p="3" fontSize="xl" mr="3">
              <Icon as={FaStar} />
            </Flex>
            <Flex direction="column">
              <Heading size="md">{title}</Heading>
              <Text fontSize="md" noOfLines="3">
                {description}
              </Text>
              <Box>
                {dayjs(opened_at) > dayjs(new Date()) && (
                  <Alert status="success" p="0" variant="subtle" rounded="full">
                    <AlertIcon />
                    <Text as="div" fontSize="sm">
                      Dibuka dalam{' '}
                      <Text
                        as={Countdown}
                        fontWeight="bold"
                        date={opened_at}
                        zeroPadDays={0}
                        onComplete={() => fetchTrials()}
                      />
                    </Text>
                  </Alert>
                )}
                {dayjs(opened_at) <= dayjs(new Date()) &&
                  dayjs(closed_at) > dayjs(new Date()) && (
                    <Alert
                      status="warning"
                      p="0"
                      variant="subtle"
                      rounded="full"
                    >
                      <AlertIcon />
                      <Text as="div" fontSize="sm">
                        Ditutup dalam{' '}
                        <Text
                          as={Countdown}
                          fontWeight="bold"
                          date={closed_at}
                          zeroPadDays={0}
                          onComplete={() => fetchTrials()}
                        />
                      </Text>
                    </Alert>
                  )}
              </Box>
            </Flex>
          </Flex>
        ))}

      <Heading size="md" mb="3" mt="6">
        Simulasi Selesai
      </Heading>
      {trials
        .filter(({ closed_at }) => {
          return dayjs(closed_at) < dayjs(new Date());
        })
        .map(({ id, title, description }) => (
          <Flex
            key={id}
            as={Link}
            to={`/simulasi/${id}`}
            direction="row"
            bg={bgColor}
            shadow="md"
            rounded="lg"
            p="3"
            alignItems="start"
            my="2"
          >
            <Flex bg="red.100" rounded="full" p="3" fontSize="xl" mr="3">
              <Icon as={FaStar} />
            </Flex>
            <Flex direction="column">
              <Heading size="md">{title}</Heading>
              <Text fontSize="md" noOfLines="3">
                {description}
              </Text>
              <Box>
                <Alert status="error" p="0" variant="subtle" rounded="full">
                  <AlertIcon />
                  <Text as="div" fontSize="sm">
                    Sudah ditutup
                  </Text>
                </Alert>
              </Box>
            </Flex>
          </Flex>
        ))}
    </DashboardLayout>
  );
};

export default Simulation;
