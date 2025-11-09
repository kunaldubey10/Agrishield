import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDetectionData {
  detection_insert: Detection_Key;
}

export interface CreateDetectionVariables {
  fieldId: UUIDString;
  cropId: UUIDString;
  confidenceScore: number;
  detectedDisease: string;
  imageUrl: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email: string;
}

export interface Crop_Key {
  id: UUIDString;
  __typename?: 'Crop_Key';
}

export interface Detection_Key {
  id: UUIDString;
  __typename?: 'Detection_Key';
}

export interface Field_Key {
  id: UUIDString;
  __typename?: 'Field_Key';
}

export interface GetFieldData {
  field?: {
    id: UUIDString;
    name: string;
    location: string;
    sizeAcres: number;
    soilType?: string | null;
    createdAt: TimestampString;
    lastPlantedDate?: DateString | null;
  } & Field_Key;
}

export interface GetFieldVariables {
  id: UUIDString;
}

export interface ListFieldsData {
  fields: ({
    id: UUIDString;
    name: string;
    location: string;
    sizeAcres: number;
    soilType?: string | null;
    createdAt: TimestampString;
    lastPlantedDate?: DateString | null;
  } & Field_Key)[];
}

export interface Recommendation_Key {
  id: UUIDString;
  __typename?: 'Recommendation_Key';
}

export interface SatelliteData_Key {
  id: UUIDString;
  __typename?: 'SatelliteData_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetFieldRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFieldVariables): QueryRef<GetFieldData, GetFieldVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFieldVariables): QueryRef<GetFieldData, GetFieldVariables>;
  operationName: string;
}
export const getFieldRef: GetFieldRef;

export function getField(vars: GetFieldVariables): QueryPromise<GetFieldData, GetFieldVariables>;
export function getField(dc: DataConnect, vars: GetFieldVariables): QueryPromise<GetFieldData, GetFieldVariables>;

interface ListFieldsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFieldsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListFieldsData, undefined>;
  operationName: string;
}
export const listFieldsRef: ListFieldsRef;

export function listFields(): QueryPromise<ListFieldsData, undefined>;
export function listFields(dc: DataConnect): QueryPromise<ListFieldsData, undefined>;

interface CreateDetectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDetectionVariables): MutationRef<CreateDetectionData, CreateDetectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDetectionVariables): MutationRef<CreateDetectionData, CreateDetectionVariables>;
  operationName: string;
}
export const createDetectionRef: CreateDetectionRef;

export function createDetection(vars: CreateDetectionVariables): MutationPromise<CreateDetectionData, CreateDetectionVariables>;
export function createDetection(dc: DataConnect, vars: CreateDetectionVariables): MutationPromise<CreateDetectionData, CreateDetectionVariables>;

