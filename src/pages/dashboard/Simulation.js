import DashboardLayout from '../../layouts/DashboardLayout';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
import { userState } from '../../stores/user';
import { Heading } from '@chakra-ui/layout';

const Simulation = () => {
  const user = useRecoilValue(userState);

  return (
    <DashboardLayout>
      <Helmet title="Simulasi" />
      <Heading size="lg" mb="4" fontWeight="bold">
        Simulasi
      </Heading>
    </DashboardLayout>
  );
};

export default Simulation;
