import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Text } from '@chakra-ui/layout';
import SimulationLayout from '../../layouts/SimulationLayout';

export default function ClosedSimulation({ trial }) {
  return (
    <SimulationLayout trial={trial}>
      <Alert status="error" p="0" variant="subtle" rounded="full" mb="6">
        <AlertIcon />
        <Text as="div" fontSize="sm">
          Simulasi sudah ditutup.
        </Text>
      </Alert>
      <iframe src={trial.url_document} height="500px" />
    </SimulationLayout>
  );
}
