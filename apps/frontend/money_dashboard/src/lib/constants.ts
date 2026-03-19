import { Activity, BarChart3, Database, Search, ShieldCheck } from "lucide-react";

export const ADMIN_TOOLS = [
  {
    name: "Analytics (Umami)",
    href: "https://analytics.doradora58.com",
    icon: BarChart3,
    color: "text-blue-500",
    description: "訪問者数・アクセスのリアルタイム解析"
  },
  {
    name: "Logging (Kibana)",
    href: "https://logs.doradora58.com",
    icon: Search,
    color: "text-pink-500",
    description: "ELKスタックによるログ全文検索"
  },
  {
    name: "Metrics (Grafana)",
    href: "https://grafana.doradora58.com",
    icon: Activity,
    color: "text-orange-500",
    description: "ラズパイ3台のCPU・メモリ負荷監視"
  },
  {
    name: "Database (Adminer/pgAdmin)",
    href: "https://db.doradora58.com", // もし後で立てるなら
    icon: Database,
    color: "text-indigo-500",
    description: "PostgreSQLのデータ直接管理"
  }
];