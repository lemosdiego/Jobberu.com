import { MdSearch } from "react-icons/md";
import { FaHandshake, FaMapMarked } from "react-icons/fa";

const instruction = [
  {
    icon: MdSearch,
    title: "Simplifique sua vida!",
    text: "Encontre profissionais de forma rápida, sem perder tempo com buscas longas ou indicações incertas.",
    bg: "from-slate-50 to-white-50",
    iconColor: "text-blue-500",
  },
  {
    icon: FaHandshake,
    title: "Negocie direto!",
    text: "Pesquise profissionais da sua região e fale diretamente com quem vai te atender, sem intermediários.",
    bg: "from-slate-50 to-white-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: FaMapMarked,
    title: "Encontre na sua região",
    text: "Informe sua cidade, filtre por categoria e encontre exatamente o serviço que precisa.",
    bg: "from-slate-50 to-white-50",
    iconColor: "text-purple-500",
  },
];

export default instruction;
