const getStaticPropsRequest = async (query:string) => {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
	const baseURL = 'https://graphql.contentful.com/content/v1/spaces/'
  const res = await fetch(
    `${baseURL}${space}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query,
      }),
    }
  );
  // grab the data from our response
  const { data } = await res.json();
  return data
};

export default getStaticPropsRequest;
