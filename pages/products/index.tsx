import { getOr } from "lodash/fp";
const Products = ({ products = [] }: PropTypes) => {
  return (
    <div className="flex flex-col m-auto w-full items-center my-8">
      <h1 className="text-5xl font-bold text-gray-700">W2W Hot items</h1>
      <div className="flex flex-col md:flex-row gap-2 my-10">
        {products.map((product, idx) => (
          <div
            className="flex max-w-md flex-col gap-6 p-4 bg-gray-100 rounded-md hover:bg-blue-100"
            key={`${getOr("", "title", product)}-${idx}`}
          >
            <img
              src={getOr("", "card.url", product)}
              alt={getOr("404", "card.fileName", product)}
            />
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">
                {getOr("", "title", product)}
              </span>
              <p>{getOr("", "card.description", product)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;

export async function getStaticProps() {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${space}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: `
          {
						productCollection {
							items {
								title 
								slug
								card {
										fileName
										url
										description
								}
							}
						}
          }
				`,
      }),
    }
  );
  // grab the data from our response
  const { data } = await res.json();
  return {
    props: {
      products: data.productCollection.items,
    },
  };
}

type PropTypes = {
  products: [];
};
