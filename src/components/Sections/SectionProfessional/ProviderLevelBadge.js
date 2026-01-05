import { FaMedal, FaTrophy, FaGem, FaUser } from "react-icons/fa";

export default function ProviderLevelBadge({ level, className = "" }) {
  const getBadgeInfo = (nivel) => {
    const nivelNormalizado = nivel ? nivel.toLowerCase() : "iniciante";

    switch (nivelNormalizado) {
      case "diamante":
        return {
          icon: FaGem,
          style: "bg-blue-100 text-blue-700 border border-blue-200",
          label: "Diamante",
        };
      case "platina":
        return {
          icon: FaTrophy,
          style: "bg-cyan-100 text-cyan-700 border border-cyan-200",
          label: "Platina",
        };
      case "ouro":
        return {
          icon: FaMedal,
          style: "bg-yellow-100 text-yellow-700 border border-yellow-200",
          label: "Ouro",
        };
      case "prata":
        return {
          icon: FaMedal,
          style: "bg-gray-100 text-gray-700 border border-gray-200",
          label: "Prata",
        };
      case "bronze":
        return {
          icon: FaMedal,
          style: "bg-orange-100 text-orange-800 border border-orange-200",
          label: "Bronze",
        };
      default:
        return {
          icon: FaUser,
          style: "bg-gray-50 text-gray-600 border border-gray-200",
          label: "Iniciante",
        };
    }
  };

  const { icon: Icon, style, label } = getBadgeInfo(level);

  return (
    <div
      className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full text-xs font-bold ${style} ${className}`}
    >
      <Icon />
      <span>{label}</span>
    </div>
  );
}
