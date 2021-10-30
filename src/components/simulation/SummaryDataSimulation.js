import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';
import _ from 'lodash';
import { Fragment } from 'react';

export default function SummaryDataSimulation({
  trial,
  users_list,
  trial_options_list,
  agencies_list,
  userAgenciesList,
}) {
  let i = 1;

  return (
    <Flex
      direction="column"
      p="3"
      shadow="lg"
      bgColor="white"
      rounded="lg"
      my="2"
      mt="6"
    >
      <Heading size="md" mb="3">
        Rangkuman Data
      </Heading>

      <Text my="2" fontSize="sm">
        Peserta Simulasi: {users_list.length} orang
      </Text>

      <Alert status="warning" p="2" variant="subtle" rounded="lg" mb="6">
        <AlertIcon />
        <Text as="div" fontSize="sm">
          Instansi yang tidak dipilih sama sekali di semua pilihan tidak
          tercantum di tabel.
        </Text>
      </Alert>

      <Box overflow="auto">
        <Table variant="simple" size="sm" fontSize="xs">
          <TableCaption>Data berasal dari isian {trial.title}.</TableCaption>
          <Thead bgColor="gray.50" position="sticky">
            <Tr>
              <Th rowSpan="2">No.</Th>
              <Th rowSpan="2">Nama Instansi</Th>
              <Th rowSpan="2">Parameter</Th>
              {trial_options_list.map(({ value, label }) => (
                <Th key={value} colSpan="3">
                  {label}
                </Th>
              ))}
            </Tr>
            <Tr>
              {trial_options_list.map(({ value }) => (
                <Fragment key={value}>
                  <Th>Min</Th>
                  <Th>Max</Th>
                  <Th>Avg</Th>
                </Fragment>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {agencies_list.map(({ label, value }) => (
              <Fragment key={value}>
                <Tr>
                  <Td rowSpan="4" fontWeight="bold">
                    {i++}
                  </Td>
                  <Td rowSpan="4" fontWeight="bold">
                    {label}
                  </Td>
                  <Td>IPK</Td>
                  {trial_options_list.map(({ value: trial_value }) => (
                    <Fragment key={trial_value}>
                      <Td>
                        {_.min(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ cum_score }) => {
                              return cum_score;
                            })
                        ) || '-'}
                      </Td>
                      <Td>
                        {_.max(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ cum_score }) => {
                              return cum_score;
                            })
                        ) || '-'}
                      </Td>
                      <Td fontWeight="bold">
                        {_.mean(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ cum_score }) => {
                              return Number(cum_score);
                            })
                        )
                          ? Number(
                              _.mean(
                                userAgenciesList
                                  .filter(({ agency_id, trial_option_id }) => {
                                    return (
                                      value == agency_id &&
                                      trial_value == trial_option_id
                                    );
                                  })
                                  .map(({ cum_score }) => {
                                    return Number(cum_score);
                                  })
                              )
                            ).toFixed(2)
                          : '-'}
                      </Td>
                    </Fragment>
                  ))}
                </Tr>
                <Tr>
                  <Td>SKD</Td>
                  {trial_options_list.map(({ value: trial_value }) => (
                    <Fragment key={trial_value}>
                      <Td>
                        {_.min(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ skd_score }) => {
                              return skd_score;
                            })
                        )
                          ? Number(
                              _.min(
                                userAgenciesList
                                  .filter(({ agency_id, trial_option_id }) => {
                                    return (
                                      value == agency_id &&
                                      trial_value == trial_option_id
                                    );
                                  })
                                  .map(({ skd_score }) => {
                                    return skd_score;
                                  })
                              )
                            ).toFixed(0)
                          : '-'}
                      </Td>
                      <Td>
                        {_.max(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ skd_score }) => {
                              return skd_score;
                            })
                        )
                          ? Number(
                              _.max(
                                userAgenciesList
                                  .filter(({ agency_id, trial_option_id }) => {
                                    return (
                                      value == agency_id &&
                                      trial_value == trial_option_id
                                    );
                                  })
                                  .map(({ skd_score }) => {
                                    return skd_score;
                                  })
                              )
                            ).toFixed(0)
                          : '-'}
                      </Td>
                      <Td fontWeight="bold">
                        {_.mean(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ skd_score }) => {
                              return Number(skd_score);
                            })
                        )
                          ? Number(
                              _.mean(
                                userAgenciesList
                                  .filter(({ agency_id, trial_option_id }) => {
                                    return (
                                      value == agency_id &&
                                      trial_value == trial_option_id
                                    );
                                  })
                                  .map(({ skd_score }) => {
                                    return Number(skd_score);
                                  })
                              )
                            ).toFixed(0)
                          : '-'}
                      </Td>
                    </Fragment>
                  ))}
                </Tr>
                <Tr>
                  <Td>N. Akhir</Td>
                  {trial_options_list.map(({ value: trial_value }) => (
                    <Fragment key={trial_value}>
                      <Td>
                        {_.min(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ final_score }) => {
                              return final_score;
                            })
                        )
                          ? Number(
                              _.min(
                                userAgenciesList
                                  .filter(({ agency_id, trial_option_id }) => {
                                    return (
                                      value == agency_id &&
                                      trial_value == trial_option_id
                                    );
                                  })
                                  .map(({ final_score }) => {
                                    return final_score;
                                  })
                              )
                            ).toFixed(2)
                          : '-'}
                      </Td>
                      <Td>
                        {_.max(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ final_score }) => {
                              return final_score;
                            })
                        )
                          ? Number(
                              _.max(
                                userAgenciesList
                                  .filter(({ agency_id, trial_option_id }) => {
                                    return (
                                      value == agency_id &&
                                      trial_value == trial_option_id
                                    );
                                  })
                                  .map(({ final_score }) => {
                                    return final_score;
                                  })
                              )
                            ).toFixed(2)
                          : '-'}
                      </Td>
                      <Td fontWeight="bold">
                        {_.mean(
                          userAgenciesList
                            .filter(({ agency_id, trial_option_id }) => {
                              return (
                                value == agency_id &&
                                trial_value == trial_option_id
                              );
                            })
                            .map(({ final_score }) => {
                              return Number(final_score);
                            })
                        )
                          ? Number(
                              _.mean(
                                userAgenciesList
                                  .filter(({ agency_id, trial_option_id }) => {
                                    return (
                                      value == agency_id &&
                                      trial_value == trial_option_id
                                    );
                                  })
                                  .map(({ final_score }) => {
                                    return Number(final_score);
                                  })
                              )
                            ).toFixed(2)
                          : '-'}
                      </Td>
                    </Fragment>
                  ))}
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Pemilih</Td>
                  {trial_options_list.map(({ value: trial_value }) => (
                    <Fragment key={trial_value}>
                      <Td colSpan="3" fontWeight="bold" textAlign="center">
                        {userAgenciesList.filter(
                          ({ agency_id, trial_option_id }) => {
                            return (
                              value == agency_id &&
                              trial_value == trial_option_id
                            );
                          }
                        ).length || '-'}
                      </Td>
                    </Fragment>
                  ))}
                </Tr>
              </Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}
