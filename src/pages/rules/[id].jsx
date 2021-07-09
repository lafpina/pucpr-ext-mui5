import { useRouter } from "next/router";

function RuleConfigDetailPage() {
  const router = useRouter();

  return (
    <div>
      <h2> Detalhe da Rega {router.query.id} </h2>
    </div>
  );
}

export default RuleConfigDetailPage;
