/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRecordInput = {
  id?: string | null,
  raceId?: number | null,
  name: string,
  discordId?: number | null,
  section: number,
  team: string,
  result: string,
  description?: string | null,
};

export type ModelRecordConditionInput = {
  raceId?: ModelIntInput | null,
  name?: ModelStringInput | null,
  discordId?: ModelIntInput | null,
  section?: ModelIntInput | null,
  team?: ModelStringInput | null,
  result?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelRecordConditionInput | null > | null,
  or?: Array< ModelRecordConditionInput | null > | null,
  not?: ModelRecordConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Record = {
  __typename: "Record",
  id: string,
  raceId?: number | null,
  name: string,
  discordId?: number | null,
  section: number,
  team: string,
  result: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRecordInput = {
  id: string,
  raceId?: number | null,
  name?: string | null,
  discordId?: number | null,
  section?: number | null,
  team?: string | null,
  result?: string | null,
  description?: string | null,
};

export type DeleteRecordInput = {
  id: string,
};

export type CreateSettingInput = {
  id?: string | null,
  raceId?: number | null,
  description?: string | null,
  enable: boolean,
};

export type ModelSettingConditionInput = {
  raceId?: ModelIntInput | null,
  description?: ModelStringInput | null,
  enable?: ModelBooleanInput | null,
  and?: Array< ModelSettingConditionInput | null > | null,
  or?: Array< ModelSettingConditionInput | null > | null,
  not?: ModelSettingConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Setting = {
  __typename: "Setting",
  id: string,
  raceId?: number | null,
  description?: string | null,
  enable: boolean,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSettingInput = {
  id: string,
  raceId?: number | null,
  description?: string | null,
  enable?: boolean | null,
};

export type DeleteSettingInput = {
  id: string,
};

export type ModelRecordFilterInput = {
  id?: ModelIDInput | null,
  raceId?: ModelIntInput | null,
  name?: ModelStringInput | null,
  discordId?: ModelIntInput | null,
  section?: ModelIntInput | null,
  team?: ModelStringInput | null,
  result?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelRecordFilterInput | null > | null,
  or?: Array< ModelRecordFilterInput | null > | null,
  not?: ModelRecordFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRecordConnection = {
  __typename: "ModelRecordConnection",
  items:  Array<Record | null >,
  nextToken?: string | null,
};

export type ModelSettingFilterInput = {
  id?: ModelIDInput | null,
  raceId?: ModelIntInput | null,
  description?: ModelStringInput | null,
  enable?: ModelBooleanInput | null,
  and?: Array< ModelSettingFilterInput | null > | null,
  or?: Array< ModelSettingFilterInput | null > | null,
  not?: ModelSettingFilterInput | null,
};

export type ModelSettingConnection = {
  __typename: "ModelSettingConnection",
  items:  Array<Setting | null >,
  nextToken?: string | null,
};

export type ModelRecordByRaceIdCompositeKeyConditionInput = {
  eq?: ModelRecordByRaceIdCompositeKeyInput | null,
  le?: ModelRecordByRaceIdCompositeKeyInput | null,
  lt?: ModelRecordByRaceIdCompositeKeyInput | null,
  ge?: ModelRecordByRaceIdCompositeKeyInput | null,
  gt?: ModelRecordByRaceIdCompositeKeyInput | null,
  between?: Array< ModelRecordByRaceIdCompositeKeyInput | null > | null,
  beginsWith?: ModelRecordByRaceIdCompositeKeyInput | null,
};

export type ModelRecordByRaceIdCompositeKeyInput = {
  section?: number | null,
  team?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateRecordMutationVariables = {
  input: CreateRecordInput,
  condition?: ModelRecordConditionInput | null,
};

export type CreateRecordMutation = {
  createRecord?:  {
    __typename: "Record",
    id: string,
    raceId?: number | null,
    name: string,
    discordId?: number | null,
    section: number,
    team: string,
    result: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRecordMutationVariables = {
  input: UpdateRecordInput,
  condition?: ModelRecordConditionInput | null,
};

export type UpdateRecordMutation = {
  updateRecord?:  {
    __typename: "Record",
    id: string,
    raceId?: number | null,
    name: string,
    discordId?: number | null,
    section: number,
    team: string,
    result: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRecordMutationVariables = {
  input: DeleteRecordInput,
  condition?: ModelRecordConditionInput | null,
};

export type DeleteRecordMutation = {
  deleteRecord?:  {
    __typename: "Record",
    id: string,
    raceId?: number | null,
    name: string,
    discordId?: number | null,
    section: number,
    team: string,
    result: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSettingMutationVariables = {
  input: CreateSettingInput,
  condition?: ModelSettingConditionInput | null,
};

export type CreateSettingMutation = {
  createSetting?:  {
    __typename: "Setting",
    id: string,
    raceId?: number | null,
    description?: string | null,
    enable: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSettingMutationVariables = {
  input: UpdateSettingInput,
  condition?: ModelSettingConditionInput | null,
};

export type UpdateSettingMutation = {
  updateSetting?:  {
    __typename: "Setting",
    id: string,
    raceId?: number | null,
    description?: string | null,
    enable: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSettingMutationVariables = {
  input: DeleteSettingInput,
  condition?: ModelSettingConditionInput | null,
};

export type DeleteSettingMutation = {
  deleteSetting?:  {
    __typename: "Setting",
    id: string,
    raceId?: number | null,
    description?: string | null,
    enable: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetRecordQueryVariables = {
  id: string,
};

export type GetRecordQuery = {
  getRecord?:  {
    __typename: "Record",
    id: string,
    raceId?: number | null,
    name: string,
    discordId?: number | null,
    section: number,
    team: string,
    result: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRecordsQueryVariables = {
  filter?: ModelRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecordsQuery = {
  listRecords?:  {
    __typename: "ModelRecordConnection",
    items:  Array< {
      __typename: "Record",
      id: string,
      raceId?: number | null,
      name: string,
      discordId?: number | null,
      section: number,
      team: string,
      result: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSettingQueryVariables = {
  id: string,
};

export type GetSettingQuery = {
  getSetting?:  {
    __typename: "Setting",
    id: string,
    raceId?: number | null,
    description?: string | null,
    enable: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSettingsQueryVariables = {
  filter?: ModelSettingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSettingsQuery = {
  listSettings?:  {
    __typename: "ModelSettingConnection",
    items:  Array< {
      __typename: "Setting",
      id: string,
      raceId?: number | null,
      description?: string | null,
      enable: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RecordByRaceIdQueryVariables = {
  raceId: number,
  sectionTeam?: ModelRecordByRaceIdCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RecordByRaceIdQuery = {
  recordByRaceId?:  {
    __typename: "ModelRecordConnection",
    items:  Array< {
      __typename: "Record",
      id: string,
      raceId?: number | null,
      name: string,
      discordId?: number | null,
      section: number,
      team: string,
      result: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRecordSubscription = {
  onCreateRecord?:  {
    __typename: "Record",
    id: string,
    raceId?: number | null,
    name: string,
    discordId?: number | null,
    section: number,
    team: string,
    result: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRecordSubscription = {
  onUpdateRecord?:  {
    __typename: "Record",
    id: string,
    raceId?: number | null,
    name: string,
    discordId?: number | null,
    section: number,
    team: string,
    result: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRecordSubscription = {
  onDeleteRecord?:  {
    __typename: "Record",
    id: string,
    raceId?: number | null,
    name: string,
    discordId?: number | null,
    section: number,
    team: string,
    result: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSettingSubscription = {
  onCreateSetting?:  {
    __typename: "Setting",
    id: string,
    raceId?: number | null,
    description?: string | null,
    enable: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSettingSubscription = {
  onUpdateSetting?:  {
    __typename: "Setting",
    id: string,
    raceId?: number | null,
    description?: string | null,
    enable: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSettingSubscription = {
  onDeleteSetting?:  {
    __typename: "Setting",
    id: string,
    raceId?: number | null,
    description?: string | null,
    enable: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};
