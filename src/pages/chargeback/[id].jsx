import { useRouter } from "next/router";

function QueueAnalisysDetailPage() {
  const router = useRouter();

  return (
    <div>
      <h2> Detalhe do Alerta Gerado {router.query.id} </h2>
    </div>
  );
}

export default QueueAnalisysDetailPage;
