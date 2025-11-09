# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetField*](#getfield)
  - [*ListFields*](#listfields)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateDetection*](#createdetection)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetField
You can execute the `GetField` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getField(vars: GetFieldVariables): QueryPromise<GetFieldData, GetFieldVariables>;

interface GetFieldRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFieldVariables): QueryRef<GetFieldData, GetFieldVariables>;
}
export const getFieldRef: GetFieldRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getField(dc: DataConnect, vars: GetFieldVariables): QueryPromise<GetFieldData, GetFieldVariables>;

interface GetFieldRef {
  ...
  (dc: DataConnect, vars: GetFieldVariables): QueryRef<GetFieldData, GetFieldVariables>;
}
export const getFieldRef: GetFieldRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFieldRef:
```typescript
const name = getFieldRef.operationName;
console.log(name);
```

### Variables
The `GetField` query requires an argument of type `GetFieldVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFieldVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetField` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFieldData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetField`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getField, GetFieldVariables } from '@dataconnect/generated';

// The `GetField` query requires an argument of type `GetFieldVariables`:
const getFieldVars: GetFieldVariables = {
  id: ..., 
};

// Call the `getField()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getField(getFieldVars);
// Variables can be defined inline as well.
const { data } = await getField({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getField(dataConnect, getFieldVars);

console.log(data.field);

// Or, you can use the `Promise` API.
getField(getFieldVars).then((response) => {
  const data = response.data;
  console.log(data.field);
});
```

### Using `GetField`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFieldRef, GetFieldVariables } from '@dataconnect/generated';

// The `GetField` query requires an argument of type `GetFieldVariables`:
const getFieldVars: GetFieldVariables = {
  id: ..., 
};

// Call the `getFieldRef()` function to get a reference to the query.
const ref = getFieldRef(getFieldVars);
// Variables can be defined inline as well.
const ref = getFieldRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFieldRef(dataConnect, getFieldVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.field);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.field);
});
```

## ListFields
You can execute the `ListFields` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFields(): QueryPromise<ListFieldsData, undefined>;

interface ListFieldsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFieldsData, undefined>;
}
export const listFieldsRef: ListFieldsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFields(dc: DataConnect): QueryPromise<ListFieldsData, undefined>;

interface ListFieldsRef {
  ...
  (dc: DataConnect): QueryRef<ListFieldsData, undefined>;
}
export const listFieldsRef: ListFieldsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFieldsRef:
```typescript
const name = listFieldsRef.operationName;
console.log(name);
```

### Variables
The `ListFields` query has no variables.
### Return Type
Recall that executing the `ListFields` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFieldsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListFields`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFields } from '@dataconnect/generated';


// Call the `listFields()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFields();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFields(dataConnect);

console.log(data.fields);

// Or, you can use the `Promise` API.
listFields().then((response) => {
  const data = response.data;
  console.log(data.fields);
});
```

### Using `ListFields`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFieldsRef } from '@dataconnect/generated';


// Call the `listFieldsRef()` function to get a reference to the query.
const ref = listFieldsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFieldsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.fields);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.fields);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  displayName: string;
  email: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  displayName: ..., 
  email: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ displayName: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateDetection
You can execute the `CreateDetection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDetection(vars: CreateDetectionVariables): MutationPromise<CreateDetectionData, CreateDetectionVariables>;

interface CreateDetectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDetectionVariables): MutationRef<CreateDetectionData, CreateDetectionVariables>;
}
export const createDetectionRef: CreateDetectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDetection(dc: DataConnect, vars: CreateDetectionVariables): MutationPromise<CreateDetectionData, CreateDetectionVariables>;

interface CreateDetectionRef {
  ...
  (dc: DataConnect, vars: CreateDetectionVariables): MutationRef<CreateDetectionData, CreateDetectionVariables>;
}
export const createDetectionRef: CreateDetectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDetectionRef:
```typescript
const name = createDetectionRef.operationName;
console.log(name);
```

### Variables
The `CreateDetection` mutation requires an argument of type `CreateDetectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDetectionVariables {
  fieldId: UUIDString;
  cropId: UUIDString;
  confidenceScore: number;
  detectedDisease: string;
  imageUrl: string;
}
```
### Return Type
Recall that executing the `CreateDetection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDetectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDetectionData {
  detection_insert: Detection_Key;
}
```
### Using `CreateDetection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDetection, CreateDetectionVariables } from '@dataconnect/generated';

// The `CreateDetection` mutation requires an argument of type `CreateDetectionVariables`:
const createDetectionVars: CreateDetectionVariables = {
  fieldId: ..., 
  cropId: ..., 
  confidenceScore: ..., 
  detectedDisease: ..., 
  imageUrl: ..., 
};

// Call the `createDetection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDetection(createDetectionVars);
// Variables can be defined inline as well.
const { data } = await createDetection({ fieldId: ..., cropId: ..., confidenceScore: ..., detectedDisease: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDetection(dataConnect, createDetectionVars);

console.log(data.detection_insert);

// Or, you can use the `Promise` API.
createDetection(createDetectionVars).then((response) => {
  const data = response.data;
  console.log(data.detection_insert);
});
```

### Using `CreateDetection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDetectionRef, CreateDetectionVariables } from '@dataconnect/generated';

// The `CreateDetection` mutation requires an argument of type `CreateDetectionVariables`:
const createDetectionVars: CreateDetectionVariables = {
  fieldId: ..., 
  cropId: ..., 
  confidenceScore: ..., 
  detectedDisease: ..., 
  imageUrl: ..., 
};

// Call the `createDetectionRef()` function to get a reference to the mutation.
const ref = createDetectionRef(createDetectionVars);
// Variables can be defined inline as well.
const ref = createDetectionRef({ fieldId: ..., cropId: ..., confidenceScore: ..., detectedDisease: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDetectionRef(dataConnect, createDetectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.detection_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.detection_insert);
});
```

