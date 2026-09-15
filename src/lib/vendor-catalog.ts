export interface VendorCatalogEntry {
  companyDescription: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  productUrl: string;
}

export const vendorCatalog: Record<string, VendorCatalogEntry> = {
  "Epicor Kinetic": {
    companyDescription:
      "Kinetic dikembangkan oleh Epicor, perusahaan software bisnis global yang berfokus pada industri make, move, dan sell, khususnya manufaktur serta distribusi.",
    features: ["Financial management", "Production planning", "Supply chain", "CRM dan project"],
    imageUrl:
      "https://cf-images.us-east-1.prod.boltdns.net/v1/static/5502556969001/7c827276-fc38-45b6-8607-035e7c0a4f76/1548e371-29cc-4bd7-af28-4be3a61de0be/1280x720/match/image.jpg",
    imageAlt: "Dashboard ERP Epicor Kinetic",
    productUrl:
      "https://www.epicor.com/en/products/enterprise-resource-planning-erp/epicor-kinetic/",
  },
  "SAP Business One": {
    companyDescription:
      "Business One dikembangkan oleh SAP, perusahaan software enterprise asal Jerman dengan ekosistem partner dan implementor di berbagai negara.",
    features: ["Accounting dan financials", "Purchasing", "Inventory", "Sales dan CRM"],
    imageUrl:
      "https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/7b5bc8fa-ee0d-4564-8cd2-f9bc0cbd2f0c.png?auto=format&q=70",
    imageAlt: "Dashboard SAP Business One",
    productUrl: "https://www.sap.com/products/business-one.html",
  },
  "Microsoft Dynamics 365 Business Central": {
    companyDescription:
      "Business Central merupakan produk ERP dari Microsoft dan menjadi bagian dari keluarga Dynamics 365, dengan integrasi erat ke Microsoft 365, Azure, dan Power Platform.",
    features: ["Finance", "Sales dan service", "Supply chain", "Project dan manufacturing"],
    imageUrl: "/images/vendors/microsoft-dynamics-365-business-central.avif",
    imageAlt: "Dashboard Microsoft Dynamics 365 Business Central",
    productUrl: "https://www.microsoft.com/en/dynamics-365/products/business-central",
  },
  "Oracle NetSuite": {
    companyDescription:
      "NetSuite adalah platform manajemen bisnis berbasis cloud milik Oracle. Produk ini melayani organisasi bertumbuh hingga perusahaan multi-entitas.",
    features: [
      "Financial management",
      "Order management",
      "Procurement",
      "Multi-entity consolidation",
    ],
    imageUrl:
      "https://cdn.techimply.com/uploads/buyersguide/description-image/1845941341722087.jpg",
    imageAlt: "Dashboard keuangan Oracle NetSuite",
    productUrl: "https://www.netsuite.com/portal/products/erp.shtml",
  },
  Odoo: {
    companyDescription:
      "Odoo dikembangkan oleh Odoo S.A., perusahaan software asal Belgia yang membangun rangkaian aplikasi bisnis dengan model open-source dan enterprise.",
    features: ["Accounting", "CRM dan sales", "Inventory", "Manufacturing dan HR"],
    imageUrl: "/images/vendors/odoo-apps.jpg",
    imageAlt: "Tampilan rangkaian aplikasi bisnis Odoo",
    productUrl: "https://www.odoo.com/page/all-apps",
  },
  Acumatica: {
    companyDescription:
      "Acumatica adalah perusahaan cloud ERP yang menyediakan edisi khusus industri dan menjalankan implementasinya melalui jaringan partner.",
    features: ["Financial management", "Distribution", "Manufacturing", "Construction management"],
    imageUrl: "/images/vendors/acumatica-cloud-erp.png",
    imageAlt: "Visual produk Acumatica Cloud ERP",
    productUrl: "https://www.acumatica.com/cloud-erp-software/",
  },
  ERPNext: {
    companyDescription:
      "ERPNext dikembangkan oleh Frappe Technologies. Produk dan framework Frappe tersedia sebagai open-source sehingga organisasi dapat mengelola hosting serta penyesuaiannya sendiri.",
    features: ["Accounting", "Buying dan selling", "Stock", "Manufacturing dan project"],
    imageUrl: "/images/vendors/erpnext-documentation.png",
    imageAlt: "Dashboard akun pada ERPNext",
    productUrl: "https://erpnext.com/",
  },
  HashMicro: {
    companyDescription:
      "HashMicro adalah penyedia software enterprise dengan operasi di Asia Tenggara dan portofolio modul ERP untuk berbagai fungsi serta industri.",
    features: ["Finance", "Procurement", "Inventory dan supply chain", "CRM dan HR"],
    imageUrl: "/images/vendors/hashmicro-erp.webp",
    imageAlt: "Visual suite ERP HashMicro",
    productUrl: "https://www.hashmicro.com/id/produk-erp",
  },
  "Accurate Online": {
    companyDescription:
      "Accurate Online dikembangkan oleh CPSSoft atau PT Cipta Piranti Sejahtera, perusahaan software Indonesia yang membangun produk akuntansi dan operasi bisnis.",
    features: ["Penjualan dan pembelian", "Kas dan bank", "Persediaan", "Laporan dan perpajakan"],
    imageUrl:
      "https://help.accurate.id/assets/images/1-1775815017795-18-21718cf74246064a98a5bd312bcdd552.webp",
    imageAlt: "Dashboard Accurate Online",
    productUrl: "https://accurate.id/online/",
  },
  "Oracle Fusion Cloud ERP": {
    companyDescription:
      "Fusion Cloud ERP dikembangkan oleh Oracle, perusahaan teknologi enterprise global yang menyediakan database, cloud infrastructure, dan aplikasi bisnis.",
    features: [
      "Financials",
      "Procurement",
      "Project management",
      "Risk dan performance management",
    ],
    imageUrl: "/images/vendors/oracle-fusion-cloud-erp.jpg",
    imageAlt: "Visual Oracle Fusion Cloud ERP",
    productUrl: "https://www.oracle.com/erp/",
  },
  "Jubelio Accounting": {
    companyDescription:
      "Jubelio adalah perusahaan teknologi Indonesia yang membangun platform operasi omnichannel untuk membantu brand dan retailer menghubungkan penjualan, stok, fulfillment, dan keuangan.",
    features: ["Akuntansi", "Sinkronisasi marketplace", "Inventory", "Retur dan pelaporan"],
    imageUrl: "/images/vendors/jubelio-accounting.png",
    imageAlt: "Tampilan produk Jubelio Accounting",
    productUrl: "https://jubelio.com/aplikasi-akuntansi/",
  },
  "Mekari Jurnal": {
    companyDescription:
      "Jurnal dikembangkan oleh Mekari, perusahaan software-as-a-service Indonesia yang juga menaungi solusi HR, pajak, tanda tangan digital, dan otomasi bisnis.",
    features: ["Pembukuan dan laporan", "Invoice", "Kas dan rekonsiliasi bank", "Persediaan"],
    imageUrl: "/images/vendors/mekari-jurnal.webp",
    imageAlt: "Tampilan software akuntansi Mekari Jurnal",
    productUrl: "https://www.jurnal.id/id/fitur/aplikasi-akuntansi/",
  },
  Kledo: {
    companyDescription:
      "Kledo adalah penyedia software akuntansi cloud Indonesia yang berfokus pada digitalisasi pembukuan untuk usaha kecil dan bisnis bertumbuh.",
    features: ["Invoice", "Purchasing", "Hutang dan piutang", "Rekonsiliasi dan laporan"],
    imageUrl: "/images/vendors/kledo.png",
    imageAlt: "Dashboard software akuntansi Kledo",
    productUrl: "https://kledo.com/lp/",
  },
  "HashMicro Accounting": {
    companyDescription:
      "Modul Accounting merupakan bagian dari suite ERP HashMicro, penyedia software enterprise dengan operasi di Asia Tenggara dan dukungan implementasi di Indonesia.",
    features: ["General ledger", "Budgeting", "Cost center", "Financial analytics"],
    imageUrl: "/images/vendors/hashmicro-accounting.webp",
    imageAlt: "Visual produk HashMicro Accounting",
    productUrl: "https://www.hashmicro.com/id/sistem-akuntansi",
  },
  "Zahir Online": {
    companyDescription:
      "Zahir Online dikembangkan oleh PT Zahir Internasional, perusahaan software Indonesia yang telah lama berfokus pada akuntansi dan manajemen bisnis.",
    features: ["Kas dan bank", "Invoice", "Inventory", "Dashboard dan laporan"],
    imageUrl: "/images/vendors/zahir-online.png",
    imageAlt: "Tampilan aplikasi Zahir Online",
    productUrl: "https://zahirsoft.com/software-akuntansi-online/",
  },
  Beecloud: {
    companyDescription:
      "Beecloud merupakan bagian dari ekosistem software Bee untuk akuntansi, kasir, stok, dan pengelolaan operasi bisnis Indonesia.",
    features: ["Penjualan dan pembelian", "Stok", "Produksi", "Multi-cabang"],
    imageUrl: "/images/vendors/beecloud.jpg",
    imageAlt: "Tampilan software akuntansi Beecloud",
    productUrl: "https://www.bee.id/software-akuntansi-online/",
  },
  "Paper.id": {
    companyDescription:
      "Paper.id adalah perusahaan teknologi finansial B2B Indonesia yang berfokus pada digitalisasi invoice, penagihan, dan pembayaran bisnis.",
    features: ["Invoice digital", "Payment link", "Pembayaran supplier", "Pemantauan transaksi"],
    imageUrl: "/images/vendors/paper-id.webp",
    imageAlt: "Visual platform invoice dan pembayaran Paper.id",
    productUrl: "https://www.paper.id/",
  },
  Xero: {
    companyDescription:
      "Xero dikembangkan oleh Xero Limited, perusahaan teknologi asal Selandia Baru yang menyediakan platform akuntansi cloud untuk usaha kecil dan advisor di berbagai negara.",
    features: ["Invoicing", "Bank reconciliation", "Expenses", "Project dan reporting"],
    imageUrl: "/images/vendors/xero-indonesia.jpg",
    imageAlt: "Visual software akuntansi cloud Xero",
    productUrl: "https://www.xero.com/id/accounting-software/",
  },
  "Zoho Books": {
    companyDescription:
      "Zoho Books dikembangkan oleh Zoho Corporation, perusahaan software global yang menyediakan rangkaian aplikasi untuk finance, CRM, workplace, service, dan operasi bisnis.",
    features: [
      "Receivables dan payables",
      "Banking",
      "Workflow approval",
      "Project dan portal pelanggan",
    ],
    imageUrl: "https://www.zoho.com/books/images/home/dash-board/kes-db.webp",
    imageAlt: "Dashboard keuangan Zoho Books",
    productUrl: "https://www.zoho.com/books/",
  },
  Darwinbox: {
    companyDescription:
      "Darwinbox adalah perusahaan teknologi HCM yang membangun platform cloud untuk perusahaan menengah, enterprise, dan organisasi global.",
    features: ["Core HR", "Workforce dan payroll", "Talent management", "People analytics"],
    imageUrl:
      "https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/9c4a61bd-2093-4d4d-98fe-8a2fce11f288.png?auto=format&fit=fill&q=70",
    imageAlt: "Dashboard HCM Darwinbox",
    productUrl: "https://darwinbox.com/",
  },
  "Mekari Talenta": {
    companyDescription:
      "Talenta dikembangkan oleh Mekari, perusahaan SaaS Indonesia dengan rangkaian solusi untuk HR, finance, pajak, legal, dan proses bisnis.",
    features: ["Core HR", "Attendance", "Payroll dan benefit", "Talent dan employee self-service"],
    imageUrl: "/images/vendors/mekari-talenta.png",
    imageAlt: "Tampilan software HRIS Mekari Talenta",
    productUrl: "https://www.talenta.co/fitur/",
  },
  Gadjian: {
    companyDescription:
      "Gadjian merupakan solusi HRIS dan payroll dalam ekosistem Fast8 People Hub yang berfokus pada kebutuhan administrasi tenaga kerja Indonesia.",
    features: [
      "Database karyawan",
      "Attendance dan shift",
      "Payroll, BPJS, dan PPh 21",
      "Employee self-service",
    ],
    imageUrl: "/images/vendors/gadjian.jpg",
    imageAlt: "Tampilan software HRIS dan payroll Gadjian",
    productUrl: "https://www.gadjian.com/features",
  },
  "GreatDay HR": {
    companyDescription:
      "GreatDay HR dikembangkan oleh PT Indodev Niaga Internet, perusahaan teknologi Indonesia yang membangun solusi HRIS berbasis web dan mobile.",
    features: [
      "Attendance",
      "Payroll dan reimbursement",
      "Employee self-service",
      "Performance dan recruitment",
    ],
    imageUrl: "https://greatdayhr.ph/wp-content/uploads/2025/07/GreatDay-App-1.png",
    imageAlt: "Aplikasi mobile dan dashboard GreatDay HR",
    productUrl: "https://greatdayhr.com/en-en/",
  },
  LinovHR: {
    companyDescription:
      "LinovHR adalah penyedia HRIS Indonesia yang membangun modul operasional HR dan talent management untuk organisasi menengah hingga besar.",
    features: [
      "Personnel dan organization",
      "Time dan payroll",
      "Recruitment",
      "Performance dan learning",
    ],
    imageUrl: "/images/vendors/linovhr.webp",
    imageAlt: "Dashboard HRIS LinovHR",
    productUrl: "https://www.linovhr.com/aplikasi-hris/",
  },
  "HashMicro HRM": {
    companyDescription:
      "HashMicro HRM merupakan bagian dari suite ERP HashMicro yang menghubungkan proses SDM dengan accounting, project, aset, dan operasi perusahaan lain.",
    features: ["HR administration", "Attendance dan payroll", "Recruitment", "Talent dan learning"],
    imageUrl: "/images/vendors/hashmicro-hrm.webp",
    imageAlt: "Visual produk HashMicro HRM",
    productUrl: "https://www.hashmicro.com/id/manajemen-human-resource",
  },
  CATAPA: {
    companyDescription:
      "CATAPA adalah penyedia teknologi HR dan payroll Indonesia yang memusatkan produknya pada otomasi penggajian serta layanan mandiri karyawan.",
    features: ["Payroll", "BPJS dan PPh 21", "Pesangon", "Employee self-service"],
    imageUrl: "/images/vendors/catapa.png",
    imageAlt: "Visual platform HR dan payroll CATAPA",
    productUrl: "https://catapa.com/",
  },
  Hadirr: {
    companyDescription:
      "Hadirr merupakan aplikasi workforce dalam ekosistem Fast8 People Hub yang berfokus pada attendance dan produktivitas tenaga kerja mobile.",
    features: [
      "GPS dan geofencing",
      "Face verification",
      "Shift dan overtime",
      "Timesheet dan client visit",
    ],
    imageUrl: "/images/vendors/hadirr.jpg",
    imageAlt: "Tampilan aplikasi attendance Hadirr",
    productUrl: "https://www.hadirr.com/features",
  },
  "Zoho People": {
    companyDescription:
      "Zoho People dikembangkan oleh Zoho Corporation dan menjadi bagian dari ekosistem aplikasi bisnis global Zoho.",
    features: ["Employee records", "Attendance dan leave", "Performance", "Learning dan workflow"],
    imageUrl: "/images/vendors/zoho-people.png",
    imageAlt: "Visual platform HR Zoho People",
    productUrl: "https://www.zoho.com/en-us/people/features.html",
  },
  "Workplaze by Humanica": {
    companyDescription:
      "Workplaze dikembangkan oleh Humanica, penyedia teknologi dan layanan HR asal Thailand yang melayani organisasi di kawasan Asia.",
    features: ["Core HR", "Time dan payroll", "Recruitment", "Performance dan learning"],
    imageUrl: "/images/vendors/workplaze-by-humanica.png",
    imageAlt: "Tampilan HCM Workplaze by Humanica",
    productUrl: "https://www.humanica.com/en/hr-program/workplaze/hr-management/core-hr/",
  },
};
