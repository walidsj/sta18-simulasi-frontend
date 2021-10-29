import DashboardLayout from '../../layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userScoreState, userState } from '../../stores/user';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';
import {
  FaBriefcase,
  FaBuilding,
  FaCreditCard,
  FaEnvelope,
  FaUser,
} from 'react-icons/fa';
import axios from 'axios';
import userService from '../../services/userService';
import { Skeleton } from '@chakra-ui/skeleton';

const MyProfile = () => {
  const user = useRecoilValue(userState);

  const [userScore, setUserScore] = useRecoilState(userScoreState);
  const [isLoading, setIsLoading] = useState(false);

  // fetching user score
  useEffect(() => {
    const fetchUserScore = async () => {
      setIsLoading(true);
      const { data } = await userService.get(user.token);
      setUserScore(data);
      setIsLoading(false);
    };

    fetchUserScore();
  }, [user, setIsLoading]);

  const userInfo = [
    { icon: FaUser, title: 'Nama Lengkap', content: user.name },
    { icon: FaCreditCard, title: 'NPM', content: user.npm },
    { icon: FaBriefcase, title: 'Program Studi', content: user.major.name },
    { icon: FaEnvelope, title: 'Alamat Email', content: user.email },
    { icon: FaBuilding, title: 'Status', content: user.user_type.name },
  ];

  return (
    <DashboardLayout>
      <Helmet title="Selamat Datang" />
      <Heading size="lg" mb="4">
        Akun Saya
      </Heading>
      <Heading size="md" mb="3">
        Data Profil
      </Heading>
      {userInfo.map(({ icon, title, content }) => (
        <Flex
          key={title}
          direction="row"
          bg="white"
          shadow="md"
          rounded="lg"
          p="3"
          alignItems="center"
          my="2"
        >
          <Flex bg="red.100" rounded="full" p="3" fontSize="xl" mr="2">
            <Icon as={icon} />
          </Flex>
          <Flex direction="column">
            <Heading size="xs">{title}</Heading>
            <Text>{content}</Text>
          </Flex>
        </Flex>
      ))}

      <Heading size="md" my="3">
        Data Nilai
      </Heading>
      <Flex
        direction="row"
        bg="white"
        shadow="md"
        rounded="lg"
        p="3"
        alignItems="center"
        my="2"
        justifyContent="space-between"
      >
        <Flex direction="column" textAlign="center">
          <Heading size="xs">IPK</Heading>
          <Skeleton isLoaded={!isLoading}>
            <Text fontSize="xl">{userScore.cum_score}</Text>
          </Skeleton>
        </Flex>
        <Flex direction="column" textAlign="center">
          <Heading size="xs">SKD</Heading>
          <Skeleton isLoaded={!isLoading}>
            <Text fontSize="xl">{userScore.skd_score}</Text>
          </Skeleton>
        </Flex>
        <Flex direction="column" textAlign="center">
          <Heading size="xs">N. Akhir</Heading>
          <Skeleton isLoaded={!isLoading}>
            <Text fontSize="xl">
              {userScore.final_score
                ? Number(userScore.final_score).toFixed(2)
                : ''}
            </Text>
          </Skeleton>
        </Flex>
      </Flex>

      <Text fontSize="sm">
        Hubungi admin jika kamu ingin ganti data profilmu.
      </Text>
    </DashboardLayout>
  );
};

export default MyProfile;
