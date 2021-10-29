import { Heading, Text } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';
import DashboardLayout from './DashboardLayout';
import BackButton from '../components/ui/BackButton';

export default function SimulationLayout({ trial, children }) {
  return (
    <DashboardLayout>
      <Helmet title={trial?.title || 'Simulasi'} />
      <BackButton to="/simulasi" mb="4" />
      <Heading size="lg" mb="3" fontWeight="bold">
        {trial?.title || ''}
      </Heading>
      <Text mb="6">{trial?.description || ''}</Text>
      {children}
    </DashboardLayout>
  );
}
