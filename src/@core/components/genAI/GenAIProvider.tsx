import { createContext, useContext, useState } from "react";

interface BusinessData {
  business_id: string;
  data: InformasiBisnis;
  success: boolean;
  failed: null | string | boolean;
  created_at: number;
  overview: Overview;
  market_opportunity: MarketOpportunity;
  gtm: GoToMarket;
  funding_community: FundingCommunity;
}

interface FundingCommunity {
  funding: string;
  how_to_get_fund: string;
  community: string;
}

interface InformasiBisnis {
  informasi_bisnis_dasar: InformasiBisnisDasar;
  informasi_pasar_dan_penjualan: InformasiPasarDanPenjualan;
  informasi_keuangan: InformasiKeuangan;
  informasi_keluhan_atau_hambatan: InformasiKeluhanAtauHambatan;
}

interface InformasiBisnisDasar {
  nama_usaha: string;
  lokasi_usaha: string;
  jenis_produk: string;
  skala_usaha: string;
  standar_kualitas_produk: string;
}

interface InformasiPasarDanPenjualan {
  target_pasar: string;
  profil_pelanggan: string;
  jangkauan_pemasaran: string;
  saluran_penjualan_saat_ini: string;
  volume_penjualan_bulanan: string;
}

interface InformasiKeuangan {
  pendapatan_tahunan: string;
  sumber_modal: string;
}

interface InformasiKeluhanAtauHambatan {
  hambatan_utama_yang_dihadapi: string;
}

interface Overview {
  session_id: string;
  module: string;
  summary: string;
  suggestion: string;
}

interface MarketOpportunity {
  session_id: string;
  module: string;
  strength_potential_chart: StrengthPotentialChart;
  insight_strength_potential: string;
  market_size_estimation_local: MarketSizeEstimationLocal;
  market_size_estimation_local_insight: string;
  market_size_estimation_international: MarketSizeEstimationInternational;
  market_size_estimation_international_insight: string;
}

interface StrengthPotentialChart {
  kapasitas_produksi: string;
  ukuran_bisnis: string;
  standar_kualitas: string;
  jaringan_logistik: string;
  nilai_budaya: string;
  nilai_futuristik: string;
}

interface MarketSizeEstimationLocal {
  "Kecamatan Sumur Bandung": string;
  "Kecamatan Cibeunying Kidul": string;
  "Kecamatan Astana Anyar": string;
  "Kota Bandung": string;
}

interface MarketSizeEstimationInternational {
  Jepang: string;
  "Arab Saudi": string;
  Australia: string;
  Kanada: string;
}

interface GoToMarket {
  session_id: string;
  module: string;
  strategy_panel: StrategyPanel;
  pricing_model_panel: PricingModelPanel;
  milestone: Milestone;
  market_size_timeline: MarketSizeTimeline;
}

interface StrategyPanel {
  diferensiasi_produk: string;
  strategi_penetapan_harga: string;
  saluran_distribusi: string;
  marketing_channel: string;
}

interface PricingModelPanel {
  jenis_pricing_model: string;
  contoh_harga: string;
}

interface Milestone {
  [key: string]: [string, string];
}

interface MarketSizeTimeline {
  [key: string]: string;
}

const GenAIContext = createContext({
  genAIData: null as BusinessData | null,
  setGenAIData: (data: BusinessData) => {},
});

export default function GenAIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [genAIData, setGenAIData] = useState<BusinessData | null>(null);

  const setData = (data: BusinessData) => {
    console.log("data on Gen AI Updated", data);
    setGenAIData(data);
  };

  return (
    <GenAIContext.Provider
      value={{
        genAIData,
        setGenAIData: setData,
      }}
    >
      {children}
    </GenAIContext.Provider>
  );
}

export const useGenAI = () => useContext(GenAIContext);
