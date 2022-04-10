export async function isNewuser(token, issuer) {
  const operationsDoc = `
query isNewUser($issuer: String!) {
  users(where: {issuer: {_eq: $issuer}}) {
    id
    email
    issuer
  }
}
`;

  const resp = await queryHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  console.log(resp.data.users);
  return resp?.data?.users?.length === 0;
}
export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;
  const response = await queryHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    {
      issuer,
      email,
      publicAddress,
    },
    token
  );

  return response;
}
async function queryHasuraGraphQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await result.json();
}
