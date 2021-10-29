import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Flex, Heading } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Spinner } from '@chakra-ui/spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaLock } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import swal from 'sweetalert';
import { object, string } from 'yup';
import agencyService from '../../services/agencyService';
import { majorAgenciesState } from '../../stores/agency';
import { userState } from '../../stores/user';

function SimulationOption({ trialOption }) {
  const user = useRecoilValue(userState);
  const [majorAgencies, setMajorAgencies] = useRecoilState(majorAgenciesState);

  // validation form
  const schema = object().shape({
    agency_id: string().required('Pilihan harus diisi.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = async values => {
    await agencyService
      .postUserAgency(
        trialOption.trial_id,
        trialOption.id,
        { user_id: user.sub, agency_id: values.agency_id },
        user.token
      )
      .then(({ message }) => {
        return swal('Success', message, 'success');
      })
      .catch(({ response }) => {
        return swal('Failed', response.data.message, 'error');
      });
  };

  if (!majorAgencies) return <Spinner />;

  return (
    <Flex as="form" direction="column" my="2" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.agency_id}>
        <FormLabel fontWeight="bold">{trialOption.title}</FormLabel>
        <Flex direction="row">
          <Select
            {...register('agency_id')}
            my="1"
            mr="2"
            placeholder="Pilih Instansi"
          >
            {majorAgencies.map(({ agency_id, name }) => (
              <option value={agency_id}>{name}</option>
            ))}
          </Select>
          <Button
            colorScheme="green"
            my="1"
            mr="2"
            type="submit"
            isLoading={isSubmitting}
          >
            Simpan
          </Button>
        </Flex>
        <FormErrorMessage>{errors.agency_id?.message}</FormErrorMessage>
      </FormControl>
    </Flex>
  );
}

export default SimulationOption;