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

const SimulationDetail = () => {
  const user = useRecoilValue(userState);
  let { id } = useParams();

  const [trial, setTrial] = useState();
  const [isLoading, setIsLoading] = useState();

  // fetching trial
  useEffect(() => {
    const fetchTrial = async () => {
      setIsLoading(true);
      const { data } = await trialService.get(id, user.token);
      setTrial(data);
      console.log(data);
      setIsLoading(false);
    };

    fetchTrial();
  }, [user, setIsLoading]);

  if (!trial)
    return (
      <DashboardLayout>
        <Helmet title="Simulasi" />
        <Heading size="lg" mb="4" fontWeight="bold">
          Simulasi
        </Heading>
        {isLoading ? <Spinner /> : <Text>Simulasi tidak ditemukan.</Text>}
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <Helmet title={trial.title} />
      <BackButton to="/simulasi" mb="4" />
      <Heading size="lg" mb="4" fontWeight="bold">
        {trial.title}
      </Heading>
      <Text mb="6">{trial.description}</Text>
    </DashboardLayout>
  );
};

export default SimulationDetail;
