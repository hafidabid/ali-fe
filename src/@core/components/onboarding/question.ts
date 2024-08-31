import { ReactNode } from "react";

export enum QuestionType {
  Text = "text",
  TextArea = "textarea",
  Number = "number",
  Range = "range",
  Select = "select",
  MultiSelect = "multi-select",
  SelectWithCustomValue = "select-with-custom-value",
  Location = "location",
}

interface SelectionI {
  label: string;
  value: string;
  icon?: string | ReactNode;
}

interface QuestionI {
  question: string;
  renderedQuestion?: string;
  type: QuestionType;
  selections?: SelectionI[];
  required?: boolean;
  validationRules?: (x: any) => boolean;
  hint?: string | React.ReactNode;
}

interface SectionI {
  title: string;
  questions: QuestionI[];
  details?: string;
}

export const Questions: SectionI[] = [
  {
    title: "Informasi Bisnis Dasar",
    details: "Pengumpulan data terkait informasi dasar bisnis kamu",
    questions: [
      {
        question: "Nama Usaha",
        renderedQuestion: "Haii, apa nama bisnis/usahamu sekarang?",
        type: QuestionType.Text,
        required: true,
        hint: "",
        validationRules: (x) => x.length > 0,
      },
      {
        question: "Lokasi Usaha",
        renderedQuestion: "Dimana lokasi usaha kamu?",
        type: QuestionType.Location,
        required: true,
        hint: "",
        validationRules: (x) => true,
      },
      {
        question: "Jenis Produk",
        renderedQuestion: "Apa jenis produk yang kamu tawarkan?",
        type: QuestionType.SelectWithCustomValue,
        selections: [
          {
            label: "Anyaman Rotan untuk Mebel dan Furnitur (Kursi, Meja, Rak)",
            value: "anyaman-rotan",
          },
          {
            label: "Seni Pahat Kayu (Patung, Hiasan Dinding)",
            value: "seni-pahat-kayu",
          },
          {
            label: "Kerajinan Tangan Lainnya",
            value: "kerajinan-tangan-lainnya",
          },
          {
            label: "Produk Tekstil",
            value: "produk-tekstil",
          },
          {
            label: "Produk Kuliner",
            value: "produk-kuliner",
          },
        ],
        required: true,
        hint: "",
        validationRules: (x) => x.length > 0,
      },
      {
        question: "Skala Usaha",
        renderedQuestion:
          "Berapa jumlah karyawan / pekerja yang ada di usaha kamu saat ini?",
        type: QuestionType.Select,
        hint: "",
        required: true,
        selections: [
          {
            label: "Usaha Mikro (1-5 karyawan)",
            value: "mikro",
          },
          {
            label: "Usaha Kecil (6-19 karyawan)",
            value: "kecil",
          },
          {
            label: "Usaha Menengah (20-99 karyawan)",
            value: "menengah",
          },
          {
            label: "Usaha Besar (100+ karyawan)",
            value: "besar",
          },
        ],
      },
      {
        question: "Standar Kualitas Produk",
        renderedQuestion: "Bagaimana standar kualitas produk kamu?",
        type: QuestionType.Select,
        hint: "",
        required: true,
        selections: [
          {
            label: "Rendah (belum ada tim pengontrol kualitas)",
            value: "rendah",
          },
          {
            label: "Menengah (ada beberapa kontrol kualitas)",
            value: "menengah",
          },
          {
            label:
              "Tinggi (dilengkapi dengan tim pengontrol kualitas yang lengkap)",
            value: "tinggi",
          },
        ],
      },
    ],
  },
  {
    title: "Informasi Pasar dan Penjualan",
    details: "",
    questions: [
      {
        question: "Target Pasar",
        renderedQuestion: "Siapakah target pasar kamu?",
        type: QuestionType.Select,
        hint: "",
        required: true,
        selections: [
          {
            label: "Lokal",
            value: "lokal",
          },
          {
            label: "Regional",
            value: "regional",
          },
          {
            label: "Nasional",
            value: "nasional",
          },
          {
            label: "Internasional",
            value: "internasional",
          },
        ],
      },
      {
        question: "Profil Pelanggan",
        renderedQuestion: "Bagaimana profil pelanggan kamu?",
        type: QuestionType.TextArea,
        hint: "",
        required: false,
        validationRules: (x) => x.length > 10,
      },
      {
        question: "Jangkauan Pemasaran",
        renderedQuestion: "Jangkauan pemasaran?",
        type: QuestionType.Text,
        hint: "",
        required: false,
        validationRules: (x) => x.length > 10,
      },
      {
        question: "Saluran Penjualan Saat Ini",
        renderedQuestion:
          "Bagaimana anda mempromosikan penjualan anda saat ini?",
        type: QuestionType.MultiSelect,
        hint: "",
        required: true,
        selections: [
          {
            label: "Penjualan Langsung (Pasar Lokal)",
            value: "penjualan-langsung",
          },
          {
            label: "Toko Fisik",
            value: "toko-fisik",
          },
          {
            label: "E-commerce",
            value: "e-commerce",
          },
          {
            label: "Pemasaran Digital (Media Sosial)",
            value: "pemasaran-digital",
          },
          {
            label: "Pameran atau Bazar",
            value: "pameran-bazar",
          },
          {
            label: "Distributor atau Agen",
            value: "distributor-agen",
          },
        ],
      },
      {
        question: "Volume Penjualan Bulanan",
        renderedQuestion:
          "Berapa rata-rata omset anda per bulan (dalam rupiah)?",
        type: QuestionType.Range,
        hint: "",
        required: true,
        validationRules: (x) => x > 50000,
      },
    ],
  },
  {
    title: "Informasi Keuangan",
    details: "",
    questions: [
      {
        question: "Pendapatan Tahunan",
        renderedQuestion: "Total pendapatan dalam setahun terakhir?",
        type: QuestionType.Range,
        hint: "",
        required: true,
        validationRules: (x) => x > 0,
      },
      {
        question: "Sumber Modal",
        renderedQuestion: "Apa saja sumber modal usaha kamu?",
        type: QuestionType.MultiSelect,
        hint: "",
        required: true,
        selections: [
          {
            label: "Pinjaman dari Keluarga",
            value: "pinjaman-keluarga",
          },
          {
            label: "Tabungan Pribadi",
            value: "tabungan-pribadi",
          },
          {
            label: "Pinjaman Bank",
            value: "pinjaman-bank",
          },
          {
            label: "Investor",
            value: "investor",
          },
          {
            label: "Modal Ventura",
            value: "modal-ventura",
          },
          {
            label: "Sumber lainnya",
            value: "sumber lainnya",
          },
        ],
      },
    ],
  },
  {
    title: "Informasi Keluhan atau Hambatan",
    details: "",
    questions: [
      {
        question: "Hambatan Utama yang Dihadapi",
        renderedQuestion: "Apa hambatan utama yang dihadapi usaha kamu?",
        type: QuestionType.TextArea,
        hint: "",
        required: true,
        validationRules: (x) => x.length > 10,
      },
    ],
  },
];
