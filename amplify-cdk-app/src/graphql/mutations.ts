/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const sendSummaryEmail = /* GraphQL */ `
  mutation SendSummaryEmail {
    sendSummaryEmail
  }
`;
export const createRecord = /* GraphQL */ `
  mutation CreateRecord(
    $input: CreateRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    createRecord(input: $input, condition: $condition) {
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
export const updateRecord = /* GraphQL */ `
  mutation UpdateRecord(
    $input: UpdateRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    updateRecord(input: $input, condition: $condition) {
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
export const deleteRecord = /* GraphQL */ `
  mutation DeleteRecord(
    $input: DeleteRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    deleteRecord(input: $input, condition: $condition) {
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
