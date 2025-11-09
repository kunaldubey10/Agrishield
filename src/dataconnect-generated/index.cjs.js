const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'agrishield',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getFieldRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetField', inputVars);
}
getFieldRef.operationName = 'GetField';
exports.getFieldRef = getFieldRef;

exports.getField = function getField(dcOrVars, vars) {
  return executeQuery(getFieldRef(dcOrVars, vars));
};

const listFieldsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFields');
}
listFieldsRef.operationName = 'ListFields';
exports.listFieldsRef = listFieldsRef;

exports.listFields = function listFields(dc) {
  return executeQuery(listFieldsRef(dc));
};

const createDetectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDetection', inputVars);
}
createDetectionRef.operationName = 'CreateDetection';
exports.createDetectionRef = createDetectionRef;

exports.createDetection = function createDetection(dcOrVars, vars) {
  return executeMutation(createDetectionRef(dcOrVars, vars));
};
