import { useRouter } from "next/router";
export default function Home() {
  const { push } = useRouter();
  const handleRoute = () => push("/products");
  return (
    <div className="flex m-auto my-10 flex-col gap-10 ">
      <h1 className="w-full flex m-auto items-center justify-center text-5xl font-bold">
        WELCOME!
      </h1>
      <span
        onClick={handleRoute}
        className="m-auto cursor-pointer hover:text-blue-300 text-base"
      >
        See hot deals!
      </span>
    </div>
  );
}
