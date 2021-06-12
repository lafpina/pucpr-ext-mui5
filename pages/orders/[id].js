import { Router, useRouter } from "next/router";

function OrderDetailPage() {
  const router = useRouter();

  return (
    <div>
      <h2> Detalhe do Pedido {router.query.id} </h2>;
    </div>
  );
}

export default OrderDetailPage;
