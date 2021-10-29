import DashboardLayout from '../../layouts/DashboardLayout';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
import { userState } from '../../stores/user';
import { Heading } from '@chakra-ui/layout';
import { Alert, AlertIcon } from '@chakra-ui/alert';

const Simulation = () => {
  const user = useRecoilValue(userState);

  return (
    <DashboardLayout>
      <Helmet title="Simulasi" />
      <Heading size="lg" mb="4" fontWeight="bold">
        Simulasi
      </Heading>
      <Alert status="warning" alignItems="start">
        <AlertIcon />
        Perlu diingat bahwa proses dan hasil dari simulasi ini bersifat
        probable, sehingga kondisi yang tergambarkan dari hasil simulasi ini
        tidak 100% benar namun tetap bisa membantu dalam pengambilan keputusan
        ketika pengisian Survei/Polling Penempatan oleh Biro SDM Kementerian
        Keuangan.
      </Alert>
    </DashboardLayout>
  );
};

export default Simulation;
