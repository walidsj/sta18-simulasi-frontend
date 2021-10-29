import { Heading, Text } from '@chakra-ui/layout';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../layouts/DashboardLayout';
import BackButton from '../ui/BackButton';

export default function SimulationLayout({ trial, children }) {
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
}
