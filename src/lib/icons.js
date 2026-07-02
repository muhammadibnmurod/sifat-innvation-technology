// Curated lucide icon set shared by the admin icon-picker and the public site.
import {
  Wrench, FileSearch, RefreshCw, Building2, ShieldCheck, Cpu,
  Settings, Hammer, Cog, HardHat, Truck, Package,
  ClipboardCheck, Ruler, GraduationCap, FileText, Activity,
  Zap, Gauge, SearchCheck, Layers, Construction,
} from "lucide-react";

export const ICONS = {
  Wrench, FileSearch, RefreshCw, Building2, ShieldCheck, Cpu,
  Settings, Hammer, Cog, HardHat, Truck, Package,
  ClipboardCheck, Ruler, GraduationCap, FileText, Activity,
  Zap, Gauge, SearchCheck, Layers, Construction,
};

export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name) {
  return ICONS[name] || Wrench;
}
