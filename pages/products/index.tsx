import { getOr } from "lodash/fp";
import { useRouter } from "next/router";
import getStaticPropsRequest from "../../src/utils/getStaticPropsRequest";
const Products = ({ products = [] }: PropTypes) => {
  const { push } = useRouter();
  const handleSelectProduct = (slug) => push(`/products/${slug}`);
  return (
    <div className="flex flex-col m-auto w-full items-center my-8">
      <h1 className="text-5xl font-bold text-gray-700">W2W Hot items</h1>
      <div className="flex flex-col md:flex-row gap-2 my-10">
        {products.map((product, idx) => (
          <div
            onClick={() => handleSelectProduct(getOr("", "slug", product))}
            className="flex cursor-pointer max-w-md flex-col gap-6 p-4 bg-gray-100 rounded-md hover:bg-blue-100"
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
  const res = await getStaticPropsRequest(`
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
	`);
  return {
    props: {
      products: res.productCollection.items,
    },
  };
}

type PropTypes = {
  products: [];
};
