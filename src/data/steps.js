import {
  PiNumberOneThin,
  PiNumberTwoThin,
  PiNumberThreeThin,
  PiNumberFourThin,
  PiNumberFiveThin,
  PiNumberSixThin,
} from "react-icons/pi";
const steps = [
  {
    icon: (
      <PiNumberOneThin className="mb-2  p-5 rounded-full absolute -top-7 left-5 transform -translate-x-1/2 bg-green-500 text-7xl" />
    ),
    title: "Cadastre-se como Profissional",
    description:
      "Crie sua conta, adicione uma boa foto de perfil, escreva uma biografia clara e defina seu título profissional. Essas informações ajudam clientes a entenderem seu serviço e confiarem no seu trabalho.",
  },
  {
    icon: (
      <PiNumberTwoThin className="mb-2 p-5 rounded-full absolute -top-7 left-5 transform -translate-x-1/2 bg-green-500 text-7xl" />
    ),
    title: "Crie seu Serviço",
    description:
      "Adicione fotos de trabalhos realizados, escreva uma descrição objetiva e escolha a categoria correta. Você pode definir um valor inicial para ajudar o cliente a entender seu serviço.",
  },
  {
    icon: (
      <PiNumberThreeThin className="mb-2  p-5 rounded-full absolute -top-7 left-5 transform -translate-x-1/2 bg-green-500 text-7xl" />
    ),
    title: "Conexão Direta com o Cliente",
    description:
      "Na Jobberu, o contato é direto e privado. O cliente fala com você pelo WhatsApp para combinar valores, local, prazos e todos os detalhes do serviço.",
  },
  {
    icon: (
      <PiNumberFourThin className="mb-2  p-5 rounded-full absolute -top-7 left-5 transform -translate-x-1/2 bg-green-500 text-7xl" />
    ),
    title: "Feche Negócio com Confiança",
    description:
      "O fechamento do serviço acontece de forma transparente. Perfis bem preenchidos, descrições claras e boas imagens aumentam suas chances de fechar novos trabalhos.",
  },
  {
    icon: (
      <PiNumberFiveThin className="mb-2  p-5 rounded-full absolute -top-7 left-5 transform -translate-x-1/2 bg-green-500 text-7xl" />
    ),
    title: "Construa sua Reputação",
    description:
      "Após o serviço, o cliente pode avaliar seu trabalho. Avaliações positivas aumentam sua credibilidade e ajudam outros clientes a escolherem você.",
  },
  {
    icon: (
      <PiNumberSixThin className="mb-2  p-5 rounded-full absolute -top-7 left-5 transform -translate-x-1/2 bg-green-500 text-7xl" />
    ),
    title: "Cresça com Jobberu",
    description:
      "A Jobberu conecta profissionais locais a clientes da região, ajudando você a ganhar visibilidade, conquistar novos trabalhos e crescer de forma constante.",
  },
];

export default steps;
