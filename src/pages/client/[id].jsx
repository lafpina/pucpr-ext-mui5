import { useRouter } from "next/router";

function ClientDetailPage() {
  const router = useRouter();

  return (
    <div>
      <h2> Detalhe do cliente {router.query.id} </h2>
    </div>
  );
}

export default ClientDetailPage;
