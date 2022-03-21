/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecord = /* GraphQL */ `
  query GetRecord($id: ID!) {
    getRecord(id: $id) {
      id
      raceId
      name
      discordId
      section
      team
      result
      description
      createdAt
      updatedAt
    }
  }
`;
export const listRecords = /* GraphQL */ `
  query ListRecords(
    $filter: ModelRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        raceId
        name
        discordId
        section
        team
        result
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const recordByRaceId = /* GraphQL */ `
  query RecordByRaceId(
    $raceId: Int!
    $sectionTeam: ModelRecordByRaceIdCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recordByRaceId(
      raceId: $raceId
      sectionTeam: $sectionTeam
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        raceId
        name
        discordId
        section
        team
        result
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
