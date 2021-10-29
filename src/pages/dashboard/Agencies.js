import DashboardLayout from '../../layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../stores/user';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import Icon from '@chakra-ui/icon';
import { FaBuilding, FaSearch } from 'react-icons/fa';
import agencyService from '../../services/agencyService';
import { agenciesState } from '../../stores/agency';
import HTMLReactParser from 'html-react-parser';
import { FormControl } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import string from '../../utils/string';
import { Spinner } from '@chakra-ui/spinner';
import { Link } from 'react-router-dom';

const Agencies = () => {
  const user = useRecoilValue(userState);

  const [agencies, setAgencies] = useRecoilState(agenciesState);
  const [isLoading, setIsLoading] = useState();
  const [search, setSearch] = useState();

  // fetching list of agency
  useEffect(() => {
    const fetchAgencies = async () => {
      setIsLoading(true);
      const { data } = await agencyService.getAll(user.token);
      setAgencies(data);
      setIsLoading(false);
    };

    fetchAgencies();
  }, [user, setIsLoading]);

  return (
    <DashboardLayout>
      <Helmet title="Informasi Instansi" />
      <Heading size="lg" mb="4" fontWeight="bold">
        Informasi Instansi
      </Heading>

      <FormControl id="search" mb="4">
        <InputGroup>
          <Input
            onChange={e => setSearch(e.target.value)}
            type="search"
            variant="flushed"
            placeholder="Cari nama instansi, tugas umum, alokasi prodi, dan lain-lain."
          />
          <InputRightElement children={<FaSearch />} />
        </InputGroup>
      </FormControl>

      {!agencies && isLoading && <Spinner />}

      {!agencies && !isLoading && <Text>Tidak ada instansi.</Text>}

      {agencies &&
        agencies
          .filter(({ name, job, allocation }) => {
            if (search)
              return (
                name.toLowerCase().includes(search.toLowerCase()) ||
                job.toLowerCase().includes(search.toLowerCase()) ||
                allocation.toLowerCase().includes(search.toLowerCase())
              );
            return true;
          })
          .map(({ id, name, job, allocation }) => (
            <Flex
              key={id}
              as={Link}
              to={`/info-instansi/${id}`}
              direction="row"
              bg="white"
              shadow="md"
              rounded="lg"
              p="3"
              alignItems="start"
              my="2"
            >
              <Flex bg="red.100" rounded="full" p="3" fontSize="xl" mr="3">
                <Icon as={FaBuilding} />
              </Flex>
              <Flex direction="column">
                <Heading size="md">{name}</Heading>
                <Text fontSize="md" noOfLines="3" mb="3">
                  {string.removeTags(job)}
                </Text>
                <Text fontSize="xs" fontWeight="bold">
                  Alokasi:
                </Text>
                <Text fontSize="xs" as="div">
                  {HTMLReactParser(allocation)}
                </Text>
              </Flex>
            </Flex>
          ))}
    </DashboardLayout>
  );
};

export default Agencies;
