import { Alert, AlertIcon } from '@chakra-ui/alert';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Spinner } from '@chakra-ui/spinner';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import SimulationLayout from '../../layouts/SimulationLayout';
import agencyService from '../../services/agencyService';
import { majorAgenciesState } from '../../stores/agency';
import { userState } from '../../stores/user';
import SummaryDataSimulation from './SummaryDataSimulation';

export default function ClosedSimulation({ trial }) {
  const user = useRecoilValue(userState);

  const [userAgenciesList, setUserAgenciesList] = useState();

  // fetcher user_agencies
  const fetchUserAgenciesList = async () => {
    await agencyService
      .getUserAgencies(trial.id, user.token)
      .then(({ data }) => {
        setUserAgenciesList(data);
      });
  };

  // fetching trial
  useEffect(() => {
    fetchUserAgenciesList();
  }, [user]);

  let i = 1;

  const trial_options_list = userAgenciesList
    ? _.orderBy(
        _.uniqBy(userAgenciesList, function (e) {
          return e.title;
        }).map(e => {
          return { label: e.title, value: e.trial_option_id };
        }),
        ['label', 'value']
      )
    : null;

  const agencies_list = userAgenciesList
    ? _.orderBy(
        _.uniqBy(userAgenciesList, function (e) {
          return e.name;
        }).map(e => {
          return { label: e.name, value: e.agency_id };
        }),
        ['label', 'value']
      )
    : null;

  const users_list = userAgenciesList
    ? _.uniqBy(userAgenciesList, function (e) {
        return e.user_id;
      })
    : null;

  const my_agencies_list = userAgenciesList
    ? _.orderBy(
        userAgenciesList
          .filter(({ user_id }) => {
            return user_id == user.sub;
          })
          .map(e => {
            return { label: `${e.title} - ${e.name} `, value: e.agency_id };
          }),
        ['label', 'value']
      )
    : null;

  const [filterOption, setFilterOption] = useState();
  const [filterAgency, setFilterAgency] = useState();

  const sortTerm = term => {
    switch (term) {
      case 'final_score_desc':
        return {
          by: ['final_score', 'cum_score', 'skd_score', 'title'],
          sort: ['desc', 'desc', 'desc', 'asc'],
        };
        break;

      case 'title_asc':
        return {
          by: ['title', 'final_score', 'cum_score', 'skd_score'],
          sort: ['asc', 'desc', 'desc', 'desc'],
        };
        break;

      default:
        return {
          by: ['final_score', 'cum_score', 'skd_score', 'title'],
          sort: ['desc', 'desc', 'desc', 'asc'],
        };
    }
  };

  const [filterSort, setFilterSort] = useState(sortTerm());

  const filteredUserAgenciesList = userAgenciesList
    ? _.orderBy(
        userAgenciesList
          .filter(({ agency_id }) => {
            if (filterAgency) return filterAgency === agency_id;
          })
          .filter(({ trial_option_id }) => {
            if (filterOption) {
              if (filterOption === 'mix') return true;
              return filterOption === trial_option_id;
            }
          }),
        filterSort.by,
        filterSort.sort
      )
    : null;

  return (
    <SimulationLayout trial={trial}>
      <Alert status="error" p="0" variant="subtle" rounded="full" mb="6">
        <AlertIcon />
        <Text as="div" fontSize="sm">
          Simulasi sudah ditutup.
        </Text>
      </Alert>

      {!userAgenciesList && (
        <Box>
          <Spinner />
          Loading Rank...
        </Box>
      )}

      {userAgenciesList && (
        <>
          <Flex
            direction="column"
            p="3"
            shadow="lg"
            bgColor="white"
            rounded="lg"
            my="2"
          >
            <Heading size="md" mb="3">
              Filter Data
            </Heading>

            <Text my="2" fontSize="sm">
              Peserta Simulasi: {users_list.length} orang
            </Text>

            <Alert status="info" p="2" variant="subtle" rounded="lg" mb="6">
              <AlertIcon />
              <Text as="div" fontSize="sm">
                <strong>Tips:</strong>
                <br />
                - Buka website melalui desktop untuk dapat tampilan terbaik.
                <br />
                - Cari (Ctrl/Cmd+F) kata "saya" untuk menemukan ranking kamu.
                <br />
              </Text>
            </Alert>

            <Flex direction={{ base: 'column', md: 'row' }}>
              <FormControl mb="3">
                <FormLabel>Instansi Pilihan</FormLabel>
                <Select
                  onChange={e => setFilterAgency(e.target.value)}
                  placeholder="Filter Instansi Pilihan..."
                >
                  <optgroup label="Instansi Pilihan Saya">
                    {my_agencies_list.map(({ value, label }) => (
                      <option value={value}>{label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Semua Instansi">
                    {agencies_list.map(({ value, label }) => (
                      <option value={value}>{label}</option>
                    ))}
                  </optgroup>
                </Select>
              </FormControl>
              <FormControl mb="3" ml={{ md: '4' }}>
                <FormLabel>Urutan Pilihan</FormLabel>
                <Select
                  onChange={e => setFilterOption(e.target.value)}
                  placeholder="Filter Urutan Pilihan..."
                >
                  {trial_options_list.map(({ value, label }) => (
                    <option value={value}>{label}</option>
                  ))}
                  <option value="mix">Mix Pilihan</option>
                </Select>
              </FormControl>
            </Flex>

            <Flex direction={{ base: 'column', md: 'row' }}>
              <FormControl mb="3">
                <FormLabel>Urut Berdasarkan</FormLabel>
                <Select
                  defaultValue="final_score_desc"
                  onChange={e => setFilterSort(sortTerm(e.target.value))}
                  placeholder="Urut Berdasarkan..."
                >
                  <optgroup label="Descending">
                    <option value="final_score_desc">
                      Nilai Akhir ??? IPK ??? SKD ??? Urutan Pilihan
                    </option>
                    <option value="title_asc">
                      Urutan Pilihan ??? Nilai Akhir ??? IPK ??? SKD
                    </option>
                  </optgroup>
                </Select>
              </FormControl>
            </Flex>

            {filteredUserAgenciesList && (
              <Grid
                templateColumns={{
                  base: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                }}
                gap="3"
                p="3"
                mb="3"
              >
                <Flex direction="column">
                  <Heading size="xs">Range IPK</Heading>
                  <Text fontSize="lg">
                    {_.min(_.map(filteredUserAgenciesList, 'cum_score'))} -{' '}
                    {_.max(_.map(filteredUserAgenciesList, 'cum_score'))}
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Heading size="xs">Range SKD</Heading>
                  <Text fontSize="lg">
                    {_.min(_.map(filteredUserAgenciesList, 'skd_score')) &&
                      Number(
                        _.min(_.map(filteredUserAgenciesList, 'skd_score'))
                      ).toFixed(0)}{' '}
                    -{' '}
                    {_.max(_.map(filteredUserAgenciesList, 'skd_score')) &&
                      Number(
                        _.max(_.map(filteredUserAgenciesList, 'skd_score'))
                      ).toFixed(0)}
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Heading size="xs">Range Nilai Akhir</Heading>
                  <Text fontSize="lg">
                    {_.min(_.map(filteredUserAgenciesList, 'final_score')) &&
                      Number(
                        _.min(_.map(filteredUserAgenciesList, 'final_score'))
                      ).toFixed(2)}{' '}
                    -{' '}
                    {_.max(_.map(filteredUserAgenciesList, 'final_score')) &&
                      Number(
                        _.max(_.map(filteredUserAgenciesList, 'final_score'))
                      ).toFixed(2)}
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Heading size="xs">Jumlah Pemilih</Heading>
                  <Text fontSize="lg">
                    {filteredUserAgenciesList.length || '-'}
                  </Text>
                </Flex>
              </Grid>
            )}

            <Box overflow="auto">
              <Table variant="simple" size="sm">
                <TableCaption>
                  Data berasal dari isian {trial.title}.
                </TableCaption>
                <Thead bgColor="gray.50">
                  <Tr>
                    <Th>No.</Th>
                    <Th>NPM</Th>
                    <Th>IPK</Th>
                    <Th>SKD</Th>
                    <Th>N. Akhir</Th>
                    <Th>Pilihan</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredUserAgenciesList.map(
                    ({
                      user_id,
                      npm,
                      cum_score,
                      skd_score,
                      final_score,
                      title,
                    }) => (
                      <Tr bgColor={user_id == user.sub && 'yellow.200'}>
                        <Td fontWeight="bold">{i++}</Td>
                        <Td>
                          {npm} {user_id == user.sub && '- saya'}
                        </Td>
                        <Td>{cum_score}</Td>
                        <Td>{Number(skd_score).toFixed(0)}</Td>
                        <Td>{Number(final_score).toFixed(2)}</Td>
                        <Td>{title}</Td>
                      </Tr>
                    )
                  )}
                  {filteredUserAgenciesList.length < 1 && (
                    <Tr>
                      <Td colSpan="7" textAlign="center">
                        {filterOption && filterAgency
                          ? 'Tidak ada data.'
                          : 'Pilih parameter filter dahulu.'}
                      </Td>
                    </Tr>
                  )}
                </Tbody>
                <Tfoot bgColor="gray.50">
                  <Tr>
                    <Th colSpan="2">Min</Th>
                    <Th>
                      {_.min(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.cum_score);
                        })
                      )
                        ? Number(
                            _.min(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.cum_score);
                              })
                            )
                          ).toFixed(2)
                        : '-'}
                    </Th>
                    <Th>
                      {_.min(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.skd_score);
                        })
                      )
                        ? Number(
                            _.min(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.skd_score);
                              })
                            )
                          ).toFixed(0)
                        : '-'}
                    </Th>
                    <Th>
                      {_.min(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.final_score);
                        })
                      )
                        ? Number(
                            _.min(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.final_score);
                              })
                            )
                          ).toFixed(2)
                        : '-'}
                    </Th>
                    <Th></Th>
                  </Tr>
                  <Tr>
                    <Th colSpan="2">Max</Th>
                    <Th>
                      {_.max(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.cum_score);
                        })
                      )
                        ? Number(
                            _.max(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.cum_score);
                              })
                            )
                          ).toFixed(2)
                        : '-'}
                    </Th>
                    <Th>
                      {_.max(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.skd_score);
                        })
                      )
                        ? Number(
                            _.max(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.skd_score);
                              })
                            )
                          ).toFixed(0)
                        : '-'}
                    </Th>
                    <Th>
                      {_.max(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.final_score);
                        })
                      )
                        ? Number(
                            _.max(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.final_score);
                              })
                            )
                          ).toFixed(2)
                        : '-'}
                    </Th>
                    <Th></Th>
                  </Tr>
                  <Tr>
                    <Th colSpan="2">Rata-rata</Th>
                    <Th>
                      {_.mean(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.cum_score);
                        })
                      )
                        ? Number(
                            _.mean(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.cum_score);
                              })
                            )
                          ).toFixed(2)
                        : '-'}
                    </Th>
                    <Th>
                      {_.mean(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.skd_score);
                        })
                      )
                        ? Number(
                            _.mean(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.skd_score);
                              })
                            )
                          ).toFixed(0)
                        : '-'}
                    </Th>
                    <Th>
                      {_.mean(
                        _.map(filteredUserAgenciesList, e => {
                          return Number(e.final_score);
                        })
                      )
                        ? Number(
                            _.mean(
                              _.map(filteredUserAgenciesList, e => {
                                return Number(e.final_score);
                              })
                            )
                          ).toFixed(2)
                        : '-'}
                    </Th>
                    <Th></Th>
                  </Tr>
                </Tfoot>
              </Table>
            </Box>
          </Flex>

          <SummaryDataSimulation
            trial={trial}
            users_list={users_list}
            trial_options_list={trial_options_list}
            agencies_list={agencies_list}
            userAgenciesList={userAgenciesList}
          />
        </>
      )}
    </SimulationLayout>
  );
}
