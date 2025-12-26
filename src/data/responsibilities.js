import Link from "next/link";
import "../components/Sections/Responsibilities/Responsibilities.css";

export const responsibilities = [
  {
    title: "Sobre dados sensíveis",
    description:
      "A Jobberu é uma plataforma em constante evolução e, no momento, não trabalha com dados sensíveis dos usuários, como CPF ou informações bancárias. Quando essa funcionalidade for implementada, todos os usuários serão notificados para realizar as atualizações cadastrais de forma segura.",
  },
  {
    title: "Contato e negociações diretas",
    description:
      "Atualmente, a Jobberu não possui sistema de pagamento integrado. Todo contato, negociação, valores e acordos são feitos diretamente entre cliente e profissional, sendo de inteira responsabilidade de ambas as partes.",
  },
  {
    title: "Conferência dos dados cadastrados",
    description:
      "É responsabilidade do usuário garantir que todas as informações cadastradas estejam corretas e atualizadas, principalmente o número de telefone, que será o principal meio de contato entre clientes e profissionais.",
  },
  {
    title: "Análise e moderação de perfis",
    description: (
      <>
        Todos os perfis passam por uma análise da plataforma. Caso seja
        identificado qualquer conteúdo que viole os{" "}
        <Link href="/terms-of-use" className="link-termos">
          Termos de Uso
        </Link>
        , a conta poderá ser suspensa ou banida sem aviso prévio.
      </>
    ),
  },
  {
    title: "Sistema de denúncias",
    description:
      "No momento, a Jobberu ainda não possui um sistema público de denúncias. No entanto, realizamos análises constantes para manter a segurança e a qualidade da plataforma.",
  },
  {
    title: "Respeito à comunidade",
    description:
      "A Jobberu foi criada para a comunidade em geral. Não são permitidos xingamentos, palavrões, discurso de ódio, fotos impróprias ou qualquer conteúdo ofensivo, especialmente em avaliações.",
  },
  {
    title: "Avaliações responsáveis",
    description:
      "As avaliações devem ser feitas de forma honesta, respeitosa e baseada na experiência real com o serviço. Avaliações ofensivas ou falsas poderão ser removidas.",
  },
  {
    title: "Responsabilidade sobre serviços",
    description:
      "A Jobberu atua apenas como plataforma de conexão. A execução do serviço, qualidade, prazos e acordos firmados são de responsabilidade exclusiva entre cliente e profissional.",
  },
  {
    title: "Atualizações da plataforma",
    description:
      "A Jobberu está em constante evolução. Novas funcionalidades, sistemas de segurança e recursos poderão ser adicionados a qualquer momento para melhorar a experiência dos usuários.",
  },
];
export default responsibilities;
