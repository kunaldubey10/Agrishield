import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'agrishield',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getFieldRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetField', inputVars);
}
getFieldRef.operationName = 'GetField';

export function getField(dcOrVars, vars) {
  return executeQuery(getFieldRef(dcOrVars, vars));
}

export const listFieldsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFields');
}
listFieldsRef.operationName = 'ListFields';

export function listFields(dc) {
  return executeQuery(listFieldsRef(dc));
}

export const createDetectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDetection', inputVars);
}
createDetectionRef.operationName = 'CreateDetection';

export function createDetection(dcOrVars, vars) {
  return executeMutation(createDetectionRef(dcOrVars, vars));
}

