import { CreateUserData, CreateUserVariables, GetFieldData, GetFieldVariables, ListFieldsData, CreateDetectionData, CreateDetectionVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetField(vars: GetFieldVariables, options?: useDataConnectQueryOptions<GetFieldData>): UseDataConnectQueryResult<GetFieldData, GetFieldVariables>;
export function useGetField(dc: DataConnect, vars: GetFieldVariables, options?: useDataConnectQueryOptions<GetFieldData>): UseDataConnectQueryResult<GetFieldData, GetFieldVariables>;

export function useListFields(options?: useDataConnectQueryOptions<ListFieldsData>): UseDataConnectQueryResult<ListFieldsData, undefined>;
export function useListFields(dc: DataConnect, options?: useDataConnectQueryOptions<ListFieldsData>): UseDataConnectQueryResult<ListFieldsData, undefined>;

export function useCreateDetection(options?: useDataConnectMutationOptions<CreateDetectionData, FirebaseError, CreateDetectionVariables>): UseDataConnectMutationResult<CreateDetectionData, CreateDetectionVariables>;
export function useCreateDetection(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDetectionData, FirebaseError, CreateDetectionVariables>): UseDataConnectMutationResult<CreateDetectionData, CreateDetectionVariables>;
