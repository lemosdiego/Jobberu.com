import { MdSearch } from "react-icons/md";
import { FaHandshake, FaMapMarked } from "react-icons/fa";

const instruction = [
  {
    icon: MdSearch,
    title: "Simplifique sua vida!",
    text: "Chega de perder tempo pesquisando profissionais ou pedindo indicações que não dão certo. No Jobberu, você encontra em poucos cliques quem pode resolver seu problema com qualidade e confiança.",
    bg: "from-blue-50 to-indigo-100", // Azul claro suave
    iconColor: "text-blue-500",
  },
  {
    icon: FaHandshake,
    title: "Negocie direto!",
    text: "No Jobberu, você pesquisa pelos melhores profissionais da sua cidade ou região, de forma simples e rápida. E o melhor: negocia direto com o prestador, sem intermediários.",
    bg: "from-emerald-50 to-teal-100", // Verde menta leve
    iconColor: "text-emerald-500",
  },
  {
    icon: FaMapMarked,
    title: "Encontre na sua região",
    text: "Digite o nome da sua cidade e veja uma lista de profissionais disponíveis. Se quiser, filtre por categoria e encontre exatamente o serviço que precisa de forma fácil e prática.",
    bg: "from-purple-50 to-pink-100", // Roxo-rosa delicado
    iconColor: "text-purple-500",
  },
];

export default instruction;
