"use client";

import { useState } from "react";

/* ───────── Types ───────── */

interface Aircraft {
  id: number;
  title: string;
  sn: string;
  reg: string;
  hours: string;
  price: string;
  location: string;
  seller: string;
  contact: string;
  phone: string;
  whatsapp: boolean;
  highlights: string;
  engines: string;
  hoursAvail: string;
  column: string;
  notes: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  priceNote: string;
}

interface Column {
  id: string;
  label: string;
  color: string;
  bg: string;
}

interface Tag {
  label: string;
  color: string;
  bg: string;
}

/* ───────── Constants ───────── */

const COLUMNS: Column[] = [
  { id: "pending", label: "Aguardando Contato", color: "#F59E0B", bg: "#FEF3C7" },
  { id: "contacted", label: "Contatado", color: "#3B82F6", bg: "#DBEAFE" },
  { id: "negotiating", label: "Em Negociação", color: "#8B5CF6", bg: "#EDE9FE" },
  { id: "visited", label: "Visitado / Inspecionado", color: "#10B981", bg: "#D1FAE5" },
  { id: "discarded", label: "Descartado", color: "#EF4444", bg: "#FEE2E2" },
];

const TAGS: Record<string, Tag> = {
  br: { label: "Brasil", color: "#009739", bg: "#D1FAE5" },
  us: { label: "EUA", color: "#3B82F6", bg: "#DBEAFE" },
  eu: { label: "Europa", color: "#8B5CF6", bg: "#EDE9FE" },
  latam: { label: "LATAM", color: "#F59E0B", bg: "#FEF3C7" },
  xp: { label: "400XP", color: "#D946EF", bg: "#FAE8FF" },
  xpr: { label: "400XPR", color: "#EC4899", bg: "#FCE7F3" },
  fraction: { label: "Fração", color: "#EF4444", bg: "#FEE2E2" },
  program: { label: "Prog. Motores", color: "#14B8A6", bg: "#CCFBF1" },
  garmin: { label: "Garmin", color: "#059669", bg: "#D1FAE5" },
  lowtime: { label: "Low Time", color: "#0EA5E9", bg: "#E0F2FE" },
  verified: { label: "Verificado ✅", color: "#16A34A", bg: "#DCFCE7" },
  sold: { label: "VENDIDA ❌", color: "#DC2626", bg: "#FEE2E2" },
  notfound: { label: "Anúncio offline ⚠️", color: "#D97706", bg: "#FEF3C7" },
};

/* ───────── Helpers ───────── */

function cleanPhone(raw: string): string | null {
  if (!raw || raw.includes("Via ") || raw.includes("Contato via")) return null;
  const first = raw.split("/")[0].trim();
  return first.replace(/[^0-9+]/g, "");
}

function waLink(raw: string): string | null {
  const clean = cleanPhone(raw);
  if (!clean) return null;
  return "https://wa.me/" + clean.replace("+", "");
}

/* ───────── Data ───────── */

const initialAircraft: Aircraft[] = [
  {
    id: 1, title: "#1 — 1999 Beechjet 400A",
    sn: "RK-246", reg: "N308JR", hours: "7.490", price: "Call for price",
    location: "Pompano Beach, FL", seller: "Sky Aviation Holdings LLC",
    contact: "Sky Aviation Sales", phone: "+1 754-220-0401", whatsapp: false,
    highlights: "Pintura nova 05/2025, interior renovado, Hot Section recente, STC extensão TBO 1.950h rem, IFA em dia, Four-Tube EFIS, GTX-3000, ADS-B Out",
    engines: "E1: 1.950 SOH / E2: 1.950 SOH", hoursAvail: "1.950",
    column: "pending", notes: "", tags: ["us", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listing/for-sale/245237527/1999-beechcraft-beechjet-400a-jet-aircraft",
    priceNote: "Verificado 20/02: ativo no Controller, sem preço publicado",
  },
  {
    id: 2, title: "#2 — 2001 Hawker 400A",
    sn: "RK-313", reg: "HA-YFM", hours: "5.716", price: "Call for price",
    location: "Valletta, Malta", seller: "FCM JETS Group Ltd",
    contact: "Zsolt Daniel", phone: "+356 7764 4728", whatsapp: false,
    highlights: "Registro EASA, IFA/CAMP, interior 2023 (7 pax + 1 toilet), Three-Tube EFIS, Dual FMS-5000, TCAS 7.1, GPS-4000, FDR EASA STC. Inspeções E/F nov/2025, G abr/2024. MSP Gold motores+APU",
    engines: "E1: 6.517 SNEW / E2: 6.517 SNEW — TBO: 6.000", hoursAvail: "IFA",
    column: "pending", notes: "", tags: ["eu", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/hawker/400/jet-aircraft/3",
    priceNote: "Verificado 20/02: ativo no Controller e AvBuyer, sem preço publicado",
  },
  {
    id: 3, title: "#3 — 2003 Beechjet 400A",
    sn: "RK-349", reg: "N349FJ", hours: "4.866", price: "USD $1.649.000 ✅",
    location: "Amarillo, TX", seller: "Haven Aviation Services Group",
    contact: "Chris Bushaw", phone: "(915) 229-3103", whatsapp: false,
    highlights: "Part 135, depreciação 100%, super clean, AMS-5000, GPS-4000S, ADS-B, WAAS, Wi-Fi GoGo ATG-5000, pintura/interior 2018",
    engines: "E1: 1.311 SMOH / E2: 1.311 SMOH — TBO: 3.500", hoursAvail: "~2.189",
    column: "pending", notes: "", tags: ["us", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listing/for-sale/240712459/2003-beechcraft-beechjet-400a-jet-aircraft",
    priceNote: "Verificado 20/02: USD $1,649,000 confirmado no Controller",
  },
  {
    id: 4, title: "#4 — 2002 Beechjet 400A",
    sn: "RK332", reg: "N332AV", hours: "6.818", price: "USD $1.295.000 ✅",
    location: "Nashville, TN", seller: "Intl Aircraft Marketing & Sales",
    contact: "Brian Bartunek", phone: "(407) 748-0288", whatsapp: true,
    highlights: "Pintura nova 2025, Pro Line 4, Dual FMS-5000, TCAS-II, EGPWS, ADS-B, RVSM, 8 pax, couro tan, Burled Walnut. Comprador escolhe pintura!",
    engines: "E1: 6.549 SNEW / 2.948 SMOH — TBO: 3.600", hoursAvail: "~652",
    column: "pending", notes: "", tags: ["us", "verified"], source: "Controller.com / GlobalAir",
    sourceUrl: "https://www.globalair.com/aircraft-for-sale/beechjet-400a",
    priceNote: "Verificado 20/02: USD $1,295,000 confirmado no Controller e GlobalAir",
  },
  {
    id: 5, title: "#5 — 2002 Beechjet 400A",
    sn: "RK-341", reg: "N61GB", hours: "6.749", price: "Call for price",
    location: "Omaha, NE", seller: "Vertical Jet Sales",
    contact: "Ben McPeak", phone: "(210) 865-2475", whatsapp: false,
    highlights: "Pro Line 4, Dual FMS-5000, TCAS-II Ch7, GTX-3000, ADS-B, Wi-Fi Gogo AVANCE L3, pintura/interior 2022, STC extensão TBO, Freon Air, Thrust Reversers",
    engines: "E1: 6.555 SNEW / E2: 6.523 SNEW", hoursAvail: "STC ext.",
    column: "pending", notes: "", tags: ["us", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listing/for-sale/249367923/2002-beechcraft-beechjet-400a-jet-aircraft",
    priceNote: "Verificado 20/02: ativo no Controller, sem preço publicado",
  },
  {
    id: 6, title: "#6 — 2001 Beechjet 400A",
    sn: "RK324", reg: "N224FD", hours: "8.824", price: "Call for price",
    location: "Petersburg, VA", seller: "Central Virginia Aviation Inc",
    contact: "Chip Harrup", phone: "+1 804-861-9915", whatsapp: true,
    highlights: "Melhor valor em 400A, para-brisa/pneus/bateria novos, WAAS/LPV, TCAS-II Ch7, Dual FMS-5000, EFD-871, GPS-4000, TAWS-8000, aceita trocas",
    engines: "E1: 2.634 SMOH (HS: 840) / E2: 2.634 SMOH — TBO: 3.500", hoursAvail: "~866",
    column: "pending", notes: "", tags: ["us", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/central-virginia-aviation-inc/aircraft/?DSCompanyID=7614",
    priceNote: "Verificado 20/02: ativo no Controller, sem preço publicado",
  },
  {
    id: 7, title: "#7 — 2000 Beechjet 400A",
    sn: "—", reg: "N8CA", hours: "4.550", price: "Call for price",
    location: "Fort Lauderdale, FL", seller: "Airtrade Aviation",
    contact: "Jay Faria", phone: "(954) 271-7100", whatsapp: false,
    highlights: "Part 135, Wi-Fi Avance L3, interior novo 12/2023, pintura 2022, Proline 4 EFIS, Dual FMC-5000, TCAS-II Ch7, IFA/CAMP, 7+1 pax",
    engines: "E1: 500 SOH / E2: 500 SOH — Cycles: 8.108", hoursAvail: "~3.100",
    column: "pending", notes: "", tags: ["us", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/beechcraft/beechjet-400a/jet-aircraft/3",
    priceNote: "Verificado 20/02: ativo no Controller, sem preço publicado",
  },
  {
    id: 8, title: "#8 — 1998 Beechjet 400A",
    sn: "RK-174", reg: "HK-4645", hours: "4.166", price: "Call for price",
    location: "Tampa, FL", seller: "IQ Worldwide Solutions",
    contact: "Victor Rosales", phone: "(305) 345-8029", whatsapp: false,
    highlights: "Garmin G5000NG NOVOS, pintura/interior 2023, 8 assentos, motor dir. 0 SOH, RNP 10, TAWS, Gross Weight Inc, LG overhaul",
    engines: "E1: 518 SOH / E2: 0 SOH (recém-revisado)", hoursAvail: "~3.082",
    column: "pending", notes: "", tags: ["latam", "garmin", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listing/for-sale/230845291/1999-beechcraft-beechjet-400a-jet-aircraft",
    priceNote: "Verificado 20/02: ativo no Controller, sem preço publicado",
  },
  {
    id: 9, title: "#9 — 1997 Beechjet 400A (25%)",
    sn: "—", reg: "—", hours: "6.865", price: "USD $750.000 (25%) ✅",
    location: "Wichita, KS", seller: "Express Car Wash",
    contact: "Chris Michael", phone: "(660) 460-1054", whatsapp: false,
    highlights: "FRAÇÃO 25% — Interior 2023, pintura nova, XPR Winglets, Garmin G5000 WAAS/LPV/SVT, 9 assentos center club",
    engines: "E1: 6.885 SNEW / E2: 6.885 SNEW", hoursAvail: "N/A (fração)",
    column: "pending", notes: "", tags: ["us", "fraction", "garmin", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/beechcraft/beechjet-400a/jet-aircraft/3",
    priceNote: "Verificado 20/02: USD $750,000 (25%) confirmado no Controller",
  },
  {
    id: 10, title: "#10 — 1992 Beechjet 400A",
    sn: "—", reg: "—", hours: "10.258", price: "Call for price",
    location: "Fort Lauderdale, FL", seller: "Airtrade Aviation",
    contact: "Jay Faria", phone: "(954) 271-7100", whatsapp: false,
    highlights: "Maior TT da lista, Pro Line 4 ADS-B/WAAS, TCAS-II, EGPWS Mark V, Wi-Fi GoGo ATG 4000, Freon Air, Thrust Reversers, interior 2016, CASP, C&D Check 08/2019",
    engines: "E1: 10.243 SNEW / E2: 10.142 SNEW", hoursAvail: "N/A",
    column: "pending", notes: "", tags: ["us", "verified"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/beechcraft/beechjet-400a/jet-aircraft/3",
    priceNote: "Verificado 20/02: ativo no Controller, sem preço publicado",
  },
  {
    id: 11, title: "#11 — 2000 Hawker 400A 🇧🇷",
    sn: "—", reg: "—", hours: "7.216", price: "USD $2.500.000 ✅",
    location: "Brasil", seller: "Compre Asa Alta / Thales Aviões",
    contact: "Patrick / Thales", phone: "+55 (19) 99596-3060 / +55 (43) 99991-1974", whatsapp: true,
    highlights: "2.001h disponíveis nos motores. Cotas disponíveis: 5x US$550k. Manutenção Premium Tec (Maringá) e Power Tech (BH). Próx. revisão CVA/Check B: 03/2026",
    engines: "JT15D-5 — 2.001,2h disponíveis", hoursAvail: "2.001",
    column: "pending", notes: "", tags: ["br", "verified"], source: "Aeronaves a Venda",
    sourceUrl: "https://www.compreaereo.com.br",
    priceNote: "Verificado 20/02: USD $2,500,000 (ou 5x $550k) confirmado",
  },
  {
    id: 12, title: "#12 — 1995 Hawker 400A 🇧🇷",
    sn: "—", reg: "—", hours: "5.500", price: "Sob consulta ✅",
    location: "Brasil", seller: "Aviation Store 101",
    contact: "Aviation Store 101", phone: "+55 (11) 91091-3001 / +1 (407) 603-7592", whatsapp: true,
    highlights: "Low time para 1995. 1.800h disp. (pós-HSI). Collins Pro Line 4, Dual FMS-5000, WXR-800, TDR-94D. Baixo custo horário remanescente. REF: AS5630",
    engines: "JT15D-5 — 1.800h disponíveis (pós-HSI)", hoursAvail: "1.800",
    column: "pending", notes: "", tags: ["br", "lowtime", "verified"], source: "Aviation Store 101",
    sourceUrl: "https://aviationstore101.com.br/aeronave/beechcraft-hawker-400a-ano-1995-5-500-h-t/",
    priceNote: "Verificado 20/02: página ativa, 'Preço sob consulta' confirmado no site. Ref: AS5630",
  },
  {
    id: 13, title: "#13 — 2006 Hawker 400A 🇧🇷",
    sn: "—", reg: "—", hours: "2.570", price: "Sob consulta",
    location: "Brasil", seller: "Skyboat Aviação",
    contact: "Skyboat", phone: "+55 (31) 99169-1840", whatsapp: true,
    highlights: "⚠️ 1.030h disp. — motores originais perto do 1º TBO (3.600h). Célula baixíssima. Boa alavancagem de negociação. Provisionar overhaul!",
    engines: "JT15D-5 — 1.030h disponíveis (1º TBO)", hoursAvail: "1.030",
    column: "pending", notes: "", tags: ["br", "lowtime"], source: "Skyboat Aviação",
    sourceUrl: "https://www.skyboataviacao.com.br",
    priceNote: "Verificado 20/02: anúncio via Skyboat, sem preço publicado",
  },
  {
    id: 14, title: "#14 — 1993 Hawker 400A 🇧🇷",
    sn: "—", reg: "—", hours: "5.770", price: "~USD $1.595.000 / R$ 7,5M ✅",
    location: "Brasil", seller: "Thales Aviões / SeaFly",
    contact: "Thales Aviões", phone: "+55 (43) 99991-1974", whatsapp: true,
    highlights: "1.630h disponíveis. ADS-B Out presente. ~R$ 7,5 Milhões confirmado",
    engines: "JT15D-5 — 1.630h disponíveis", hoursAvail: "1.630",
    column: "pending", notes: "", tags: ["br", "verified"], source: "FlightMarket",
    sourceUrl: "https://www.flightmarket.com.br",
    priceNote: "Verificado 20/02: ~USD $1,595,000 / R$ 7,5M confirmado",
  },
  {
    id: 15, title: "#15 — 1992 Hawker 400A 🇧🇷",
    sn: "—", reg: "—", hours: "5.000", price: "USD $1.620.000",
    location: "Brasil", seller: "Thales Aviões",
    contact: "Thales (WhatsApp)", phone: "+55 (43) 99991-1974", whatsapp: true,
    highlights: "⚠️ PÁGINA OFFLINE! 765h + 2.000h EXTENSÃO STC. Garmin GTN 750 + FMS 5000 = LPV. Extensão dilui risco financeiro. Verificar disponibilidade com Thales",
    engines: "JT15D-5 — 765h + 2.000h ext = ~2.765h efetivas", hoursAvail: "2.765 (ext)",
    column: "pending", notes: "ATENÇÃO: Página Thales ref=4243 retornou vazia em 20/02. Confirmar se aeronave ainda está disponível!", tags: ["br", "garmin", "notfound"], source: "Thales Aviões",
    sourceUrl: "https://thalesavioes.com.br/produto.php?ref=4243",
    priceNote: "Verificado 20/02: página thalesavioes.com.br/produto.php?ref=4243 VAZIA/QUEBRADA — pode ter sido vendida ou removida",
  },
  {
    id: 16, title: "#16 — 2002 Hawker 400A 🇧🇷",
    sn: "—", reg: "—", hours: "2.948", price: "Sob consulta",
    location: "Brasil", seller: "Falkan Aviação",
    contact: "Falkan Aviação", phone: "Via portal FlightMarket", whatsapp: false,
    highlights: "Programa de Motores (JSSI/TAP Blue). Apenas 2.948h SNEW. Blinda comprador de surpresas TBO",
    engines: "JT15D-5 — Programa de Motores", hoursAvail: "Prog. Motores",
    column: "pending", notes: "", tags: ["br", "program", "lowtime"], source: "FlightMarket",
    sourceUrl: "https://www.flightmarket.com.br",
    priceNote: "Verificado 20/02: sem preço publicado, contato via portal",
  },
  {
    id: 17, title: "#17 — 1999 Hawker 400A ❌",
    sn: "RK-134?", reg: "N563RJ?", hours: "6.800", price: "VENDIDA",
    location: "EUA / Argentina", seller: "Elliott Jets / Southern Cross",
    contact: "Elliott Jets", phone: "+1 (844) 937-5387", whatsapp: false,
    highlights: "❌ VENDIDA! Link AvBuyer #373041 marcado como 'Now Sold' (dez/2025). Era na verdade SN RK-134, 1997, Argentina, Southern Cross Aircraft — USD $1,525,000. Dados do relatório original podem estar incorretos.",
    engines: "JT15D-5 — N/A", hoursAvail: "N/A",
    column: "discarded", notes: "VENDIDA conforme AvBuyer em dez/2025. Link: avbuyer.com/aircraft/private-jets/hawker/beechjet-400a/373041", tags: ["us", "sold"], source: "AvBuyer",
    sourceUrl: "https://www.avbuyer.com/aircraft/private-jets/hawker/beechjet-400a/373041",
    priceNote: "Verificado 20/02: marcada como NOW SOLD no AvBuyer. Último preço: USD $1,525,000",
  },
  {
    id: 18, title: "#18 — 2008 Hawker 400XP",
    sn: "RK-567", reg: "N567XP", hours: "3.503", price: "Call for price",
    location: "Winston-Salem, NC", seller: "M4 Aviation Group",
    contact: "M4 Aviation", phone: "+1 (704) 564-9066", whatsapp: false,
    highlights: "Status impecável. 3.503h totais. TBO Extension STC. Pintura e interior novos 2023. Atualizado fev/2026 no Controller. SN RK-567 / N567XP confirmado",
    engines: "E1: 3.503 SNEW / E2: 3.503 SNEW — TBO Extension STC", hoursAvail: "STC ext.",
    column: "pending", notes: "", tags: ["us", "xp", "lowtime", "verified"], source: "Controller.com / GlobalAir",
    sourceUrl: "https://www.controller.com/listing/for-sale/239487945/hawker-400xp-jet-aircraft",
    priceNote: "Verificado 20/02: ativo no Controller (atualiz. 10/fev/2026) e GlobalAir. Call for price. SN RK-567 N567XP confirmado",
  },
  {
    id: 19, title: "#19 — 2006 Hawker 400XP ⚠️",
    sn: "—", reg: "—", hours: "6.027", price: "Não encontrado",
    location: "EUA", seller: "NEXT Aviation",
    contact: "NEXT Aviation", phone: "+1 (754) 262-0556", whatsapp: false,
    highlights: "⚠️ ANÚNCIO NÃO ENCONTRADO em busca de 20/02. Pode ter sido vendida ou retirada do mercado. Confirmar diretamente com NEXT Aviation",
    engines: "JT15D-5 — consultar", hoursAvail: "Consultar",
    column: "pending", notes: "Listing não encontrada nas buscas de 20/02/2026. Ligar para confirmar disponibilidade.", tags: ["us", "xp", "notfound"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/hawker/400xp/aircraft",
    priceNote: "Verificado 20/02: anúncio NÃO localizado nas buscas — pode ter sido removido",
  },
  {
    id: 20, title: "#20 — 2008 Hawker 400XP",
    sn: "—", reg: "—", hours: "8.970", price: "Call for price",
    location: "EUA", seller: "5x5 Trading",
    contact: "5x5 Trading", phone: "+1 (312) 208-4908", whatsapp: false,
    highlights: "⭐ Extensão TBO 5.600h! Célula 8.970h mas viável pela extensão monumental. 100% Turnkey. Fresh A-D Inspections. New Paint & Interior 2025. Aceita trocas",
    engines: "JT15D-5 — Extensão TBO 5.600h STC", hoursAvail: "5.600h ext",
    column: "pending", notes: "", tags: ["us", "xp", "verified"], source: "Controller.com / GlobalAir",
    sourceUrl: "https://www.controller.com/listings/for-sale/hawker/400xp/aircraft",
    priceNote: "Verificado 20/02: ativo no Controller e GlobalAir. Call for price. Fresh A-D + paint/interior 2025",
  },
  {
    id: 21, title: "#21 — 2007 Hawker 400XP ⚠️",
    sn: "—", reg: "—", hours: "9.336", price: "Não encontrado",
    location: "EUA", seller: "Fly Alliance",
    contact: "Fly Alliance", phone: "+1 (407) 747-0037", whatsapp: false,
    highlights: "⚠️ ANÚNCIO NÃO ENCONTRADO em busca de 20/02. Confirmar diretamente com Fly Alliance",
    engines: "JT15D-5 — consultar", hoursAvail: "Consultar",
    column: "pending", notes: "Listing não encontrada nas buscas de 20/02/2026.", tags: ["us", "xp", "notfound"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/hawker/400xp/aircraft",
    priceNote: "Verificado 20/02: anúncio NÃO localizado",
  },
  {
    id: 22, title: "#22 — 2006 Hawker 400XP ⚠️",
    sn: "—", reg: "—", hours: "3.100", price: "Não encontrado",
    location: "EUA", seller: "Avquest Jets",
    contact: "Avquest Jets", phone: "+1 (845) 213-3412", whatsapp: false,
    highlights: "⚠️ ANÚNCIO NÃO ENCONTRADO em busca de 20/02. Confirmar diretamente com Avquest Jets",
    engines: "JT15D-5 — consultar", hoursAvail: "Consultar",
    column: "pending", notes: "Listing não encontrada nas buscas de 20/02/2026.", tags: ["us", "xp", "lowtime", "notfound"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/hawker/400xp/aircraft",
    priceNote: "Verificado 20/02: anúncio NÃO localizado",
  },
  {
    id: 23, title: "#23 — 2005 Hawker 400XP 🇧🇷 ⚠️",
    sn: "—", reg: "—", hours: "4.715", price: "Não encontrado",
    location: "Brasil / EUA", seller: "MTX Aviation",
    contact: "MTX Aviation", phone: "+55 (11) 96393-2126", whatsapp: true,
    highlights: "⚠️ ANÚNCIO NÃO ENCONTRADO em busca de 20/02. Contato brasileiro. Confirmar diretamente com MTX Aviation",
    engines: "JT15D-5 — consultar", hoursAvail: "Consultar",
    column: "pending", notes: "Listing não encontrada nas buscas de 20/02/2026.", tags: ["br", "xp", "notfound"], source: "Controller.com",
    sourceUrl: "https://www.controller.com/listings/for-sale/hawker/400xp/aircraft",
    priceNote: "Verificado 20/02: anúncio NÃO localizado",
  },
  {
    id: 24, title: "#24 — 2010 Hawker 400XP ⭐",
    sn: "RK-0595", reg: "—", hours: "1.624", price: "Please call",
    location: "Brasil (base)", seller: "Jetcraft",
    contact: "Jetcraft", phone: "Via AvBuyer / portal", whatsapp: false,
    highlights: "⭐ ANO MAIS NOVO (2010) e MENOR TT (1.624h)! Fresco de Inspeções A e B. Boroscópio recente. Para-brisas novos. ADS-B Out. FDR. SN RK-0595. Baseado no Brasil! Atualizado 03/fev/2026 no AvBuyer",
    engines: "JT15D-5 — fresco A/B + boroscópio", hoursAvail: "Fresco A/B",
    column: "pending", notes: "", tags: ["xp", "lowtime", "verified", "br"], source: "AvBuyer / GlobalAir",
    sourceUrl: "https://www.avbuyer.com/aircraft/private-jets/hawker/400xp/373631",
    priceNote: "Verificado 20/02: ativo no AvBuyer (atualiz. 03/fev/2026). SN RK-0595. Please call. Baseado South America/Brazil",
  },
  {
    id: 25, title: "#25 — 1994 Hawker 400XPR",
    sn: "RK-96", reg: "N400XP", hours: "7.379", price: "Please call",
    location: "Easton, MD / New York", seller: "Omni Intl Jet Trading",
    contact: "Omnijet", phone: "+1 (410) 820-7300", whatsapp: false,
    highlights: "⭐ REMOTORIZADO Williams FJ44-4A-32! Motores com apenas 293/270h TT! Winglets. GWI. WAAS/LPV. Part 135. Integra Jet opera. Interior 2020. Sem damage history. For Sale or Lease. SN RK-96 / N400XP",
    engines: "Williams FJ44-4A-32 — E1: 293h / E2: 270h TT (!)", hoursAvail: "FJ44 novo",
    column: "pending", notes: "", tags: ["xpr", "verified"], source: "GlobalAir / Controller",
    sourceUrl: "https://www.globalair.com/aircraft-for-sale/listingdetail/hawker-400xpr?adid=133517",
    priceNote: "Verificado 20/02: ativo na GlobalAir (atualiz. 23/jan/2026) e Controller. SN RK-96, N400XP. Please call. Também disponível para lease",
  },
  {
    id: 26, title: "#26 — 2007 Hawker 400XP ⚠️",
    sn: "—", reg: "—", hours: "4.573", price: "Não encontrado",
    location: "Internacional", seller: "Aeromanagement Group",
    contact: "Aeromanagement", phone: "Via portal GlobalAir", whatsapp: false,
    highlights: "⚠️ ANÚNCIO NÃO ENCONTRADO em busca de 20/02. TBO Extension STC. 4.573h totais. Confirmar com Aeromanagement",
    engines: "JT15D-5 — TBO Extension STC", hoursAvail: "STC ext.",
    column: "pending", notes: "Listing não encontrada nas buscas de 20/02/2026.", tags: ["xp", "notfound"], source: "GlobalAir",
    sourceUrl: "https://www.globalair.com/aircraft-for-sale/private-jet/hawker-aircraft",
    priceNote: "Verificado 20/02: anúncio NÃO localizado na GlobalAir",
  },
  {
    id: 27, title: "#27 — 2008 Hawker 400XP 🇧🇷",
    sn: "—", reg: "—", hours: "1.700", price: "Sob consulta",
    location: "Brasil", seller: "AIRCONSULT",
    contact: "AIRCONSULT", phone: "Via portal FlightMarket", whatsapp: false,
    highlights: "⭐ ZERO horas após HSI! Apenas 1.700h TT. Posição mecânica excepcional. Listing encontrada no FlightMarket e Aeromercado",
    engines: "JT15D-5 — 0h após HSI", hoursAvail: "~1.800 (pós-HSI)",
    column: "pending", notes: "", tags: ["br", "xp", "lowtime", "verified"], source: "FlightMarket",
    sourceUrl: "https://www.flightmarket.com.br/aeronave/7305",
    priceNote: "Verificado 20/02: ativo no FlightMarket (ID 7305) e Aeromercado. Sem preço publicado",
  },
];

/* ───────── Sub-components ───────── */

function TagBadge({ tagId }: { tagId: string }) {
  const tag = TAGS[tagId];
  if (!tag) return null;
  return (
    <span
      style={{
        background: tag.bg, color: tag.color, fontSize: 9, fontWeight: 700,
        padding: "1px 5px", borderRadius: 3, letterSpacing: 0.2, whiteSpace: "nowrap",
        border: `1px solid ${tag.color}30`,
      }}
    >
      {tag.label}
    </span>
  );
}

function KanbanCard({
  aircraft,
  onMove,
  onUpdateNotes,
  onExpand,
  isExpanded,
}: {
  aircraft: Aircraft;
  onMove: (id: number, col: string) => void;
  onUpdateNotes: (id: number, notes: string) => void;
  onExpand: (id: number) => void;
  isExpanded: boolean;
}) {
  const priceColor = aircraft.price.includes("$") ? "#059669"
    : aircraft.price === "VENDIDA" ? "#DC2626"
    : aircraft.price.includes("Não encontrado") ? "#D97706"
    : "#9CA3AF";

  const borderColor = aircraft.price === "VENDIDA" ? "#DC2626"
    : aircraft.whatsapp ? "#25D366"
    : aircraft.tags.includes("notfound") ? "#D97706"
    : "transparent";

  const wa = waLink(aircraft.phone);
  const phone = cleanPhone(aircraft.phone);

  return (
    <div
      style={{
        background: aircraft.price === "VENDIDA" ? "#FEF2F2" : "#fff",
        borderRadius: 10, padding: "14px 16px", marginBottom: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        cursor: "pointer", transition: "box-shadow 0.2s, transform 0.15s", position: "relative",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        borderLeft: `3px solid ${borderColor}`,
        opacity: aircraft.price === "VENDIDA" ? 0.7 : 1,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
      onClick={() => onExpand(aircraft.id)}
    >
      {/* Tags */}
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 6 }}>
        {aircraft.tags.map((t) => <TagBadge key={t} tagId={t} />)}
        {aircraft.whatsapp && (
          <span style={{ background: "#25D366", color: "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 3 }}>
            WhatsApp
          </span>
        )}
      </div>

      {/* Title */}
      <div style={{ fontWeight: 700, fontSize: 13, color: "#1E293B", lineHeight: 1.3, marginBottom: 6 }}>
        {aircraft.title}
      </div>

      {/* Key info */}
      <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#64748B", marginBottom: 4, flexWrap: "wrap" }}>
        <span>✈ {aircraft.hours}h TT</span>
        <span>⏱ {aircraft.hoursAvail}h disp.</span>
      </div>
      <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6 }}>📍 {aircraft.location}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: priceColor, marginBottom: 4 }}>{aircraft.price}</div>

      {/* Price verification note */}
      {aircraft.priceNote && (
        <div style={{ fontSize: 9, color: "#6B7280", marginBottom: 4, fontStyle: "italic", background: "#F9FAFB", padding: "2px 6px", borderRadius: 3 }}>
          {aircraft.priceNote}
        </div>
      )}

      {/* Source link */}
      {aircraft.sourceUrl ? (
        <a
          href={aircraft.sourceUrl} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 9, color: "#3B82F6", fontStyle: "italic", textDecoration: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          🔗 {aircraft.source}
        </a>
      ) : (
        <div style={{ fontSize: 9, color: "#94A3B8", fontStyle: "italic" }}>Fonte: {aircraft.source}</div>
      )}

      {/* Expanded details */}
      {isExpanded && (
        <div
          style={{ borderTop: "1px solid #E2E8F0", paddingTop: 10, marginTop: 8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.7, marginBottom: 8 }}>
            <div><strong>S/N: </strong>{aircraft.sn} | <strong>Reg: </strong>{aircraft.reg}</div>
            <div><strong>Motores: </strong>{aircraft.engines}</div>
            <div><strong>Vendedor: </strong>{aircraft.seller}</div>
            <div><strong>Contato: </strong>{aircraft.contact}</div>
            <div>
              <strong>Tel: </strong>
              {phone ? (
                <a
                  href={`tel:${phone}`}
                  style={{ color: "#3B82F6", textDecoration: "none", fontWeight: 500 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {aircraft.phone}
                </a>
              ) : (
                aircraft.phone
              )}
            </div>

            {/* WhatsApp link */}
            {aircraft.whatsapp && wa && (
              <div>
                <a
                  href={wa} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: "#25D366", color: "#fff", padding: "3px 10px",
                    borderRadius: 5, fontSize: 10, fontWeight: 700,
                    textDecoration: "none", marginTop: 4,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  💬 WhatsApp
                </a>
              </div>
            )}

            {/* Source URL */}
            {aircraft.sourceUrl && (
              <div style={{ marginTop: 6 }}>
                <a
                  href={aircraft.sourceUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: "#EFF6FF", color: "#2563EB", padding: "3px 10px",
                    borderRadius: 5, fontSize: 10, fontWeight: 600,
                    textDecoration: "none", border: "1px solid #BFDBFE",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  🔗 Ver anúncio — {aircraft.source}
                </a>
              </div>
            )}
          </div>

          {/* Highlights */}
          <div style={{ background: "#F8FAFC", borderRadius: 6, padding: "8px 10px", fontSize: 11, color: "#334155", lineHeight: 1.5, marginBottom: 10 }}>
            {aircraft.highlights}
          </div>

          {/* Notes */}
          <textarea
            value={aircraft.notes}
            onChange={(e) => onUpdateNotes(aircraft.id, e.target.value)}
            placeholder="Anotações pessoais…"
            style={{
              width: "100%", minHeight: 50, border: "1px solid #E2E8F0", borderRadius: 6,
              padding: "8px 10px", fontSize: 11, fontFamily: "inherit", resize: "vertical",
              outline: "none", color: "#334155", background: "#FFFBEB", boxSizing: "border-box",
            }}
          />

          {/* Move buttons */}
          <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
            {COLUMNS.map((col) => {
              if (col.id === aircraft.column) return null;
              return (
                <button
                  key={col.id}
                  onClick={() => onMove(aircraft.id, col.id)}
                  style={{
                    background: col.bg, color: col.color, border: `1px solid ${col.color}30`,
                    borderRadius: 5, padding: "4px 8px", fontSize: 10, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  → {col.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── Main Component ───────── */

export default function AircraftKanban() {
  const [aircraft, setAircraft] = useState<Aircraft[]>(initialAircraft);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  function moveCard(id: number, toColumn: string) {
    setAircraft((prev) => prev.map((a) => a.id === id ? { ...a, column: toColumn } : a));
  }

  function updateNotes(id: number, notes: string) {
    setAircraft((prev) => prev.map((a) => a.id === id ? { ...a, notes } : a));
  }

  function toggleExpand(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  const filtered = aircraft.filter((a) => {
    const textMatch = !filter ||
      a.title.toLowerCase().includes(filter.toLowerCase()) ||
      a.location.toLowerCase().includes(filter.toLowerCase()) ||
      a.seller.toLowerCase().includes(filter.toLowerCase()) ||
      a.source.toLowerCase().includes(filter.toLowerCase()) ||
      (a.priceNote && a.priceNote.toLowerCase().includes(filter.toLowerCase()));
    const tagMatch = !tagFilter || a.tags.includes(tagFilter);
    return textMatch && tagMatch;
  });

  const totalByCol: Record<string, number> = {};
  COLUMNS.forEach((col) => {
    totalByCol[col.id] = filtered.filter((a) => a.column === col.id).length;
  });

  const brCount = aircraft.filter((a) => a.tags.includes("br")).length;
  const xpCount = aircraft.filter((a) => a.tags.includes("xp") || a.tags.includes("xpr")).length;
  const waCount = aircraft.filter((a) => a.whatsapp).length;
  const verifiedCount = aircraft.filter((a) => a.tags.includes("verified")).length;
  const alertCount = aircraft.filter((a) => a.tags.includes("notfound") || a.tags.includes("sold")).length;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      {/* Google Font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "rgba(15,23,42,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#F8FAFC", letterSpacing: -0.5 }}>
              ✈ Hawker / Beechjet 400A — Pipeline Completo
            </h1>
            <p style={{ margin: "3px 0 0", fontSize: 11, color: "#94A3B8" }}>
              {aircraft.length} aeronaves • {brCount} Brasil • {xpCount} XP/XPR • {waCount} WhatsApp • {verifiedCount} verificadas • {alertCount} alertas
            </p>
          </div>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar por nome, local, vendedor, fonte…"
            style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8, padding: "7px 12px", color: "#F8FAFC", fontSize: 12,
              width: 260, outline: "none", fontFamily: "inherit",
            }}
          />
        </div>

        {/* Tag filters */}
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => setTagFilter(null)}
            style={{
              background: !tagFilter ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
              color: "#E2E8F0", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Todos ({aircraft.length})
          </button>
          {Object.entries(TAGS).map(([key, tag]) => {
            const count = aircraft.filter((a) => a.tags.includes(key)).length;
            if (count === 0) return null;
            return (
              <button
                key={key}
                onClick={() => setTagFilter(tagFilter === key ? null : key)}
                style={{
                  background: tagFilter === key ? tag.bg : "rgba(255,255,255,0.05)",
                  color: tagFilter === key ? tag.color : "#94A3B8",
                  border: `1px solid ${tagFilter === key ? tag.color + "50" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {tag.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Kanban columns */}
      <div style={{
        display: "flex", gap: 14, padding: "16px 16px 40px",
        overflowX: "auto", minHeight: "calc(100vh - 140px)", alignItems: "flex-start",
      }}>
        {COLUMNS.map((col) => {
          const cards = filtered.filter((a) => a.column === col.id);
          return (
            <div
              key={col.id}
              style={{
                minWidth: 290, maxWidth: 310, flex: "0 0 290px",
                background: "rgba(255,255,255,0.04)", borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column",
              }}
            >
              {/* Column header */}
              <div style={{
                padding: "12px 14px 8px", display: "flex", alignItems: "center", gap: 8,
                borderBottom: `2px solid ${col.color}40`,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: col.color, boxShadow: `0 0 8px ${col.color}60` }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#E2E8F0" }}>{col.label}</span>
                <span style={{ marginLeft: "auto", background: `${col.color}25`, color: col.color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>
                  {totalByCol[col.id]}
                </span>
              </div>

              {/* Column body */}
              <div style={{ padding: "10px 10px 14px", flex: 1, minHeight: 80, maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}>
                {cards.length === 0 && (
                  <div style={{ textAlign: "center", color: "#475569", fontSize: 11, padding: "20px 10px", fontStyle: "italic" }}>
                    Nenhuma aeronave
                  </div>
                )}
                {cards.map((a) => (
                  <KanbanCard
                    key={a.id}
                    aircraft={a}
                    onMove={moveCard}
                    onUpdateNotes={updateNotes}
                    onExpand={toggleExpand}
                    isExpanded={expandedId === a.id}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
