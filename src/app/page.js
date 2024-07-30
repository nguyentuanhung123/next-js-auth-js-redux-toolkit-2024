import { fetchAllProducts } from "@/actions";
import { auth } from "@/auth";
import ProductCard from "@/components/product-card";
import { redirect } from "next/navigation";


export default async function Home() {

  const getSession = await auth();
  console.log(getSession);

  const getAllProducts = await fetchAllProducts();

  if(!getSession?.user) redirect("/unauth-page");

  // console.log(getAllProducts);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto p-2">
        {
          getAllProducts && getAllProducts.data && getAllProducts.data.length > 0 ? (
            getAllProducts.data.map((productItem) => <ProductCard key={productItem.id} item={productItem}/>)
          ) : null
        }
      </div>
    </div>
  );
}
