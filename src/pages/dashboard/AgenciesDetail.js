import DashboardLayout from '../../layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
import { userState } from '../../stores/user';
import { Heading, Text } from '@chakra-ui/layout';
import agencyService from '../../services/agencyService';
import HTMLReactParser from 'html-react-parser';
import { Spinner } from '@chakra-ui/spinner';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';
import BackButton from '../../components/ui/BackButton';

const AgenciesDetail = () => {
  const user = useRecoilValue(userState);
  let { id } = useParams();

  const [agency, setAgency] = useState();
  const [isLoading, setIsLoading] = useState();

  // fetching user score
  useEffect(() => {
    const fetchAgency = async () => {
      setIsLoading(true);
      const { data } = await agencyService.get(id, user.token);
      setAgency(data);
      console.log(data);
      setIsLoading(false);
    };

    fetchAgency();
  }, [user, setIsLoading]);

  if (!agency)
    return (
      <DashboardLayout>
        <Helmet title="Info Instansi" />
        {isLoading ? <Spinner /> : <Text>Tidak ditemukan.</Text>}
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <Helmet title={agency.name} />
      <BackButton to="/info-instansi" mb="4" />
      <Heading size="lg" mb="4" fontWeight="bold">
        {agency.name}
      </Heading>
      <Text mb="6">{agency.job}</Text>

      <Table variant="striped" size="sm">
        <TableCaption>Data berasal dari K/L/P Fest dan wawancara.</TableCaption>
        <Thead>
          <Tr>
            <Th>Kategori</Th>
            <Th>Keterangan</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontWeight="bold">Vertikal</Td>
            <Td>{HTMLReactParser(agency.vertical)}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Kebutuhan</Td>
            <Td>{HTMLReactParser(agency.allocation)}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Posisi Penempatan</Td>
            <Td>{HTMLReactParser(agency.position)}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Perkembangan Pribadi</Td>
            <Td>{HTMLReactParser(agency.private_improvement)}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Izin/Tugas Belajar</Td>
            <Td>{HTMLReactParser(agency.study)}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">Gaji/Tunjangan</Td>
            <Td>{HTMLReactParser(agency.salary)}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold">QnA Penting</Td>
            <Td>{HTMLReactParser(agency.qna)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </DashboardLayout>
  );
};

export default AgenciesDetail;
