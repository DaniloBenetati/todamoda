// Plano de Contas Estruturado e Dados Contábeis de Toda Moda

export interface DREChannelValues {
  planned: number;
  realized: number;
  // Realizado quebrado por mês ("01".."12"), preenchido pela importação de Excel.
  // `realized` é sempre a soma destes valores; é o que sustenta a coluna de cada mês na tela.
  realizedByMonth?: Record<string, number>;
  plannedPct?: number;
  realizedPct?: number;
}

export interface AccountPlanItem {
  id: string;
  row?: number;
  code: string;
  name: string;
  level: number; // 0: Total/Resultado, 1: Grupo Principal (Nível 1), 2: Subgrupo (Nível 2), 3: Conta Analítica (Nível 3), 4: Detalhamento (Nível 4)
  category: string;
  isGroupHeader?: boolean;
  isMainResult?: boolean;
  parentId?: string;
  channels?: string[];
  description?: string;
  active?: boolean;
  entity?: "newco" | "bsg";
  values?: {
    tiendas: DREChannelValues;
    produto: DREChannelValues;
    franquias: DREChannelValues;
    consolidado: DREChannelValues;
  };
}

export type DRELineItem = AccountPlanItem;
export type DREAccountItem = AccountPlanItem;
export type ChannelType = "tiendas" | "produto" | "franquias" | "consolidado";

export interface DRETransaction {
  id: string;
  row: number;
  entity: string;
  date: string;
  supplier: string;
  code: string;
  categoryName: string;
  type: string;
  doc: string;
  amount: number;
}

export const INITIAL_ACCOUNT_PLAN: AccountPlanItem[] = [
  {
    "id": "acc-4",
    "row": 4,
    "code": "40.1",
    "name": "VENTAS c IVA - Tiendas Propias + e-commerce + Productos",
    "level": 1,
    "category": "Receita Operacional (Vendas)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-5",
    "row": 5,
    "code": "40.1.1",
    "name": "Tiendas",
    "level": 2,
    "category": "Receita Operacional (Vendas)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-6",
    "row": 6,
    "code": "40.1.2",
    "name": "E-Commerce",
    "level": 2,
    "category": "Receita Operacional (Vendas)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-7",
    "row": 7,
    "code": "40.1.3",
    "name": "Producto",
    "level": 2,
    "category": "Receita Operacional (Vendas)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-8",
    "row": 8,
    "code": "41.1",
    "name": "IVA (ICMS, Pis, Cofins, IPI) - Tiendas Propias",
    "level": 1,
    "category": "Deduções / Impostos sobre Venda",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -143583,
        "realized": 0
      },
      "produto": {
        "planned": -125136.57626179252,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-9",
    "row": 9,
    "code": "41.1.1",
    "name": "Tiendas",
    "level": 2,
    "category": "Deduções / Impostos sobre Venda",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-10",
    "row": 10,
    "code": "41.1.2",
    "name": "E-Commerce",
    "level": 2,
    "category": "Deduções / Impostos sobre Venda",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-11",
    "row": 11,
    "code": "41.1.3",
    "name": "Producto",
    "level": 2,
    "category": "Deduções / Impostos sobre Venda",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-12",
    "row": 12,
    "code": "42.1",
    "name": "VENTAS NETAS",
    "level": 0,
    "category": "Receita Operacional (Vendas)",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -143583,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-13",
    "row": 13,
    "code": "42.1.1",
    "name": "Ventas Tiendas",
    "level": 2,
    "category": "Receita Operacional (Vendas)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-14",
    "row": 14,
    "code": "42.1.2",
    "name": "Ventas E-Commerce",
    "level": 2,
    "category": "Receita Operacional (Vendas)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-15",
    "row": 15,
    "code": "42.1.3",
    "name": "Producto",
    "level": 2,
    "category": "Receita Operacional (Vendas)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-16",
    "row": 16,
    "code": "43.1",
    "name": "CMV",
    "level": 1,
    "category": "Custos das Mercadorias (CMV)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -215193.132,
        "realized": 0
      },
      "produto": {
        "planned": -585697.6823174672,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -800890.8143174672,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-17",
    "row": 17,
    "code": "43.1.1",
    "name": "CMV Tiendas",
    "level": 2,
    "category": "Custos das Mercadorias (CMV)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-18",
    "row": 18,
    "code": "43.1.2",
    "name": "CMV E-Commerce",
    "level": 2,
    "category": "Custos das Mercadorias (CMV)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-19",
    "row": 19,
    "code": "43.1.3",
    "name": "CMV Ventas Producto",
    "level": 2,
    "category": "Custos das Mercadorias (CMV)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-20",
    "row": 20,
    "code": "",
    "name": "CMg - Operativo",
    "level": 0,
    "category": "Indicador / Margens",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -358776.132,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-22",
    "row": 22,
    "code": "50.1",
    "name": "INGRESSO BRUTO - Franquicias",
    "level": 1,
    "category": "Receitas de Franquias",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-23",
    "row": 23,
    "code": "50.1.1",
    "name": "Regalias",
    "level": 2,
    "category": "Receitas de Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-24",
    "row": 24,
    "code": "50.1.2",
    "name": "Fondo de Promoción",
    "level": 2,
    "category": "Receitas de Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-25",
    "row": 25,
    "code": "50.1.3",
    "name": "Tasa Admin",
    "level": 2,
    "category": "Receitas de Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-26",
    "row": 26,
    "code": "51.1",
    "name": "IVA (ICMS, Pis, Cofins, IPI) - Franquicias",
    "level": 1,
    "category": "Impostos sobre Franquias",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-27",
    "row": 27,
    "code": "51.1.1",
    "name": "Regalias",
    "level": 2,
    "category": "Impostos sobre Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-28",
    "row": 28,
    "code": "51.1.2",
    "name": "Fondo de Promoción",
    "level": 2,
    "category": "Impostos sobre Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-29",
    "row": 29,
    "code": "51.1.3",
    "name": "Tasa Admin",
    "level": 2,
    "category": "Impostos sobre Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-30",
    "row": 30,
    "code": "52.1",
    "name": "INGRESSO NETO - Franquicias",
    "level": 1,
    "category": "Receitas de Franquias",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-31",
    "row": 31,
    "code": "52.1.1",
    "name": "Regalias",
    "level": 2,
    "category": "Receitas de Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-32",
    "row": 32,
    "code": "52.1.2",
    "name": "Fondo de Promoción",
    "level": 2,
    "category": "Receitas de Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-33",
    "row": 33,
    "code": "52.1.3",
    "name": "Tasa Admin",
    "level": 2,
    "category": "Receitas de Franquias",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-34",
    "row": 34,
    "code": "",
    "name": "CMg - Franquicias",
    "level": 0,
    "category": "Indicador / Margens",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-36",
    "row": 36,
    "code": "",
    "name": "CMg - Total",
    "level": 0,
    "category": "Indicador / Margens",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -358776.132,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-38",
    "row": 38,
    "code": "1.1",
    "name": "SUELDOS",
    "level": 1,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-39",
    "row": 39,
    "code": "1.1.1",
    "name": "Sueldos",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-40",
    "row": 40,
    "code": "1.1.2",
    "name": "Bonus",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-41",
    "row": 41,
    "code": "1.1.3",
    "name": "Premio",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-42",
    "row": 42,
    "code": "1.1.4",
    "name": "Adicional",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-43",
    "row": 43,
    "code": "1.1.5",
    "name": "Vales de Transporte / Desplazamiento",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-44",
    "row": 44,
    "code": "1.1.6",
    "name": "Vale Refeição / Vales de Alimentacion",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-45",
    "row": 45,
    "code": "1.1.7",
    "name": "Assistência Médica / Seguro Salud",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-46",
    "row": 46,
    "code": "1.1.8",
    "name": "FGTS",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-47",
    "row": 47,
    "code": "1.1.9",
    "name": "INSS",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-48",
    "row": 48,
    "code": "1.1.10",
    "name": "13º Proporcional",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-49",
    "row": 49,
    "code": "1.1.11",
    "name": "13º FGTS",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-50",
    "row": 50,
    "code": "1.1.12",
    "name": "13º INSS",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-51",
    "row": 51,
    "code": "1.1.13",
    "name": "Férias 1/3",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-52",
    "row": 52,
    "code": "1.1.14",
    "name": "Férias 1/3 FGTS",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-53",
    "row": 53,
    "code": "1.1.15",
    "name": "Férias 1/3 INSS",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-54",
    "row": 54,
    "code": "1.1.16",
    "name": "FGTS Multa 40%",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-55",
    "row": 55,
    "code": "1.1.17",
    "name": "FGTS Multa 10%",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-56",
    "row": 56,
    "code": "1.1.18",
    "name": "Medicina del Trabajo",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-57",
    "row": 57,
    "code": "1.1.19",
    "name": "Sindicatos",
    "level": 2,
    "category": "1.0 Pessoal & Encargos (Sueldos)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-58",
    "row": 58,
    "code": "2.1",
    "name": "ALQUILERES",
    "level": 1,
    "category": "2.0 Aluguel & Ocupação",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -4010.41
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -4010.41
      }
    }
  },
  {
    "id": "acc-59",
    "row": 59,
    "code": "2.1.1",
    "name": "Alquileres",
    "level": 2,
    "category": "2.0 Aluguel & Ocupação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-60",
    "row": 60,
    "code": "2.1.2",
    "name": "Porcentual sobre Ventas",
    "level": 2,
    "category": "2.0 Aluguel & Ocupação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-61",
    "row": 61,
    "code": "2.1.3",
    "name": "Fondo Promocion Alquileres",
    "level": 2,
    "category": "2.0 Aluguel & Ocupação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-62",
    "row": 62,
    "code": "2.1.4",
    "name": "Expensas",
    "level": 2,
    "category": "2.0 Aluguel & Ocupação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-63",
    "row": 63,
    "code": "2.1.5",
    "name": "Comisiones por Alquileres",
    "level": 2,
    "category": "2.0 Aluguel & Ocupação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-64",
    "row": 64,
    "code": "2.1.6",
    "name": "Gastos Sellado Alquileres",
    "level": 2,
    "category": "2.0 Aluguel & Ocupação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-65",
    "row": 65,
    "code": "2.1.7",
    "name": "Gastos Administrativos sobre Alquileres",
    "level": 2,
    "category": "2.0 Aluguel & Ocupação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -4010.41
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -4010.41
      }
    }
  },
  {
    "id": "acc-66",
    "row": 66,
    "code": "3.1",
    "name": "LOGISTICA",
    "level": 1,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -902.3
      },
      "produto": {
        "planned": -136550,
        "realized": -226861.1
      },
      "franquias": {
        "planned": 0,
        "realized": -4593
      },
      "consolidado": {
        "planned": -136550,
        "realized": -232356.4
      }
    }
  },
  {
    "id": "acc-67",
    "row": 67,
    "code": "3.1.1",
    "name": "Alquileres",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -60550,
        "realized": -48981
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -60550,
        "realized": -48981
      }
    }
  },
  {
    "id": "acc-68",
    "row": 68,
    "code": "3.1.2",
    "name": "Fletes",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -76000,
        "realized": -82956.13
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -76000,
        "realized": -82956.13
      }
    }
  },
  {
    "id": "acc-69",
    "row": 69,
    "code": "3.1.3",
    "name": "Infraestructura",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-70",
    "row": 70,
    "code": "3.1.4",
    "name": "Equipos Alquilados",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -1160
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -1160
      }
    }
  },
  {
    "id": "acc-71",
    "row": 71,
    "code": "3.1.5",
    "name": "Muebles / Movilias",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-72",
    "row": 72,
    "code": "3.1.6",
    "name": "Alquiler Oficina",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-73",
    "row": 73,
    "code": "3.1.7",
    "name": "Insumos",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -64860.4
      },
      "franquias": {
        "planned": 0,
        "realized": -4593
      },
      "consolidado": {
        "planned": 0,
        "realized": -69453.4
      }
    }
  },
  {
    "id": "acc-74",
    "row": 74,
    "code": "3.1.8",
    "name": "Mano de Obra AZ",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-75",
    "row": 75,
    "code": "3.1.9",
    "name": "Equipo de Backoffice",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-76",
    "row": 76,
    "code": "3.1.10",
    "name": "Agua, Electricidad e Internet",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -1898.9
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -1898.9
      }
    }
  },
  {
    "id": "acc-77",
    "row": 77,
    "code": "3.1.11",
    "name": "Viaticos / Costos con Viajes",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -27004.670000000002
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -27004.670000000002
      }
    }
  },
  {
    "id": "acc-78",
    "row": 78,
    "code": "3.1.12",
    "name": "Mano de Obra E-Commerce",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-79",
    "row": 79,
    "code": "3.1.13",
    "name": "Fletes E-Commerce",
    "level": 2,
    "category": "3.0 Logística & Fretes",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -902.3
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -902.3
      }
    }
  },
  {
    "id": "acc-80",
    "row": 80,
    "code": "4.1",
    "name": "IMPUESTOS",
    "level": 1,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-81",
    "row": 81,
    "code": "4.1.1",
    "name": "Impuestos Federales",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-82",
    "row": 82,
    "code": "4.1.2",
    "name": "Impuesto a Las Ganacias",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-83",
    "row": 83,
    "code": "4.1.3",
    "name": "Tasa Seguridad e Higiene",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-84",
    "row": 84,
    "code": "4.1.4",
    "name": "Tasa Publicidad",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-85",
    "row": 85,
    "code": "4.1.5",
    "name": "Contribuicion por Toldos",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-86",
    "row": 86,
    "code": "4.1.6",
    "name": "Impuesto Inmobiliario",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-87",
    "row": 87,
    "code": "4.1.7",
    "name": "Alumbrado, Barrido y Limpieza",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-88",
    "row": 88,
    "code": "4.1.8",
    "name": "Impuesto al Debito Bancario",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-89",
    "row": 89,
    "code": "4.1.9",
    "name": "Cargos Impositivos",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-90",
    "row": 90,
    "code": "4.1.10",
    "name": "Tax Free",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-91",
    "row": 91,
    "code": "4.1.11",
    "name": "Timbrados, Sellados y Cedrtificaciones",
    "level": 2,
    "category": "4.0 Impostos & Taxas Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-92",
    "row": 92,
    "code": "5.1",
    "name": "MARKETING",
    "level": 1,
    "category": "5.0 Marketing & PDV",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -3863.5299999999997
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -3863.5299999999997
      }
    }
  },
  {
    "id": "acc-93",
    "row": 93,
    "code": "5.1.1",
    "name": "Uniformes",
    "level": 2,
    "category": "5.0 Marketing & PDV",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-94",
    "row": 94,
    "code": "5.1.2",
    "name": "Gastos de Exhibicion de Mercaderia",
    "level": 2,
    "category": "5.0 Marketing & PDV",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -513.18
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -513.18
      }
    }
  },
  {
    "id": "acc-95",
    "row": 95,
    "code": "5.1.3",
    "name": "Imagen Corporativa",
    "level": 2,
    "category": "5.0 Marketing & PDV",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-96",
    "row": 96,
    "code": "5.1.4",
    "name": "Publicidad",
    "level": 2,
    "category": "5.0 Marketing & PDV",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-97",
    "row": 97,
    "code": "5.1.5",
    "name": "Imagen em Puntos de Venta",
    "level": 2,
    "category": "5.0 Marketing & PDV",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -3350.35
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -3350.35
      }
    }
  },
  {
    "id": "acc-98",
    "row": 98,
    "code": "6.1",
    "name": "SERVICIOS",
    "level": 1,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -5308.529999999999
      },
      "produto": {
        "planned": 0,
        "realized": -772.1200000000001
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -6080.649999999999
      }
    }
  },
  {
    "id": "acc-99",
    "row": 99,
    "code": "6.1.1",
    "name": "Aguas",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-100",
    "row": 100,
    "code": "6.1.2",
    "name": "Alarmas",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-101",
    "row": 101,
    "code": "6.1.3",
    "name": "Diarios, Revistas y Suscripciones",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -371.83000000000004
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -371.83000000000004
      }
    }
  },
  {
    "id": "acc-102",
    "row": 102,
    "code": "6.1.4",
    "name": "Electricidad",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -2782.8599999999997
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -2782.8599999999997
      }
    }
  },
  {
    "id": "acc-103",
    "row": 103,
    "code": "6.1.5",
    "name": "Gas",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-104",
    "row": 104,
    "code": "6.1.6",
    "name": "Limpieza",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-105",
    "row": 105,
    "code": "6.1.7",
    "name": "Servicio de Internet",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -1109.6999999999998
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -1109.6999999999998
      }
    }
  },
  {
    "id": "acc-106",
    "row": 106,
    "code": "6.1.8",
    "name": "Telefonia Fija",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -1044.1399999999999
      },
      "produto": {
        "planned": 0,
        "realized": -193.3
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -1237.4399999999998
      }
    }
  },
  {
    "id": "acc-107",
    "row": 107,
    "code": "6.1.9",
    "name": "Telefonia Movil",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -578.82
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -578.82
      }
    }
  },
  {
    "id": "acc-108",
    "row": 108,
    "code": "6.1.10",
    "name": "Television por Cable",
    "level": 2,
    "category": "6.0 Serviços & Utilidades",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-109",
    "row": 109,
    "code": "7.1",
    "name": "MANTENIMIENTO",
    "level": 1,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -855
      },
      "produto": {
        "planned": 0,
        "realized": -18462.82
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -19317.82
      }
    }
  },
  {
    "id": "acc-110",
    "row": 110,
    "code": "7.1.1",
    "name": "Rodados",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-111",
    "row": 111,
    "code": "7.1.2",
    "name": "Sistemas",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-112",
    "row": 112,
    "code": "7.1.3",
    "name": "Electricos",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-113",
    "row": 113,
    "code": "7.1.4",
    "name": "Articulos de Pintureria y Ferreteria",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-114",
    "row": 114,
    "code": "7.1.5",
    "name": "Articulos de Iluminacion",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-115",
    "row": 115,
    "code": "7.1.6",
    "name": "Otros Materiales",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -1110.82
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -1110.82
      }
    }
  },
  {
    "id": "acc-116",
    "row": 116,
    "code": "7.1.7",
    "name": "Pisos Y Revestimientos",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-117",
    "row": 117,
    "code": "7.1.8",
    "name": "Servicios de Mantenimiento General y Reparaciones",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -855
      },
      "produto": {
        "planned": 0,
        "realized": -2500
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -3355
      }
    }
  },
  {
    "id": "acc-118",
    "row": 118,
    "code": "7.1.9",
    "name": "Software",
    "level": 2,
    "category": "7.0 Manutenção & Conservação",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -14851.999999999998
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -14851.999999999998
      }
    }
  },
  {
    "id": "acc-119",
    "row": 119,
    "code": "8.1",
    "name": "ROBO / MERMA",
    "level": 1,
    "category": "8.0 Perdas & Furtos (Merma)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-120",
    "row": 120,
    "code": "8.1.1",
    "name": "Diferencia de Inventario",
    "level": 2,
    "category": "8.0 Perdas & Furtos (Merma)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-121",
    "row": 121,
    "code": "8.1.2",
    "name": "",
    "level": 2,
    "category": "8.0 Perdas & Furtos (Merma)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-122",
    "row": 122,
    "code": "9.1",
    "name": "OTROS VARIABLES S/VENTAS",
    "level": 1,
    "category": "9.0 Outros Variáveis s/ Vendas",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -26797.25
      }
    }
  },
  {
    "id": "acc-123",
    "row": 123,
    "code": "9.1.1",
    "name": "Packaging Clientes / Embalaje (Sacola)",
    "level": 2,
    "category": "9.0 Outros Variáveis s/ Vendas",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -26797.25
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -26797.25
      }
    }
  },
  {
    "id": "acc-124",
    "row": 124,
    "code": "9.1.2",
    "name": "Comisiones de Tarjetas",
    "level": 2,
    "category": "9.0 Outros Variáveis s/ Vendas",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-125",
    "row": 125,
    "code": "9.1.3",
    "name": "Contracargos Tarjetas",
    "level": 2,
    "category": "9.0 Outros Variáveis s/ Vendas",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-126",
    "row": 126,
    "code": "10.1",
    "name": "OTROS",
    "level": 1,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -16766.666666666668,
        "realized": -8031.06
      },
      "produto": {
        "planned": -20050.333333333343,
        "realized": -24220.1
      },
      "franquias": {
        "planned": -20200,
        "realized": 0
      },
      "consolidado": {
        "planned": -57017.000000000015,
        "realized": -32251.16
      }
    }
  },
  {
    "id": "acc-127",
    "row": 127,
    "code": "10.1.1",
    "name": "Acuerdos Extraordinarios",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -16766.666666666668,
        "realized": 0
      },
      "produto": {
        "planned": -20050.333333333343,
        "realized": 0
      },
      "franquias": {
        "planned": -20200,
        "realized": 0
      },
      "consolidado": {
        "planned": -57017.000000000015,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-128",
    "row": 128,
    "code": "10.1.2",
    "name": "Alquiler de Maquinas y Equipos",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -9698.279999999999
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -9698.279999999999
      }
    }
  },
  {
    "id": "acc-129",
    "row": 129,
    "code": "10.1.3",
    "name": "Articulos de Computacion",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-130",
    "row": 130,
    "code": "10.1.4",
    "name": "Atenciones al Personal",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-131",
    "row": 131,
    "code": "10.1.5",
    "name": "Busqueda e Incorporacion",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-132",
    "row": 132,
    "code": "10.1.6",
    "name": "Capacitacion",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-133",
    "row": 133,
    "code": "10.1.7",
    "name": "Cliente Oculto",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-134",
    "row": 134,
    "code": "10.1.8",
    "name": "Comisiones por Transf. Exterior",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-135",
    "row": 135,
    "code": "10.1.9",
    "name": "Descuento a Clientes",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-136",
    "row": 136,
    "code": "10.1.10",
    "name": "Diferencias por Redondeo",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-137",
    "row": 137,
    "code": "10.1.11",
    "name": "Donaciones",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-138",
    "row": 138,
    "code": "10.1.12",
    "name": "Egresos Audit/Mantenimiento",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-139",
    "row": 139,
    "code": "10.1.13",
    "name": "Elementos de Organizacion de Stock",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-140",
    "row": 140,
    "code": "10.1.14",
    "name": "Elementos de Seguridad",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-141",
    "row": 141,
    "code": "10.1.15",
    "name": "Eventos",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-142",
    "row": 142,
    "code": "10.1.16",
    "name": "Fallo de Caja / Diferencia",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-143",
    "row": 143,
    "code": "10.1.17",
    "name": "Farmacia",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-144",
    "row": 144,
    "code": "10.1.18",
    "name": "Gastos Administrativos por Leasing",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-145",
    "row": 145,
    "code": "10.1.19",
    "name": "Gastos Bancarios",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -7592.34
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -7592.34
      }
    }
  },
  {
    "id": "acc-146",
    "row": 146,
    "code": "10.1.20",
    "name": "Gastos de Almacenaje",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-147",
    "row": 147,
    "code": "10.1.21",
    "name": "Gastos de Auditorias en Locales",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-148",
    "row": 148,
    "code": "10.1.22",
    "name": "Gastos de Embalaje / Envases o Paquetes",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-149",
    "row": 149,
    "code": "10.1.23",
    "name": "Gastos de Importacion",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-150",
    "row": 150,
    "code": "10.1.24",
    "name": "Gastos Judiciales",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-151",
    "row": 151,
    "code": "10.1.25",
    "name": "Gastos por Habilitaciones",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-152",
    "row": 152,
    "code": "10.1.26",
    "name": "Gastos por Toma de Inventarios",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-153",
    "row": 153,
    "code": "10.1.27",
    "name": "Gastos post Cierre Locales",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-154",
    "row": 154,
    "code": "10.1.28",
    "name": "Gastos Varios",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -6929.48
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -6929.48
      }
    }
  },
  {
    "id": "acc-155",
    "row": 155,
    "code": "10.1.29",
    "name": "Imprenta",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-156",
    "row": 156,
    "code": "10.1.30",
    "name": "Juicios",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-157",
    "row": 157,
    "code": "10.1.31",
    "name": "Mensajeria",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-158",
    "row": 158,
    "code": "10.1.32",
    "name": "Muestras",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-159",
    "row": 159,
    "code": "10.1.33",
    "name": "Multas en General",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-160",
    "row": 160,
    "code": "10.1.34",
    "name": "Multas Laborales",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-161",
    "row": 161,
    "code": "10.1.35",
    "name": "Multas Rentas",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-162",
    "row": 162,
    "code": "10.1.36",
    "name": "Papeleria, Librería y Utiles",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-163",
    "row": 163,
    "code": "10.1.37",
    "name": "Patentes",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-164",
    "row": 164,
    "code": "10.1.38",
    "name": "Perdida por Leasing",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-165",
    "row": 165,
    "code": "10.1.39",
    "name": "Reprocesos Logisticos",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-166",
    "row": 166,
    "code": "10.1.40",
    "name": "Scrap",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-167",
    "row": 167,
    "code": "10.1.41",
    "name": "Seguridad y Vigilancia",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-168",
    "row": 168,
    "code": "10.1.42",
    "name": "Seguros",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -8031.06
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -8031.06
      }
    }
  },
  {
    "id": "acc-169",
    "row": 169,
    "code": "10.1.43",
    "name": "Servicios de Auditoria",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-170",
    "row": 170,
    "code": "10.1.44",
    "name": "Servicios de Inventario",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-171",
    "row": 171,
    "code": "10.1.45",
    "name": "Servicio de Atencion Medica",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-172",
    "row": 172,
    "code": "10.1.46",
    "name": "Transporte de Caudales (Carro Forte)",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-173",
    "row": 173,
    "code": "10.1.47",
    "name": "Vouchers / Cheques Regalo",
    "level": 2,
    "category": "10.0 Outras Despesas Gerais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-174",
    "row": 174,
    "code": "11.1",
    "name": "VIATICOS",
    "level": 1,
    "category": "11.0 Viagens & Deslocamentos",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": -2440.66
      },
      "consolidado": {
        "planned": 0,
        "realized": -2440.66
      }
    }
  },
  {
    "id": "acc-175",
    "row": 175,
    "code": "11.1.1",
    "name": "Gastos de Representacion",
    "level": 2,
    "category": "11.0 Viagens & Deslocamentos",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-176",
    "row": 176,
    "code": "11.1.2",
    "name": "Hospedaje",
    "level": 2,
    "category": "11.0 Viagens & Deslocamentos",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": -2242.66
      },
      "consolidado": {
        "planned": 0,
        "realized": -2242.66
      }
    }
  },
  {
    "id": "acc-177",
    "row": 177,
    "code": "11.1.3",
    "name": "Otros Gastos de Movilidad",
    "level": 2,
    "category": "11.0 Viagens & Deslocamentos",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": -198
      },
      "consolidado": {
        "planned": 0,
        "realized": -198
      }
    }
  },
  {
    "id": "acc-178",
    "row": 178,
    "code": "11.1.4",
    "name": "Pasajes",
    "level": 2,
    "category": "11.0 Viagens & Deslocamentos",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-179",
    "row": 179,
    "code": "11.1.5",
    "name": "Refrigerios",
    "level": 2,
    "category": "11.0 Viagens & Deslocamentos",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-180",
    "row": 180,
    "code": "11.1.6",
    "name": "Viaticos en el Exterior",
    "level": 2,
    "category": "11.0 Viagens & Deslocamentos",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-181",
    "row": 181,
    "code": "11.1.7",
    "name": "Viaticos en el Pais",
    "level": 2,
    "category": "11.0 Viagens & Deslocamentos",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-182",
    "row": 182,
    "code": "12.1",
    "name": "RAAS",
    "level": 1,
    "category": "12.0 RAAS",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-183",
    "row": 183,
    "code": "12.1.1",
    "name": "Retail as a Service",
    "level": 2,
    "category": "12.0 RAAS",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-184",
    "row": 184,
    "code": "12.1.2",
    "name": "",
    "level": 2,
    "category": "12.0 RAAS",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-185",
    "row": 185,
    "code": "13.1",
    "name": "HONORARIOS",
    "level": 1,
    "category": "13.0 Honorários Profissionais",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -48033.333333333336,
        "realized": -33012.63
      },
      "franquias": {
        "planned": 0,
        "realized": -12038.75
      },
      "consolidado": {
        "planned": -48033.333333333336,
        "realized": -45051.380000000005
      }
    }
  },
  {
    "id": "acc-186",
    "row": 186,
    "code": "13.1.1",
    "name": "Honorarios Contabilidad",
    "level": 2,
    "category": "13.0 Honorários Profissionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -48033.333333333336,
        "realized": -27014.66
      },
      "franquias": {
        "planned": 0,
        "realized": -5000
      },
      "consolidado": {
        "planned": -48033.333333333336,
        "realized": -32014.66
      }
    }
  },
  {
    "id": "acc-187",
    "row": 187,
    "code": "13.1.2",
    "name": "Honorarios Legales",
    "level": 2,
    "category": "13.0 Honorários Profissionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -5997.97
      },
      "franquias": {
        "planned": 0,
        "realized": -7038.75
      },
      "consolidado": {
        "planned": 0,
        "realized": -13036.720000000001
      }
    }
  },
  {
    "id": "acc-188",
    "row": 188,
    "code": "13.1.3",
    "name": "Honorarios de Terceros",
    "level": 2,
    "category": "13.0 Honorários Profissionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-189",
    "row": 189,
    "code": "14.1",
    "name": "REGALIAS CM",
    "level": 1,
    "category": "14.0 Royalties & Licenciamento",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-190",
    "row": 190,
    "code": "14.1.1",
    "name": "Regalias CM",
    "level": 2,
    "category": "14.0 Royalties & Licenciamento",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-191",
    "row": 191,
    "code": "14.1.2",
    "name": "",
    "level": 2,
    "category": "14.0 Royalties & Licenciamento",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-192",
    "row": 192,
    "code": "",
    "name": "GASTOS CANALES",
    "level": 0,
    "category": "Totais de Despesas",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -16766.666666666668,
        "realized": -18960.42
      },
      "produto": {
        "planned": -204633.6666666667,
        "realized": -334136.43
      },
      "franquias": {
        "planned": -20200,
        "realized": -19072.41
      },
      "consolidado": {
        "planned": -241600.33333333334,
        "realized": -372169.25999999995
      }
    }
  },
  {
    "id": "acc-193",
    "row": 193,
    "code": "",
    "name": "GASTOS CANALES - Tiendas Propias",
    "level": 0,
    "category": "Totais de Despesas",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -16766.666666666668,
        "realized": -18960.42
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -16766.666666666668,
        "realized": -18960.42
      }
    }
  },
  {
    "id": "acc-194",
    "row": 194,
    "code": "",
    "name": "GASTOS CANALES - Venta Producto",
    "level": 0,
    "category": "Totais de Despesas",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -204633.6666666667,
        "realized": -334136.43
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -204633.6666666667,
        "realized": -334136.43
      }
    }
  },
  {
    "id": "acc-195",
    "row": 195,
    "code": "",
    "name": "GASTOS CANALES - Franquicias",
    "level": 0,
    "category": "Totais de Despesas",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": -20200,
        "realized": -19072.41
      },
      "consolidado": {
        "planned": -20200,
        "realized": -19072.41
      }
    }
  },
  {
    "id": "acc-196",
    "row": 196,
    "code": "",
    "name": "MARGEN OPERACIONAL - Total",
    "level": 0,
    "category": "Indicador / Margens",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -375542.79866666667,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": -20200,
        "realized": -19072.41
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-198",
    "row": 198,
    "code": "20.1",
    "name": "SUELDOS - AACC",
    "level": 1,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -1089.6
      },
      "produto": {
        "planned": -451650,
        "realized": -465324.9
      },
      "franquias": {
        "planned": -45000,
        "realized": -72616.48
      },
      "consolidado": {
        "planned": -496650,
        "realized": -539030.9799999999
      }
    }
  },
  {
    "id": "acc-199",
    "row": 199,
    "code": "20.1.1",
    "name": "Sueldos",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -451650,
        "realized": -301420.57999999996
      },
      "franquias": {
        "planned": -45000,
        "realized": -68270.44
      },
      "consolidado": {
        "planned": -496650,
        "realized": -369691.01999999996
      }
    }
  },
  {
    "id": "acc-200",
    "row": 200,
    "code": "20.1.2",
    "name": "Bonificación",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-201",
    "row": 201,
    "code": "20.1.3",
    "name": "Premio",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-202",
    "row": 202,
    "code": "20.1.4",
    "name": "Adicional",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-203",
    "row": 203,
    "code": "20.1.5",
    "name": "Vales de Transporte / Desplazamiento",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -480
      },
      "produto": {
        "planned": 0,
        "realized": -8101.59
      },
      "franquias": {
        "planned": 0,
        "realized": -400
      },
      "consolidado": {
        "planned": 0,
        "realized": -8981.59
      }
    }
  },
  {
    "id": "acc-204",
    "row": 204,
    "code": "20.1.6",
    "name": "Vale Refeição / Vales de Alimentacion",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -609.6
      },
      "produto": {
        "planned": 0,
        "realized": -14106.470000000001
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -14716.070000000002
      }
    }
  },
  {
    "id": "acc-205",
    "row": 205,
    "code": "20.1.7",
    "name": "Assistência Médica / Seguro Salud",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -51477.03
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -51477.03
      }
    }
  },
  {
    "id": "acc-206",
    "row": 206,
    "code": "20.1.8",
    "name": "FGTS",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -29056.11
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -29056.11
      }
    }
  },
  {
    "id": "acc-207",
    "row": 207,
    "code": "20.1.9",
    "name": "INSS",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -48195.56
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -48195.56
      }
    }
  },
  {
    "id": "acc-208",
    "row": 208,
    "code": "20.1.10",
    "name": "13º Proporcional",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-209",
    "row": 209,
    "code": "20.1.11",
    "name": "13º FGTS",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -748.16
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -748.16
      }
    }
  },
  {
    "id": "acc-210",
    "row": 210,
    "code": "20.1.12",
    "name": "13º INSS",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-211",
    "row": 211,
    "code": "20.1.13",
    "name": "Férias 1/3",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -11242.96
      },
      "franquias": {
        "planned": 0,
        "realized": -3946.04
      },
      "consolidado": {
        "planned": 0,
        "realized": -15189
      }
    }
  },
  {
    "id": "acc-212",
    "row": 212,
    "code": "20.1.14",
    "name": "Férias 1/3 FGTS",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-213",
    "row": 213,
    "code": "20.1.15",
    "name": "Férias 1/3 INSS",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-214",
    "row": 214,
    "code": "20.1.16",
    "name": "FGTS Multa 40%",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-215",
    "row": 215,
    "code": "20.1.17",
    "name": "FGTS Multa 10%",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-216",
    "row": 216,
    "code": "20.1.18",
    "name": "Medicina del Trabajo",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -976.44
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -976.44
      }
    }
  },
  {
    "id": "acc-217",
    "row": 217,
    "code": "20.1.19",
    "name": "Sindicatos",
    "level": 2,
    "category": "20.0 Sueldos Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-218",
    "row": 218,
    "code": "21.1",
    "name": "ALQUILERES - AACC",
    "level": 1,
    "category": "21.0 Aluguel Corporativo (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -307.47
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -307.47
      }
    }
  },
  {
    "id": "acc-219",
    "row": 219,
    "code": "21.1.1",
    "name": "Alquileres",
    "level": 2,
    "category": "21.0 Aluguel Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -307.47
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -307.47
      }
    }
  },
  {
    "id": "acc-220",
    "row": 220,
    "code": "21.1.2",
    "name": "Gastos Adminsitrativos sobre Alquileres",
    "level": 2,
    "category": "21.0 Aluguel Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-221",
    "row": 221,
    "code": "21.1.3",
    "name": "",
    "level": 2,
    "category": "21.0 Aluguel Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-222",
    "row": 222,
    "code": "22.1",
    "name": "IMPUESTOS - AACC",
    "level": 1,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-223",
    "row": 223,
    "code": "22.1.1",
    "name": "Impuesto a Las Ganacias",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-224",
    "row": 224,
    "code": "22.1.2",
    "name": "Tasa Seguridad e Higiene",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-225",
    "row": 225,
    "code": "22.1.3",
    "name": "Tasa Publicidad",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-226",
    "row": 226,
    "code": "22.1.4",
    "name": "Impuesto Inmobiliario",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-227",
    "row": 227,
    "code": "22.1.5",
    "name": "Alumbrado, Barrido y Limpieza",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-228",
    "row": 228,
    "code": "22.1.6",
    "name": "Impuesto al Debito Bancario",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-229",
    "row": 229,
    "code": "22.1.7",
    "name": "Cargos Impositivos",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-230",
    "row": 230,
    "code": "22.1.8",
    "name": "Tax Free",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-231",
    "row": 231,
    "code": "22.1.9",
    "name": "Timbrados, Sellados y Cedrtificaciones",
    "level": 2,
    "category": "22.0 Impostos Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-232",
    "row": 232,
    "code": "23.1",
    "name": "MARKETING - AACC",
    "level": 1,
    "category": "23.0 Marketing Corporativo (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -21911.22
      },
      "franquias": {
        "planned": -30262.09,
        "realized": -9500
      },
      "consolidado": {
        "planned": -60524.18,
        "realized": -31411.22
      }
    }
  },
  {
    "id": "acc-233",
    "row": 233,
    "code": "23.1.1",
    "name": "Uniformes",
    "level": 2,
    "category": "23.0 Marketing Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -30262.09,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-234",
    "row": 234,
    "code": "23.1.2",
    "name": "Gastos de Exhibicion de Mercaderia",
    "level": 2,
    "category": "23.0 Marketing Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-235",
    "row": 235,
    "code": "23.1.3",
    "name": "Imagen Corporativa",
    "level": 2,
    "category": "23.0 Marketing Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-236",
    "row": 236,
    "code": "23.1.4",
    "name": "Publicidad",
    "level": 2,
    "category": "23.0 Marketing Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -21911.22
      },
      "franquias": {
        "planned": -30262.09,
        "realized": -9500
      },
      "consolidado": {
        "planned": -30262.09,
        "realized": -31411.22
      }
    }
  },
  {
    "id": "acc-237",
    "row": 237,
    "code": "23.1.5",
    "name": "Imagen em Puntos de Venta",
    "level": 2,
    "category": "23.0 Marketing Corporativo (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-238",
    "row": 238,
    "code": "24.1",
    "name": "HONORARIOS -  AACC",
    "level": 1,
    "category": "24.0 Honorários Corporativos (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -33000,
        "realized": -26062
      },
      "franquias": {
        "planned": 0,
        "realized": -7000
      },
      "consolidado": {
        "planned": -33000,
        "realized": -33062
      }
    }
  },
  {
    "id": "acc-239",
    "row": 239,
    "code": "24.1.1",
    "name": "Honorarios Contabilidad",
    "level": 2,
    "category": "24.0 Honorários Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-240",
    "row": 240,
    "code": "24.1.2",
    "name": "Honorarios Legales",
    "level": 2,
    "category": "24.0 Honorários Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-241",
    "row": 241,
    "code": "24.1.3",
    "name": "Honorarios de Terceros",
    "level": 2,
    "category": "24.0 Honorários Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -33000,
        "realized": -26062
      },
      "franquias": {
        "planned": 0,
        "realized": -7000
      },
      "consolidado": {
        "planned": -33000,
        "realized": -33062
      }
    }
  },
  {
    "id": "acc-242",
    "row": 242,
    "code": "25.1",
    "name": "SERVICIOS - AACC",
    "level": 1,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -27140,
        "realized": -535
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -27140,
        "realized": -535
      }
    }
  },
  {
    "id": "acc-243",
    "row": 243,
    "code": "25.1.1",
    "name": "Aguas",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -27140,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -27140,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-244",
    "row": 244,
    "code": "25.1.2",
    "name": "Alarmas",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-245",
    "row": 245,
    "code": "25.1.3",
    "name": "Diarios, Revistas y Suscripciones",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -535
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -535
      }
    }
  },
  {
    "id": "acc-246",
    "row": 246,
    "code": "25.1.4",
    "name": "Electricidad",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-247",
    "row": 247,
    "code": "25.1.5",
    "name": "Gas",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-248",
    "row": 248,
    "code": "25.1.6",
    "name": "Limpieza",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-249",
    "row": 249,
    "code": "25.1.7",
    "name": "Servicio de Internet",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-250",
    "row": 250,
    "code": "25.1.8",
    "name": "Telefonia Fija",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-251",
    "row": 251,
    "code": "25.1.9",
    "name": "Telefonia Movil",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-252",
    "row": 252,
    "code": "25.1.10",
    "name": "Television por Cable",
    "level": 2,
    "category": "25.0 Serviços Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-253",
    "row": 253,
    "code": "26.1",
    "name": "MANTENIMIENTO - AACC",
    "level": 1,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -16138.519999999999
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -16138.519999999999
      }
    }
  },
  {
    "id": "acc-254",
    "row": 254,
    "code": "26.1.1",
    "name": "Rodados",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-255",
    "row": 255,
    "code": "26.1.2",
    "name": "Sistemas",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-256",
    "row": 256,
    "code": "26.1.3",
    "name": "Electricos",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-257",
    "row": 257,
    "code": "26.1.4",
    "name": "Articulos de Pintureria y Ferreteria",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-258",
    "row": 258,
    "code": "26.1.5",
    "name": "Articulos de Iluminacion",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-259",
    "row": 259,
    "code": "26.1.6",
    "name": "Otros Materiales",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-260",
    "row": 260,
    "code": "26.1.7",
    "name": "Pisos Y Revestimientos",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-261",
    "row": 261,
    "code": "26.1.8",
    "name": "Servicios de Mantenimiento General y Reparaciones",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -5199
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -5199
      }
    }
  },
  {
    "id": "acc-262",
    "row": 262,
    "code": "26.1.9",
    "name": "Software",
    "level": 2,
    "category": "26.0 Manutenção Corporativa (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -10939.519999999999
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -10939.519999999999
      }
    }
  },
  {
    "id": "acc-263",
    "row": 263,
    "code": "27.1",
    "name": "OTROS - AACC",
    "level": 1,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -49.9
      },
      "produto": {
        "planned": 0,
        "realized": -773.35
      },
      "franquias": {
        "planned": -5000,
        "realized": 0
      },
      "consolidado": {
        "planned": -5000,
        "realized": -823.25
      }
    }
  },
  {
    "id": "acc-264",
    "row": 264,
    "code": "27.1.1",
    "name": "Acuerdos Extraordinarios",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": -5000,
        "realized": 0
      },
      "consolidado": {
        "planned": -5000,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-265",
    "row": 265,
    "code": "27.1.2",
    "name": "Alquiler de Maquinas y Equipos",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-266",
    "row": 266,
    "code": "27.1.3",
    "name": "Articulos de Computacion",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-267",
    "row": 267,
    "code": "27.1.4",
    "name": "Atenciones al Personal",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-268",
    "row": 268,
    "code": "27.1.5",
    "name": "Busqueda e Incorporacion",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-269",
    "row": 269,
    "code": "27.1.6",
    "name": "Capacitacion",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-270",
    "row": 270,
    "code": "27.1.7",
    "name": "Cliente Oculto",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-271",
    "row": 271,
    "code": "27.1.8",
    "name": "Comisiones por Transf. Exterior",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-272",
    "row": 272,
    "code": "27.1.9",
    "name": "Descuento a Clientes",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-273",
    "row": 273,
    "code": "27.1.10",
    "name": "Diferencias por Redondeo",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-274",
    "row": 274,
    "code": "27.1.11",
    "name": "Donaciones",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-275",
    "row": 275,
    "code": "27.1.12",
    "name": "Egresos Audit/Mantenimiento",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-276",
    "row": 276,
    "code": "27.1.13",
    "name": "Elementos de Organizacion de Stock",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-277",
    "row": 277,
    "code": "27.1.14",
    "name": "Elementos de Seguridad",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-278",
    "row": 278,
    "code": "27.1.15",
    "name": "Eventos",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-279",
    "row": 279,
    "code": "27.1.16",
    "name": "Fallo de Caja",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-280",
    "row": 280,
    "code": "27.1.17",
    "name": "Farmacia",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-281",
    "row": 281,
    "code": "27.1.18",
    "name": "Gastos Administrativos por Leasing",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-282",
    "row": 282,
    "code": "27.1.19",
    "name": "Gastos Bancarios",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-283",
    "row": 283,
    "code": "27.1.20",
    "name": "Gastos de Almacenaje",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-284",
    "row": 284,
    "code": "27.1.21",
    "name": "Gastos de Auditorias en Locales",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-285",
    "row": 285,
    "code": "27.1.22",
    "name": "Gastos de Embalaje",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-286",
    "row": 286,
    "code": "27.1.23",
    "name": "Gastos de Importacion",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-287",
    "row": 287,
    "code": "27.1.24",
    "name": "Gastos Judiciales",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-288",
    "row": 288,
    "code": "27.1.25",
    "name": "Gastos por Habilitaciones",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-289",
    "row": 289,
    "code": "27.1.26",
    "name": "Gastos por Toma de Inventarios",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-290",
    "row": 290,
    "code": "27.1.27",
    "name": "Gastos post Cierre Locales",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-291",
    "row": 291,
    "code": "27.1.28",
    "name": "Gastos Varios",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-292",
    "row": 292,
    "code": "27.1.29",
    "name": "Imprenta",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -49.9
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -49.9
      }
    }
  },
  {
    "id": "acc-293",
    "row": 293,
    "code": "27.1.30",
    "name": "Juicios",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-294",
    "row": 294,
    "code": "27.1.31",
    "name": "Mensajeria",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-295",
    "row": 295,
    "code": "27.1.32",
    "name": "Muestras",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-296",
    "row": 296,
    "code": "27.1.33",
    "name": "Multas en General",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-297",
    "row": 297,
    "code": "27.1.34",
    "name": "Multas Laborales",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-298",
    "row": 298,
    "code": "27.1.35",
    "name": "Multas Rentas",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-299",
    "row": 299,
    "code": "27.1.36",
    "name": "Papeleria, Librería y Utiles",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-300",
    "row": 300,
    "code": "27.1.37",
    "name": "Patentes",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-301",
    "row": 301,
    "code": "27.1.38",
    "name": "Perdida por Leasing",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-302",
    "row": 302,
    "code": "27.1.39",
    "name": "Reprocesos Logisticos",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-303",
    "row": 303,
    "code": "27.1.40",
    "name": "Scrap",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-304",
    "row": 304,
    "code": "27.1.41",
    "name": "Seguridad y Vigilancia",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -773.35
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -773.35
      }
    }
  },
  {
    "id": "acc-305",
    "row": 305,
    "code": "27.1.42",
    "name": "Seguros",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-306",
    "row": 306,
    "code": "27.1.43",
    "name": "Servicios de Auditoria",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-307",
    "row": 307,
    "code": "27.1.44",
    "name": "Servicios de Inventario",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-308",
    "row": 308,
    "code": "27.1.45",
    "name": "Servicio de Atencion Medica",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-309",
    "row": 309,
    "code": "27.1.46",
    "name": "Transporte de Caudales",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-310",
    "row": 310,
    "code": "27.1.47",
    "name": "Vouchers/Cheques Regalo",
    "level": 2,
    "category": "27.0 Outros Corporativos (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-311",
    "row": 311,
    "code": "28.1",
    "name": "VIATICOS - AACC",
    "level": 1,
    "category": "28.0 Viagens Corporativas (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-312",
    "row": 312,
    "code": "28.1.1",
    "name": "Gastos de Representacion",
    "level": 2,
    "category": "28.0 Viagens Corporativas (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-313",
    "row": 313,
    "code": "28.1.2",
    "name": "Hospedaje",
    "level": 2,
    "category": "28.0 Viagens Corporativas (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -1044.629992
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -1044.629992
      }
    }
  },
  {
    "id": "acc-314",
    "row": 314,
    "code": "28.1.3",
    "name": "Otros Gastos de Movilidad",
    "level": 2,
    "category": "28.0 Viagens Corporativas (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -93.91
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -93.91
      }
    }
  },
  {
    "id": "acc-315",
    "row": 315,
    "code": "28.1.4",
    "name": "Pasajes",
    "level": 2,
    "category": "28.0 Viagens Corporativas (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-316",
    "row": 316,
    "code": "28.1.5",
    "name": "Refrigerios",
    "level": 2,
    "category": "28.0 Viagens Corporativas (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -4775.850035
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -4775.850035
      }
    }
  },
  {
    "id": "acc-317",
    "row": 317,
    "code": "28.1.6",
    "name": "Viaticos en el Exterior",
    "level": 2,
    "category": "28.0 Viagens Corporativas (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-318",
    "row": 318,
    "code": "28.1.7",
    "name": "Viaticos en el Pais",
    "level": 2,
    "category": "28.0 Viagens Corporativas (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-319",
    "row": 319,
    "code": "29.1",
    "name": "REFACTURACION CM - AACC",
    "level": 1,
    "category": "29.0 Refaturamento CM (AACC)",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-320",
    "row": 320,
    "code": "29.1.1",
    "name": "Refacturacion CM",
    "level": 2,
    "category": "29.0 Refaturamento CM (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-321",
    "row": 321,
    "code": "29.1.2",
    "name": "",
    "level": 2,
    "category": "29.0 Refaturamento CM (AACC)",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-322",
    "row": 322,
    "code": "",
    "name": "GASTOS AACC - AACC",
    "level": 0,
    "category": "Totais de Despesas",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": -1139.5
      },
      "produto": {
        "planned": -511790,
        "realized": -531052.46
      },
      "franquias": {
        "planned": -80262.09,
        "realized": -89116.48
      },
      "consolidado": {
        "planned": -622314.18,
        "realized": -621308.4399999998
      }
    }
  },
  {
    "id": "acc-324",
    "row": 324,
    "code": "",
    "name": "EBITDA - Tiendas Propias",
    "level": 0,
    "category": "Indicador / EBITDA",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -375542.79866666667,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -375542.79866666667,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-325",
    "row": 325,
    "code": "",
    "name": "EBITDA - Venta Producto",
    "level": 0,
    "category": "Indicador / EBITDA",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-326",
    "row": 326,
    "code": "",
    "name": "EBITDA - Franquicias",
    "level": 0,
    "category": "Indicador / EBITDA",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": -100462.09,
        "realized": -108188.89
      },
      "consolidado": {
        "planned": -100462.09,
        "realized": -108188.89
      }
    }
  },
  {
    "id": "acc-327",
    "row": 327,
    "code": "",
    "name": "EBITDA - Total",
    "level": 0,
    "category": "Indicador / EBITDA",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -375542.79866666667,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": -100462.09,
        "realized": -108188.89
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-329",
    "row": 329,
    "code": "",
    "name": "Efectos Especiales - Tiendas Propias",
    "level": 0,
    "category": "Indicadores & Totais",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-330",
    "row": 330,
    "code": "",
    "name": "Efectos Especiales - Venta Producto",
    "level": 0,
    "category": "Indicadores & Totais",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-331",
    "row": 331,
    "code": "",
    "name": "Efectos Especiales - Franquicias",
    "level": 0,
    "category": "Indicadores & Totais",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-332",
    "row": 332,
    "code": "E. E.",
    "name": "Efectos Especiales",
    "level": 2,
    "category": "Geral",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-334",
    "row": 334,
    "code": "30.1",
    "name": "INTERESES / RESULTADO FINANCIERO",
    "level": 1,
    "category": "30.0 Resultado Financeiro & Juros",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -87415.26,
        "realized": -56546.14
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -87415.26,
        "realized": -56546.14
      }
    }
  },
  {
    "id": "acc-335",
    "row": 335,
    "code": "30.1.2",
    "name": "Intereses Fiscales y Sociales",
    "level": 2,
    "category": "30.0 Resultado Financeiro & Juros",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": -87415.26,
        "realized": -56546.14
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -87415.26,
        "realized": -56546.14
      }
    }
  },
  {
    "id": "acc-336",
    "row": 336,
    "code": "30.1.3",
    "name": "Intereses Bancarios",
    "level": 2,
    "category": "30.0 Resultado Financeiro & Juros",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-337",
    "row": 337,
    "code": "30.1.4",
    "name": "Intereses Comerciales",
    "level": 2,
    "category": "30.0 Resultado Financeiro & Juros",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-338",
    "row": 338,
    "code": "30.1.5",
    "name": "Intereses Financieros",
    "level": 2,
    "category": "30.0 Resultado Financeiro & Juros",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-339",
    "row": 339,
    "code": "30.1.6",
    "name": "Int. Financieros",
    "level": 2,
    "category": "30.0 Resultado Financeiro & Juros",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-340",
    "row": 340,
    "code": "31.1",
    "name": "AMORTIZACIONES",
    "level": 1,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -8430.349999999999,
        "realized": 0
      },
      "produto": {
        "planned": -3480.74,
        "realized": -3347.34
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -11911.09,
        "realized": -3347.34
      }
    }
  },
  {
    "id": "acc-341",
    "row": 341,
    "code": "31.1.1",
    "name": "Bienes de Uso",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -3430.3499999999995,
        "realized": 0
      },
      "produto": {
        "planned": -3480.74,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -6911.089999999999,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-342",
    "row": 342,
    "code": "31.1.2",
    "name": "Muebles y Utiles",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -5000,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -5000,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-343",
    "row": 343,
    "code": "31.1.3",
    "name": "Instalaciones",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-344",
    "row": 344,
    "code": "31.1.4",
    "name": "Maquinas y Equipos",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-345",
    "row": 345,
    "code": "31.1.5",
    "name": "Rodados",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-346",
    "row": 346,
    "code": "31.1.6",
    "name": "Mejoras em Depositos y Sucursales",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-347",
    "row": 347,
    "code": "31.1.7",
    "name": "Equipos de Computacion",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": -3347.34
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": -3347.34
      }
    }
  },
  {
    "id": "acc-348",
    "row": 348,
    "code": "31.1.8",
    "name": "Llaves de Negocio",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-349",
    "row": 349,
    "code": "31.1.9",
    "name": "Licencias de Software",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-350",
    "row": 350,
    "code": "31.1.10",
    "name": "Marcas Y Patentes",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-351",
    "row": 351,
    "code": "31.1.11",
    "name": "Matrices",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-352",
    "row": 352,
    "code": "31.1.12",
    "name": "Centro de Distribuicion",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-353",
    "row": 353,
    "code": "31.1.13",
    "name": "Arte",
    "level": 2,
    "category": "31.0 Amortizações & Depreciações",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-354",
    "row": 354,
    "code": "32.1",
    "name": "PARTIDAS MONETARIAS",
    "level": 1,
    "category": "32.0 Partidas Monetárias & Câmbio",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-355",
    "row": 355,
    "code": "32.1.1",
    "name": "Resultado por Tenencia",
    "level": 2,
    "category": "32.0 Partidas Monetárias & Câmbio",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-356",
    "row": 356,
    "code": "32.1.2",
    "name": "Diferencia de Cambio",
    "level": 2,
    "category": "32.0 Partidas Monetárias & Câmbio",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-357",
    "row": 357,
    "code": "33.1",
    "name": "OTROS INGRESOS / EGRESOS NO OPER.",
    "level": 1,
    "category": "33.0 Outros Não Operacionais",
    "isGroupHeader": true,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 20,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 20,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-358",
    "row": 358,
    "code": "33.1.1",
    "name": "Ingresos por Servicios",
    "level": 2,
    "category": "33.0 Outros Não Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 20,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 20,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-359",
    "row": 359,
    "code": "33.1.2",
    "name": "Recupero Siniestros",
    "level": 2,
    "category": "33.0 Outros Não Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-360",
    "row": 360,
    "code": "33.1.3",
    "name": "Resultado por Venta Bienes de Uso",
    "level": 2,
    "category": "33.0 Outros Não Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-361",
    "row": 361,
    "code": "33.1.4",
    "name": "Otros Ingresos",
    "level": 2,
    "category": "33.0 Outros Não Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-362",
    "row": 362,
    "code": "33.1.5",
    "name": "Venta Bienes de Uso",
    "level": 2,
    "category": "33.0 Outros Não Operacionais",
    "isGroupHeader": false,
    "isMainResult": false,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-364",
    "row": 364,
    "code": "",
    "name": "PBT - Tiendas Propias",
    "level": 0,
    "category": "Indicador / PBT",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -383973.14866666665,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": -383973.14866666665,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-365",
    "row": 365,
    "code": "",
    "name": "PBT - Venta Producto",
    "level": 0,
    "category": "Indicador / PBT",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": 0,
        "realized": 0
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  },
  {
    "id": "acc-366",
    "row": 366,
    "code": "",
    "name": "PBT - Franquicias",
    "level": 0,
    "category": "Indicador / PBT",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": 0,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": -100462.09,
        "realized": -108188.89
      },
      "consolidado": {
        "planned": -100462.09,
        "realized": -108188.89
      }
    }
  },
  {
    "id": "acc-367",
    "row": 367,
    "code": "",
    "name": "PBT",
    "level": 0,
    "category": "Indicador / PBT",
    "isGroupHeader": false,
    "isMainResult": true,
    "channels": [
      "tiendas",
      "produto",
      "franquias",
      "consolidado"
    ],
    "active": true,
    "values": {
      "tiendas": {
        "planned": -383973.14866666665,
        "realized": 0
      },
      "produto": {
        "planned": 0,
        "realized": 0
      },
      "franquias": {
        "planned": -100462.09,
        "realized": -108188.89
      },
      "consolidado": {
        "planned": 0,
        "realized": 0
      }
    }
  }
];

export const DRE_ACCOUNTS_DATA: AccountPlanItem[] = INITIAL_ACCOUNT_PLAN;

export const DRE_TRANSACTIONS_DATA: DRETransaction[] = [
  {
    "id": "tx-1",
    "row": 894,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-01",
    "supplier": "MORSE ADVOGADOS ASSOCIADOS",
    "code": "24.1.2",
    "categoryName": "Honorarios Legales",
    "type": "Débito",
    "doc": "N° 5189",
    "amount": -7038.75
  },
  {
    "id": "tx-2",
    "row": 895,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-01",
    "supplier": "BANCO ITAÚ",
    "code": "10.1.19",
    "categoryName": "Gastos Bancarios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -6.88
  },
  {
    "id": "tx-3",
    "row": 896,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "RD STATION",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N/D",
    "amount": -240
  },
  {
    "id": "tx-4",
    "row": 897,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "ANA CAROLINE SILVA COSTA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -989.6
  },
  {
    "id": "tx-5",
    "row": 898,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "BANCO ITAÚ",
    "code": "10.1.19",
    "categoryName": "Gastos Bancarios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -109.45
  },
  {
    "id": "tx-6",
    "row": 899,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "YASMIN VICTORIA ALMEIDA FERNANDES",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -381
  },
  {
    "id": "tx-7",
    "row": 900,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "B&B CONFECCOES",
    "code": "23.1.1",
    "categoryName": "Uniformes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1181.55
  },
  {
    "id": "tx-8",
    "row": 901,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "PORTOEXPRESS",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N° 8062 / A1",
    "amount": -1697.32
  },
  {
    "id": "tx-9",
    "row": 902,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "ENEL",
    "code": "6.1.4",
    "categoryName": "Electricidad",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1521.28
  },
  {
    "id": "tx-10",
    "row": 903,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "M66 CONSULTORIA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -26641.5
  },
  {
    "id": "tx-11",
    "row": 904,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -14.94
  },
  {
    "id": "tx-12",
    "row": 905,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "CAROLINY CRISTINA APARECIDA ELOI",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -267
  },
  {
    "id": "tx-13",
    "row": 906,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "ONFLY TECNOLOGIA LTDA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "Nº 2025/95514",
    "amount": -149.99
  },
  {
    "id": "tx-14",
    "row": 907,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "PORTOEXPRESS",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1875.77
  },
  {
    "id": "tx-15",
    "row": 908,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "GOL LINHAS AEREAS S.A.",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -4934.2
  },
  {
    "id": "tx-16",
    "row": 909,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "Thainara Pereira Lopes",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -254
  },
  {
    "id": "tx-17",
    "row": 910,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "YASMIN VICTORIA ALMEIDA FERNANDES",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -306
  },
  {
    "id": "tx-18",
    "row": 911,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "Mariana Vilela de Carvalho",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -381
  },
  {
    "id": "tx-19",
    "row": 912,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "ISABELE COSTA DE BARROS",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -381
  },
  {
    "id": "tx-20",
    "row": 913,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "ANA PAULA PINTO MACIEL",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 47",
    "amount": -3800
  },
  {
    "id": "tx-21",
    "row": 914,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "RM2",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -10950
  },
  {
    "id": "tx-22",
    "row": 915,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -14.25
  },
  {
    "id": "tx-23",
    "row": 916,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "CAROLINY CRISTINA APARECIDA ELOI",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -381
  },
  {
    "id": "tx-24",
    "row": 917,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "Mariana Vilela de Carvalho",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -500
  },
  {
    "id": "tx-25",
    "row": 918,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "PORTOEXPRESS",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -27035.09
  },
  {
    "id": "tx-26",
    "row": 919,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "Thainara Pereira Lopes",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -230
  },
  {
    "id": "tx-27",
    "row": 920,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -17.6
  },
  {
    "id": "tx-28",
    "row": 921,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "GERCY / VF IMAGEM",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "N° 189",
    "amount": -730
  },
  {
    "id": "tx-29",
    "row": 922,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -4.76
  },
  {
    "id": "tx-30",
    "row": 923,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "B&B CONFECCOES",
    "code": "23.1.1",
    "categoryName": "Uniformes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -12041.7
  },
  {
    "id": "tx-31",
    "row": 924,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "VIP-SYSTEMS TECNOLOGIA & INOVACAO",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 029370",
    "amount": -3012.3
  },
  {
    "id": "tx-32",
    "row": 925,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-01",
    "supplier": "ISABELE COSTA DE BARROS",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -150
  },
  {
    "id": "tx-33",
    "row": 926,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-03",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -18.48
  },
  {
    "id": "tx-34",
    "row": 927,
    "entity": "BLUE STAR BRASIL PARTICIPACOES LTDA.",
    "date": "2025-12-04",
    "supplier": "M66 CONSULTORIA & SERVICOS LTDA",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-35",
    "row": 928,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Vecchi Assessoria Contábil",
    "code": "13.1.1",
    "categoryName": "Honorarios Contabilidad",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -5000
  },
  {
    "id": "tx-36",
    "row": 929,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6534",
    "amount": -264.87
  },
  {
    "id": "tx-37",
    "row": 930,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6542",
    "amount": -56.95
  },
  {
    "id": "tx-38",
    "row": 931,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6547",
    "amount": -57.75
  },
  {
    "id": "tx-39",
    "row": 932,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "6554",
    "amount": -67
  },
  {
    "id": "tx-40",
    "row": 933,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6555",
    "amount": -221.14
  },
  {
    "id": "tx-41",
    "row": 934,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "3.1.10",
    "categoryName": "Agua, Electricidad e Internet",
    "type": "Débito",
    "doc": "6557",
    "amount": -134.82
  },
  {
    "id": "tx-42",
    "row": 935,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6535",
    "amount": -11
  },
  {
    "id": "tx-43",
    "row": 936,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6544",
    "amount": -478.56
  },
  {
    "id": "tx-44",
    "row": 937,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6546",
    "amount": -118.5
  },
  {
    "id": "tx-45",
    "row": 938,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "3.1.10",
    "categoryName": "Agua, Electricidad e Internet",
    "type": "Débito",
    "doc": "6558",
    "amount": -134.9
  },
  {
    "id": "tx-46",
    "row": 939,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6534",
    "amount": -11
  },
  {
    "id": "tx-47",
    "row": 940,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "DRX MULTI SERVICOS LOGISTICOS",
    "code": "3.1.9",
    "categoryName": "Equipo de Backoffice",
    "type": "Débito",
    "doc": "N° 236 / A1",
    "amount": -11250
  },
  {
    "id": "tx-48",
    "row": 941,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "STEPHANIE GOMES MONTEIRO SANTIAGO",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -10643.25
  },
  {
    "id": "tx-49",
    "row": 942,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6540",
    "amount": -67
  },
  {
    "id": "tx-50",
    "row": 943,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6549",
    "amount": -95.7
  },
  {
    "id": "tx-51",
    "row": 944,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "M66 CONSULTORIA & SERVICOS LTDA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1670.63
  },
  {
    "id": "tx-52",
    "row": 945,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.7",
    "categoryName": "Viaticos en el Pais",
    "type": "Débito",
    "doc": "6539",
    "amount": -54.36
  },
  {
    "id": "tx-53",
    "row": 946,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "LEG FINANCAS LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1186.28
  },
  {
    "id": "tx-54",
    "row": 947,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "6536",
    "amount": -56.5
  },
  {
    "id": "tx-55",
    "row": 948,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.7",
    "categoryName": "Viaticos en el Pais",
    "type": "Débito",
    "doc": "6537",
    "amount": -48.15
  },
  {
    "id": "tx-56",
    "row": 949,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "RMM SERVIÇOS ADMINISTRATIVOS LTDA",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1508.49
  },
  {
    "id": "tx-57",
    "row": 950,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "DRX MULTI SERVICOS LOGISTICOS",
    "code": "3.1.9",
    "categoryName": "Equipo de Backoffice",
    "type": "Débito",
    "doc": "N° 236 / A1",
    "amount": -11250
  },
  {
    "id": "tx-58",
    "row": 951,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6550",
    "amount": -93.8
  },
  {
    "id": "tx-59",
    "row": 952,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6535",
    "amount": -41.7
  },
  {
    "id": "tx-60",
    "row": 953,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6541",
    "amount": -184.22
  },
  {
    "id": "tx-61",
    "row": 954,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6551",
    "amount": -138.42
  },
  {
    "id": "tx-62",
    "row": 955,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "STEPHANIE GOMES MONTEIRO SANTIAGO",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1064.325
  },
  {
    "id": "tx-63",
    "row": 956,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "6553",
    "amount": -405.82
  },
  {
    "id": "tx-64",
    "row": 957,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "DLOCAL SERV DE FACEBOOK E SERV ON LINE BRASIL LTDA",
    "code": "23.1.4",
    "categoryName": "Publicidad",
    "type": "Débito",
    "doc": "N/D",
    "amount": -7000
  },
  {
    "id": "tx-65",
    "row": 958,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6556",
    "amount": -84.41
  },
  {
    "id": "tx-66",
    "row": 959,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6532",
    "amount": -11
  },
  {
    "id": "tx-67",
    "row": 960,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6533",
    "amount": -11
  },
  {
    "id": "tx-68",
    "row": 961,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "RMM SERVIÇOS ADMINISTRATIVOS LTDA",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N° 232",
    "amount": -25705
  },
  {
    "id": "tx-69",
    "row": 962,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Vecchi Assessoria Contábil",
    "code": "13.1.1",
    "categoryName": "Honorarios Contabilidad",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -5000
  },
  {
    "id": "tx-70",
    "row": 963,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "M66 CONSULTORIA & SERVICOS LTDA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1170
  },
  {
    "id": "tx-71",
    "row": 964,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "6543",
    "amount": -233.28
  },
  {
    "id": "tx-72",
    "row": 965,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "STEPHANIE GOMES MONTEIRO SANTIAGO",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -10643.25
  },
  {
    "id": "tx-73",
    "row": 966,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "STEPHANIE GOMES MONTEIRO SANTIAGO",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1064.325
  },
  {
    "id": "tx-74",
    "row": 967,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6532",
    "amount": -36.7
  },
  {
    "id": "tx-75",
    "row": 968,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.7",
    "categoryName": "Viaticos en el Pais",
    "type": "Débito",
    "doc": "6538",
    "amount": -51.5
  },
  {
    "id": "tx-76",
    "row": 969,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6545",
    "amount": -132.5
  },
  {
    "id": "tx-77",
    "row": 970,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "6552",
    "amount": -319.9
  },
  {
    "id": "tx-78",
    "row": 971,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6548",
    "amount": -52.94
  },
  {
    "id": "tx-79",
    "row": 972,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "RMM SERVIÇOS ADMINISTRATIVOS LTDA",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N° 233",
    "amount": -5000
  },
  {
    "id": "tx-80",
    "row": 973,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "6533",
    "amount": -104.5
  },
  {
    "id": "tx-81",
    "row": 974,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6538",
    "amount": -11
  },
  {
    "id": "tx-82",
    "row": 975,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6537",
    "amount": -11
  },
  {
    "id": "tx-83",
    "row": 976,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6543",
    "amount": -11
  },
  {
    "id": "tx-84",
    "row": 977,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6547",
    "amount": -11
  },
  {
    "id": "tx-85",
    "row": 978,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "BANCO ITAÚ",
    "code": "10.1.19",
    "categoryName": "Gastos Bancarios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -6.88
  },
  {
    "id": "tx-86",
    "row": 979,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6542",
    "amount": -11
  },
  {
    "id": "tx-87",
    "row": 980,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6545",
    "amount": -11
  },
  {
    "id": "tx-88",
    "row": 981,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6549",
    "amount": -11
  },
  {
    "id": "tx-89",
    "row": 982,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6541",
    "amount": -11
  },
  {
    "id": "tx-90",
    "row": 983,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6546",
    "amount": -11
  },
  {
    "id": "tx-91",
    "row": 984,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6544",
    "amount": -11
  },
  {
    "id": "tx-92",
    "row": 985,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6550",
    "amount": -11
  },
  {
    "id": "tx-93",
    "row": 986,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "RMM SERVIÇOS ADMINISTRATIVOS LTDA",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1508.49
  },
  {
    "id": "tx-94",
    "row": 987,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6539",
    "amount": -11
  },
  {
    "id": "tx-95",
    "row": 988,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6540",
    "amount": -11
  },
  {
    "id": "tx-96",
    "row": 989,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6551",
    "amount": -11
  },
  {
    "id": "tx-97",
    "row": 990,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6548",
    "amount": -11
  },
  {
    "id": "tx-98",
    "row": 991,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "6536",
    "amount": -11
  },
  {
    "id": "tx-99",
    "row": 992,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3728",
    "amount": -106997.49
  },
  {
    "id": "tx-100",
    "row": 993,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "M66 CONSULTORIA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -7000
  },
  {
    "id": "tx-101",
    "row": 994,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2707",
    "amount": -8.9
  },
  {
    "id": "tx-102",
    "row": 995,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2716",
    "amount": -8.9
  },
  {
    "id": "tx-103",
    "row": 996,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "ADM SHOPPING PATIO PAULISTA",
    "code": "2.1.7",
    "categoryName": "Gastos Administrativos sobre Alquileres",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -17194.03
  },
  {
    "id": "tx-104",
    "row": 997,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "CENTER NORTE",
    "code": "6.1.4",
    "categoryName": "Electricidad",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1343.42
  },
  {
    "id": "tx-105",
    "row": 998,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2696",
    "amount": -10.2
  },
  {
    "id": "tx-106",
    "row": 999,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2713",
    "amount": -8.9
  },
  {
    "id": "tx-107",
    "row": 1000,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2731",
    "amount": -52.3
  },
  {
    "id": "tx-108",
    "row": 1001,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "ADM SHOPPING PATIO PAULISTA",
    "code": "2.1.3",
    "categoryName": "Fondo Promocion Alquileres",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -8746.14
  },
  {
    "id": "tx-109",
    "row": 1002,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "CENTER NORTE",
    "code": "2.1.7",
    "categoryName": "Gastos Administrativos sobre Alquileres",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -4839.57
  },
  {
    "id": "tx-110",
    "row": 1003,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "B&B CONFECCOES",
    "code": "23.1.1",
    "categoryName": "Uniformes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -5486.61
  },
  {
    "id": "tx-111",
    "row": 1004,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "2729",
    "amount": -45.9
  },
  {
    "id": "tx-112",
    "row": 1005,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2733",
    "amount": -72.69
  },
  {
    "id": "tx-113",
    "row": 1006,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Vecchi Assessoria Contábil",
    "code": "13.1.1",
    "categoryName": "Honorarios Contabilidad",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -27000
  },
  {
    "id": "tx-114",
    "row": 1007,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "PORTIQ IND E COM DE PROD GRAFICOS LTDA",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "Nº 4.191",
    "amount": -960.95
  },
  {
    "id": "tx-115",
    "row": 1008,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "L&BARREIROS SERVICOS",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -16500
  },
  {
    "id": "tx-116",
    "row": 1009,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2693",
    "amount": -5.2
  },
  {
    "id": "tx-117",
    "row": 1010,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2702",
    "amount": -5.2
  },
  {
    "id": "tx-118",
    "row": 1011,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "2725",
    "amount": -49.9
  },
  {
    "id": "tx-119",
    "row": 1012,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "2726",
    "amount": -46
  },
  {
    "id": "tx-120",
    "row": 1013,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2737",
    "amount": -16.53
  },
  {
    "id": "tx-121",
    "row": 1014,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "ADM SHOPPING PATIO PAULISTA",
    "code": "2.1.4",
    "categoryName": "Expensas",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1380.16
  },
  {
    "id": "tx-122",
    "row": 1015,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "BRADESCO SAUDE",
    "code": "1.1.7",
    "categoryName": "Assistência Médica / Seguro Salud",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -20501.3
  },
  {
    "id": "tx-123",
    "row": 1016,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2710",
    "amount": -17.8
  },
  {
    "id": "tx-124",
    "row": 1017,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2717",
    "amount": -8.9
  },
  {
    "id": "tx-125",
    "row": 1018,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "ADM SHOPPING PATIO PAULISTA",
    "code": "4.1.6",
    "categoryName": "Impuesto Inmobiliario",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -4239.9
  },
  {
    "id": "tx-126",
    "row": 1019,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2694",
    "amount": -5.2
  },
  {
    "id": "tx-127",
    "row": 1020,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2704",
    "amount": -5.2
  },
  {
    "id": "tx-128",
    "row": 1021,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2711",
    "amount": -8.9
  },
  {
    "id": "tx-129",
    "row": 1022,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2719",
    "amount": -8.9
  },
  {
    "id": "tx-130",
    "row": 1023,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "2727",
    "amount": -47.9
  },
  {
    "id": "tx-131",
    "row": 1024,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "ADM SHOPPING PATIO PAULISTA",
    "code": "2.1.1",
    "categoryName": "Alquileres",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -72884.46
  },
  {
    "id": "tx-132",
    "row": 1025,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "VITORIA VIVIANE MOREIRA DE SOUZA",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -200
  },
  {
    "id": "tx-133",
    "row": 1026,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2700",
    "amount": -5.2
  },
  {
    "id": "tx-134",
    "row": 1027,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2703",
    "amount": -5.2
  },
  {
    "id": "tx-135",
    "row": 1028,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2718",
    "amount": -8.9
  },
  {
    "id": "tx-136",
    "row": 1029,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2723",
    "amount": -52.3
  },
  {
    "id": "tx-137",
    "row": 1030,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "28.1.5",
    "categoryName": "Refrigerios",
    "type": "Débito",
    "doc": "2728",
    "amount": -25.8
  },
  {
    "id": "tx-138",
    "row": 1031,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "CENTER NORTE",
    "code": "4.1.6",
    "categoryName": "Impuesto Inmobiliario",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -662.95
  },
  {
    "id": "tx-139",
    "row": 1032,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "HSTONE COMERCIO E INSTALACAO DE MOVEIS LTDA",
    "code": "10.1.2",
    "categoryName": "Alquiler de Maquinas y Equipos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -997.11
  },
  {
    "id": "tx-140",
    "row": 1033,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2695",
    "amount": -5.2
  },
  {
    "id": "tx-141",
    "row": 1034,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2708",
    "amount": -8.9
  },
  {
    "id": "tx-142",
    "row": 1035,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -46.8
  },
  {
    "id": "tx-143",
    "row": 1036,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "2721",
    "amount": -21.9
  },
  {
    "id": "tx-144",
    "row": 1037,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2730",
    "amount": -52.3
  },
  {
    "id": "tx-145",
    "row": 1038,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -14.25
  },
  {
    "id": "tx-146",
    "row": 1039,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "CENTER NORTE",
    "code": "2.1.3",
    "categoryName": "Fondo Promocion Alquileres",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -2858.8
  },
  {
    "id": "tx-147",
    "row": 1040,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "ADM SHOPPING PATIO PAULISTA",
    "code": "6.1.4",
    "categoryName": "Electricidad",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1891.78
  },
  {
    "id": "tx-148",
    "row": 1041,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "GRS+NUCLEO",
    "code": "20.1.18",
    "categoryName": "Medicina del Trabajo",
    "type": "Débito",
    "doc": "N° 40962",
    "amount": -853.26
  },
  {
    "id": "tx-149",
    "row": 1042,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "EDUARDA PEREIRA NANTES",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -97.5
  },
  {
    "id": "tx-150",
    "row": 1043,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2697",
    "amount": -5.2
  },
  {
    "id": "tx-151",
    "row": 1044,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2699",
    "amount": -5.2
  },
  {
    "id": "tx-152",
    "row": 1045,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2722",
    "amount": -52.3
  },
  {
    "id": "tx-153",
    "row": 1046,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "ITS FACILITIES LTDA",
    "code": "3.1.8",
    "categoryName": "Mano de Obra AZ",
    "type": "Débito",
    "doc": "N° 690 / A1",
    "amount": -2521.85
  },
  {
    "id": "tx-154",
    "row": 1047,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "MONICA CRISTINA BUZZACHERA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 33",
    "amount": -1500
  },
  {
    "id": "tx-155",
    "row": 1048,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "PLUXEE BENEFICIOS BRASIL S/A (SODEXO)",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -609.6
  },
  {
    "id": "tx-156",
    "row": 1049,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "TRANSPORTES ADRE LTDA",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -168.76
  },
  {
    "id": "tx-157",
    "row": 1050,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2705",
    "amount": -5.2
  },
  {
    "id": "tx-158",
    "row": 1051,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2720",
    "amount": -8.9
  },
  {
    "id": "tx-159",
    "row": 1052,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "2724",
    "amount": -53.8
  },
  {
    "id": "tx-160",
    "row": 1053,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2734",
    "amount": -58.94
  },
  {
    "id": "tx-161",
    "row": 1054,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2735",
    "amount": -31.45
  },
  {
    "id": "tx-162",
    "row": 1055,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "DRX MULTI SERVICOS LOGISTICOS EIRELI",
    "code": "3.1.9",
    "categoryName": "Equipo de Backoffice",
    "type": "Débito",
    "doc": "N° 238 / A1",
    "amount": -1000
  },
  {
    "id": "tx-163",
    "row": 1056,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "WORLDPEL COMERCIO DE EMBALAGENS LTDA",
    "code": "9.1.1",
    "categoryName": "Packaging Clientes / Embalaje (Sacola)",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -16758
  },
  {
    "id": "tx-164",
    "row": 1057,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "M66 CONSULTORIA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -4000
  },
  {
    "id": "tx-165",
    "row": 1058,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2706",
    "amount": -5.2
  },
  {
    "id": "tx-166",
    "row": 1059,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2714",
    "amount": -8.9
  },
  {
    "id": "tx-167",
    "row": 1060,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "2732",
    "amount": -37.8
  },
  {
    "id": "tx-168",
    "row": 1061,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2736",
    "amount": -46.49
  },
  {
    "id": "tx-169",
    "row": 1062,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "CENTER NORTE",
    "code": "3.1.1",
    "categoryName": "Alquileres",
    "type": "Débito",
    "doc": "N/D",
    "amount": -28588.01
  },
  {
    "id": "tx-170",
    "row": 1063,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "M66 CONSULTORIA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -10841.26
  },
  {
    "id": "tx-171",
    "row": 1064,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3729",
    "amount": -40326.4
  },
  {
    "id": "tx-172",
    "row": 1065,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3741",
    "amount": -42643.43
  },
  {
    "id": "tx-173",
    "row": 1066,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Vecchi Assessoria Contábil",
    "code": "13.1.1",
    "categoryName": "Honorarios Contabilidad",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -27000
  },
  {
    "id": "tx-174",
    "row": 1067,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "CRISTINA MELLO",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -35000
  },
  {
    "id": "tx-175",
    "row": 1068,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2715",
    "amount": -8.9
  },
  {
    "id": "tx-176",
    "row": 1069,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "ADM SHOPPING PATIO PAULISTA",
    "code": "2.1.3",
    "categoryName": "Fondo Promocion Alquileres",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -4373.07
  },
  {
    "id": "tx-177",
    "row": 1070,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "DRX MULTI SERVICOS LOGISTICOS EIRELI",
    "code": "3.1.9",
    "categoryName": "Equipo de Backoffice",
    "type": "Débito",
    "doc": "N° 237 / A1",
    "amount": -11500
  },
  {
    "id": "tx-178",
    "row": 1071,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "VITORIA VIVIANE MOREIRA DE SOUZA",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -245
  },
  {
    "id": "tx-179",
    "row": 1072,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2698",
    "amount": -5.2
  },
  {
    "id": "tx-180",
    "row": 1073,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2701",
    "amount": -5.2
  },
  {
    "id": "tx-181",
    "row": 1074,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2709",
    "amount": -8.9
  },
  {
    "id": "tx-182",
    "row": 1075,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-04",
    "supplier": "Fornecedores Diversos",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "2712",
    "amount": -8.9
  },
  {
    "id": "tx-183",
    "row": 1076,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-05",
    "supplier": "BANCO ITAÚ",
    "code": "10.1.19",
    "categoryName": "Gastos Bancarios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1.4
  },
  {
    "id": "tx-184",
    "row": 1077,
    "entity": "BLUE STAR BRASIL PARTICIPACOES LTDA.",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -99
  },
  {
    "id": "tx-185",
    "row": 1078,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 03223677",
    "amount": -569
  },
  {
    "id": "tx-186",
    "row": 1079,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-08",
    "supplier": "SECRETARIA DO GOVERNO MUNICIPAL",
    "code": "4.1.5",
    "categoryName": "Contribuicion por Toldos",
    "type": "Crédito",
    "doc": "NOV/2025",
    "amount": -3169.53
  },
  {
    "id": "tx-187",
    "row": 1080,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 2907538",
    "amount": -101.8
  },
  {
    "id": "tx-188",
    "row": 1081,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3778",
    "amount": -148930.76
  },
  {
    "id": "tx-189",
    "row": 1082,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 03200693",
    "amount": -101.8
  },
  {
    "id": "tx-190",
    "row": 1083,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3750",
    "amount": -26586.4
  },
  {
    "id": "tx-191",
    "row": 1084,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "B3 BRINDES PROMOCIONAIS LTDA",
    "code": "9.1.1",
    "categoryName": "Packaging Clientes / Embalaje (Sacola)",
    "type": "Crédito",
    "doc": "Nº 000.001.182",
    "amount": -4069.25
  },
  {
    "id": "tx-192",
    "row": 1085,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "FOFY COMERCIO IMPORTACAO E EXPORTACAO LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "Nº 000.003.199",
    "amount": -15736
  },
  {
    "id": "tx-193",
    "row": 1086,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "AGENCIA E-PLUS LTDA",
    "code": "23.1.4",
    "categoryName": "Publicidad",
    "type": "Débito",
    "doc": "N° 1375",
    "amount": -3888.63
  },
  {
    "id": "tx-194",
    "row": 1087,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 03187816",
    "amount": -2989
  },
  {
    "id": "tx-195",
    "row": 1088,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 03200126",
    "amount": -101.8
  },
  {
    "id": "tx-196",
    "row": 1089,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 03200538",
    "amount": -101.8
  },
  {
    "id": "tx-197",
    "row": 1090,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "MAIA-LOG LOGISTICA LTDA",
    "code": "26.1.8",
    "categoryName": "Servicios de Mantenimiento General y Reparaciones",
    "type": "Débito",
    "doc": "N° 2810",
    "amount": -740
  },
  {
    "id": "tx-198",
    "row": 1091,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 03200239",
    "amount": -1249
  },
  {
    "id": "tx-199",
    "row": 1092,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "CLEAR SALE S.A.",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N/D",
    "amount": -317.82
  },
  {
    "id": "tx-200",
    "row": 1093,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "AGENCIA E-PLUS LTDA",
    "code": "23.1.4",
    "categoryName": "Publicidad",
    "type": "Débito",
    "doc": "N° 1372",
    "amount": -2382.29
  },
  {
    "id": "tx-201",
    "row": 1094,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 03201193",
    "amount": -101.8
  },
  {
    "id": "tx-202",
    "row": 1095,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "CLEAR SALE S.A.",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N/D",
    "amount": -194.8
  },
  {
    "id": "tx-203",
    "row": 1096,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "PAPERSUL MAT ESCR E LIMPEZA LTDA",
    "code": "27.1.36",
    "categoryName": "Papeleria, Librería y Utiles",
    "type": "Débito",
    "doc": "Nº 136794",
    "amount": -102
  },
  {
    "id": "tx-204",
    "row": 1097,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "PORTOVIG SERVIÇOS DE SEGURANÇA E VIGILÂNCIA LTDA",
    "code": "27.1.41",
    "categoryName": "Seguridad y Vigilancia",
    "type": "Débito",
    "doc": "32686",
    "amount": -773.35
  },
  {
    "id": "tx-205",
    "row": 1098,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "AGENCIA E-PLUS LTDA",
    "code": "23.1.4",
    "categoryName": "Publicidad",
    "type": "Débito",
    "doc": "N° 1384",
    "amount": -3215.3
  },
  {
    "id": "tx-206",
    "row": 1099,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "OMIEXPERIENCE LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 03201311",
    "amount": -101.8
  },
  {
    "id": "tx-207",
    "row": 1100,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2451",
    "amount": -30.27
  },
  {
    "id": "tx-208",
    "row": 1101,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2425",
    "amount": -714.05
  },
  {
    "id": "tx-209",
    "row": 1102,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "2429",
    "amount": -871.27
  },
  {
    "id": "tx-210",
    "row": 1103,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2463",
    "amount": -732.47
  },
  {
    "id": "tx-211",
    "row": 1104,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "23162",
    "amount": -12.33
  },
  {
    "id": "tx-212",
    "row": 1105,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2420",
    "amount": -200
  },
  {
    "id": "tx-213",
    "row": 1106,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2427",
    "amount": -200
  },
  {
    "id": "tx-214",
    "row": 1107,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2449",
    "amount": -535
  },
  {
    "id": "tx-215",
    "row": 1108,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2454",
    "amount": -61.86
  },
  {
    "id": "tx-216",
    "row": 1109,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2458",
    "amount": -495.85
  },
  {
    "id": "tx-217",
    "row": 1110,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2461",
    "amount": -62.05
  },
  {
    "id": "tx-218",
    "row": 1111,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2464",
    "amount": -1913.96
  },
  {
    "id": "tx-219",
    "row": 1112,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2428",
    "amount": -140.55
  },
  {
    "id": "tx-220",
    "row": 1113,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2448",
    "amount": -154.74
  },
  {
    "id": "tx-221",
    "row": 1114,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2450",
    "amount": -14.47
  },
  {
    "id": "tx-222",
    "row": 1115,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2421",
    "amount": -453.12
  },
  {
    "id": "tx-223",
    "row": 1116,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2424",
    "amount": -303.38
  },
  {
    "id": "tx-224",
    "row": 1117,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2438",
    "amount": -740.04
  },
  {
    "id": "tx-225",
    "row": 1118,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2443",
    "amount": -830
  },
  {
    "id": "tx-226",
    "row": 1119,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2467",
    "amount": -4519.96
  },
  {
    "id": "tx-227",
    "row": 1120,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.8",
    "categoryName": "Servicios de Mantenimiento General y Reparaciones",
    "type": "Débito",
    "doc": "2418",
    "amount": -4833.34
  },
  {
    "id": "tx-228",
    "row": 1121,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2431",
    "amount": -200
  },
  {
    "id": "tx-229",
    "row": 1122,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "GISLAINE DO VALLE LOPES",
    "code": "20.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Débito",
    "doc": "N/D",
    "amount": -381
  },
  {
    "id": "tx-230",
    "row": 1123,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2419",
    "amount": -754.21
  },
  {
    "id": "tx-231",
    "row": 1124,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2433",
    "amount": -1198.46
  },
  {
    "id": "tx-232",
    "row": 1125,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2439",
    "amount": -139.5
  },
  {
    "id": "tx-233",
    "row": 1126,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2444",
    "amount": -488.81
  },
  {
    "id": "tx-234",
    "row": 1127,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2452",
    "amount": -15.9
  },
  {
    "id": "tx-235",
    "row": 1128,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2457",
    "amount": -148.38
  },
  {
    "id": "tx-236",
    "row": 1129,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "GISLAINE DO VALLE LOPES",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -175
  },
  {
    "id": "tx-237",
    "row": 1130,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "DELMAX PAPELAO E EMBALAGENS LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -6000
  },
  {
    "id": "tx-238",
    "row": 1131,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2422",
    "amount": -223.84
  },
  {
    "id": "tx-239",
    "row": 1132,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2423",
    "amount": -487.84
  },
  {
    "id": "tx-240",
    "row": 1133,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2434",
    "amount": -573.51
  },
  {
    "id": "tx-241",
    "row": 1134,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2445",
    "amount": -15.92
  },
  {
    "id": "tx-242",
    "row": 1135,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2447",
    "amount": -526.52
  },
  {
    "id": "tx-243",
    "row": 1136,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2466",
    "amount": -2539.98
  },
  {
    "id": "tx-244",
    "row": 1137,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2442",
    "amount": -38.84
  },
  {
    "id": "tx-245",
    "row": 1138,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2455",
    "amount": -19.96
  },
  {
    "id": "tx-246",
    "row": 1139,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2446",
    "amount": -65.57
  },
  {
    "id": "tx-247",
    "row": 1140,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2460",
    "amount": -200
  },
  {
    "id": "tx-248",
    "row": 1141,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2465",
    "amount": -2204.4
  },
  {
    "id": "tx-249",
    "row": 1142,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2472",
    "amount": -265.58
  },
  {
    "id": "tx-250",
    "row": 1143,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2426",
    "amount": -727.08
  },
  {
    "id": "tx-251",
    "row": 1144,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2430",
    "amount": -927.86
  },
  {
    "id": "tx-252",
    "row": 1145,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2432",
    "amount": -2748.12
  },
  {
    "id": "tx-253",
    "row": 1146,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2437",
    "amount": -568.99
  },
  {
    "id": "tx-254",
    "row": 1147,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2441",
    "amount": -186.24
  },
  {
    "id": "tx-255",
    "row": 1148,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2453",
    "amount": -951.15
  },
  {
    "id": "tx-256",
    "row": 1149,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2459",
    "amount": -14.95
  },
  {
    "id": "tx-257",
    "row": 1150,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2462",
    "amount": -840.35
  },
  {
    "id": "tx-258",
    "row": 1151,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2435",
    "amount": -430.72
  },
  {
    "id": "tx-259",
    "row": 1152,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2456",
    "amount": -24.28
  },
  {
    "id": "tx-260",
    "row": 1153,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2436",
    "amount": -720
  },
  {
    "id": "tx-261",
    "row": 1154,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "2440",
    "amount": -597
  },
  {
    "id": "tx-262",
    "row": 1155,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "ITAUCARD FINANCEIRA",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "2471",
    "amount": -952.76
  },
  {
    "id": "tx-263",
    "row": 1156,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-08",
    "supplier": "EDLANE DA SILVA AMANSIO",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2754.36
  },
  {
    "id": "tx-264",
    "row": 1157,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-09",
    "supplier": "I.B.A.C. INDUSTRIA BRASILEIRA DE ALIMENTOS E CHOCOLATES LTDA.",
    "code": "10.1.4",
    "categoryName": "Atenciones al Personal",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3649.8
  },
  {
    "id": "tx-265",
    "row": 1158,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-09",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -12.67
  },
  {
    "id": "tx-266",
    "row": 1159,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-10",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "111612",
    "amount": -8
  },
  {
    "id": "tx-267",
    "row": 1160,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-10",
    "supplier": "DYANA MARQUES DA SILVA",
    "code": "40.1.2",
    "categoryName": "Tiendas (Devolución)",
    "type": "Débito",
    "doc": "N/D",
    "amount": -29.9
  },
  {
    "id": "tx-268",
    "row": 1161,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-11",
    "supplier": "INFORMA MARKETS LTDA.",
    "code": "10.1.19",
    "categoryName": "Gastos Bancarios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -5578.44
  },
  {
    "id": "tx-269",
    "row": 1162,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-11",
    "supplier": "INFORMA MARKETS LTDA.",
    "code": "10.1.19",
    "categoryName": "Gastos Bancarios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -7604.98
  },
  {
    "id": "tx-270",
    "row": 1163,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "VENDA VALIDA TECNOLOGIA LTDA",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N° 3551",
    "amount": -294.72
  },
  {
    "id": "tx-271",
    "row": 1164,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "ABF - ASSOCIACAO BRASILEIRA DE FRANCHISING",
    "code": "25.1.3",
    "categoryName": "Diarios, Revistas y Suscripciones",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1574
  },
  {
    "id": "tx-272",
    "row": 1165,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "M A JIN NON - INSTALACAO MANUT ELETRICA",
    "code": "26.1.8",
    "categoryName": "Servicios de Mantenimiento General y Reparaciones",
    "type": "Débito",
    "doc": "N° 00000617",
    "amount": -300
  },
  {
    "id": "tx-273",
    "row": 1166,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "ITALINE",
    "code": "25.1.7",
    "categoryName": "Servicio de Internet",
    "type": "Débito",
    "doc": "N/D",
    "amount": -784.61
  },
  {
    "id": "tx-274",
    "row": 1167,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "STRAPET EMBALAGENS LTDA",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "Nº  17267",
    "amount": -2129.62
  },
  {
    "id": "tx-275",
    "row": 1168,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "M A JIN NON - INSTALACAO MANUT ELETRICA",
    "code": "26.1.8",
    "categoryName": "Servicios de Mantenimiento General y Reparaciones",
    "type": "Débito",
    "doc": "N° 00000615",
    "amount": -300
  },
  {
    "id": "tx-276",
    "row": 1169,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "PORTOEX SP LOGISTICA LTDA",
    "code": "2.1.1",
    "categoryName": "Alquileres",
    "type": "Crédito",
    "doc": "N° 20",
    "amount": -5950
  },
  {
    "id": "tx-277",
    "row": 1170,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "PORTOEX SP LOGISTICA LTDA",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -5402.87
  },
  {
    "id": "tx-278",
    "row": 1171,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "AGISET COMERCIO E DISTRIBUIDORA DE EMBALAGENS LTDA",
    "code": "9.1.1",
    "categoryName": "Packaging Clientes / Embalaje (Sacola)",
    "type": "Crédito",
    "doc": "N° 632",
    "amount": -18582.66
  },
  {
    "id": "tx-279",
    "row": 1172,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3765",
    "amount": -291199.19
  },
  {
    "id": "tx-280",
    "row": 1173,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "GOOGLE BRASIL INTERNET LTDA.",
    "code": "23.1.4",
    "categoryName": "Publicidad",
    "type": "Débito",
    "doc": "N/D",
    "amount": -7270
  },
  {
    "id": "tx-281",
    "row": 1174,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "TRANSPORTES ADRE LTDA",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "455708",
    "amount": -381.65
  },
  {
    "id": "tx-282",
    "row": 1175,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "TRANSPORTES ADRE LTDA",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "458622",
    "amount": -330.48
  },
  {
    "id": "tx-283",
    "row": 1176,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "STEPHANIE GOMES MONTEIRO SANTIAGO",
    "code": "28.1.7",
    "categoryName": "Viaticos en el Pais",
    "type": "Débito",
    "doc": "N/D",
    "amount": -15657.33
  },
  {
    "id": "tx-284",
    "row": 1177,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "B7 LOGISTICA LTDA",
    "code": "3.1.8",
    "categoryName": "Mano de Obra AZ",
    "type": "Débito",
    "doc": "370",
    "amount": -1080
  },
  {
    "id": "tx-285",
    "row": 1178,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-11",
    "supplier": "B7 LOGISTICA LTDA",
    "code": "3.1.8",
    "categoryName": "Mano de Obra AZ",
    "type": "Débito",
    "doc": "369",
    "amount": -7288.78
  },
  {
    "id": "tx-286",
    "row": 1179,
    "entity": "BLUE STAR BRASIL PARTICIPACOES LTDA.",
    "date": "2025-12-15",
    "supplier": "CLAITON MARCELINO DIAS DOS SANTOS",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -16735.71
  },
  {
    "id": "tx-287",
    "row": 1180,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-15",
    "supplier": "ROGER ALEXANDER DOMINGUES PRACIDELLI",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -780
  },
  {
    "id": "tx-288",
    "row": 1181,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-15",
    "supplier": "ROGER ALEXANDER DOMINGUES PRACIDELLI",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -780
  },
  {
    "id": "tx-289",
    "row": 1182,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-15",
    "supplier": "ANNA LUIZA LONGHI SALATINI",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1360
  },
  {
    "id": "tx-290",
    "row": 1183,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-15",
    "supplier": "ANNA LUIZA LONGHI SALATINI",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1360
  },
  {
    "id": "tx-291",
    "row": 1184,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-15",
    "supplier": "ADRIANO ALBERTO N MAGALHAES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -23760
  },
  {
    "id": "tx-292",
    "row": 1185,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-15",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1680
  },
  {
    "id": "tx-293",
    "row": 1186,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-15",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -720
  },
  {
    "id": "tx-294",
    "row": 1187,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "DAYANE VISGUEIRA MACEDO",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1489.6
  },
  {
    "id": "tx-295",
    "row": 1188,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "TALITA MAIARA MENGISDZKI KRUEGER",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2800
  },
  {
    "id": "tx-296",
    "row": 1189,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "BETON ARME EMPREENDIMENTOS IMOBILIÁRIOS LTDA",
    "code": "3.1.1",
    "categoryName": "Alquileres",
    "type": "Débito",
    "doc": "N/D",
    "amount": -48981
  },
  {
    "id": "tx-297",
    "row": 1190,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "RANYELL ESDRAS SANTOS DE OLIVEIRA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-298",
    "row": 1191,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "JOSUELLE GOMES DA SILVA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2000
  },
  {
    "id": "tx-299",
    "row": 1192,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "DIEGO TIVERON SILVA DE OLIVEIRA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -3200
  },
  {
    "id": "tx-300",
    "row": 1193,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "NATHALIA SOARES VALVERDE",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -834
  },
  {
    "id": "tx-301",
    "row": 1194,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "PAMELA RIBEIRO DA SILVA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -904.4
  },
  {
    "id": "tx-302",
    "row": 1195,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "Thainara Pereira Lopes",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -774.19
  },
  {
    "id": "tx-303",
    "row": 1196,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "BLUE NUMBERS CONSULTORIA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "4110",
    "amount": -23200
  },
  {
    "id": "tx-304",
    "row": 1197,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "GABRYEL RONY LIMA RAMOS",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-305",
    "row": 1198,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "JENNIFER ESPINDOLA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-306",
    "row": 1199,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "DEBORA FARIAS DA SILVA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1402.44
  },
  {
    "id": "tx-307",
    "row": 1200,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "EDLANE DA SILVA AMANSIO",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -3200
  },
  {
    "id": "tx-308",
    "row": 1201,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "IRIS CAROLINA RODRIGUES DE ALMEIDA C",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1653.26
  },
  {
    "id": "tx-309",
    "row": 1202,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "JANAINA CICERA DA SILVA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -912
  },
  {
    "id": "tx-310",
    "row": 1203,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "KETHELYN MACHADO SORMANI",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -904.4
  },
  {
    "id": "tx-311",
    "row": 1204,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "SABRINA FEITOSA MUNIZ",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-312",
    "row": 1205,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "CLEISE VALES MORAES",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-313",
    "row": 1206,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "MADILLA MILENNA DA SILVA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -834
  },
  {
    "id": "tx-314",
    "row": 1207,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "SOFTPLAN S/A (antiga Checklist)",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "1007",
    "amount": -1524.96
  },
  {
    "id": "tx-315",
    "row": 1208,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "GIOVANNA CARNEIRO AMARO NACHABE",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-316",
    "row": 1209,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "CLAUDINEIDE RAMOS DA SILVA GOMES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1160
  },
  {
    "id": "tx-317",
    "row": 1210,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "MARIA DAS CANDEIAS DA SILVA SOARES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -834
  },
  {
    "id": "tx-318",
    "row": 1211,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "KAELLE FEITOR SANTOS",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2400
  },
  {
    "id": "tx-319",
    "row": 1212,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "CELESC DISTRIBUIÇÃO S.A.",
    "code": "3.1.10",
    "categoryName": "Agua, Electricidad e Internet",
    "type": "Débito",
    "doc": "70427625",
    "amount": -1225.09
  },
  {
    "id": "tx-320",
    "row": 1213,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "JANAINA ROLDAO SILVA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -220.73
  },
  {
    "id": "tx-321",
    "row": 1214,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "ANA CAROLINE SILVA COSTA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -834
  },
  {
    "id": "tx-322",
    "row": 1215,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "PAMELA KATARIN COUTINHO MARTINS",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -904.4
  },
  {
    "id": "tx-323",
    "row": 1216,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "THAISSA WERNECK FURUKAWA FUGAZZA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -884
  },
  {
    "id": "tx-324",
    "row": 1217,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "GISELE GENEROSO",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2800
  },
  {
    "id": "tx-325",
    "row": 1218,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3777",
    "amount": -95937.29
  },
  {
    "id": "tx-326",
    "row": 1219,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "YASMIN VICTORIA ALMEIDA FERNANDES",
    "code": "20.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Débito",
    "doc": "N/D",
    "amount": -203.2
  },
  {
    "id": "tx-327",
    "row": 1220,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "DANILLO DE SOUZA REGO",
    "code": "28.1.1",
    "categoryName": "Gastos de Representacion",
    "type": "Débito",
    "doc": "N/D",
    "amount": -16897.5
  },
  {
    "id": "tx-328",
    "row": 1221,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -15.36
  },
  {
    "id": "tx-329",
    "row": 1222,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "CAROLINY CRISTINA APARECIDA ELOI",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -89
  },
  {
    "id": "tx-330",
    "row": 1223,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "ISABELE COSTA DE BARROS",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-331",
    "row": 1224,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "CAROLINY CRISTINA APARECIDA ELOI",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -127
  },
  {
    "id": "tx-332",
    "row": 1225,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "GOL LINHAS AEREAS S.A.",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -8638.75
  },
  {
    "id": "tx-333",
    "row": 1226,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "INMETRO",
    "code": "10.1.33",
    "categoryName": "Multas en General",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -10752
  },
  {
    "id": "tx-334",
    "row": 1227,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "DE GOEYE ADVOGADOS ASSOCIADOS",
    "code": "24.1.2",
    "categoryName": "Honorarios Legales",
    "type": "Débito",
    "doc": "7274",
    "amount": -5997.97
  },
  {
    "id": "tx-335",
    "row": 1228,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "YASMIN VICTORIA ALMEIDA FERNANDES",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -163.2
  },
  {
    "id": "tx-336",
    "row": 1229,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "SAN TELMO GASTROBAR LTDA",
    "code": "10.1.4",
    "categoryName": "Atenciones al Personal",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3600
  },
  {
    "id": "tx-337",
    "row": 1230,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "CAROLINY CRISTINA APARECIDA ELOI",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-338",
    "row": 1231,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "ISABELE COSTA DE BARROS",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -254
  },
  {
    "id": "tx-339",
    "row": 1232,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "VITORIA VIVIANE MOREIRA DE SOUZA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -722.58
  },
  {
    "id": "tx-340",
    "row": 1233,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "YASMIN VICTORIA ALMEIDA FERNANDES",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -800
  },
  {
    "id": "tx-341",
    "row": 1234,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "ELIZABETH PRISCILA BARBOSA BARROS",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2400
  },
  {
    "id": "tx-342",
    "row": 1235,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "NATHALIE PEDROZA ALVES GOMES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1400
  },
  {
    "id": "tx-343",
    "row": 1236,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-15",
    "supplier": "ISABELE COSTA DE BARROS",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -100
  },
  {
    "id": "tx-344",
    "row": 1237,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 388",
    "amount": -395
  },
  {
    "id": "tx-345",
    "row": 1238,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 383",
    "amount": -1770
  },
  {
    "id": "tx-346",
    "row": 1239,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 384",
    "amount": -959.8
  },
  {
    "id": "tx-347",
    "row": 1240,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 385",
    "amount": -150
  },
  {
    "id": "tx-348",
    "row": 1241,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 389",
    "amount": -2065
  },
  {
    "id": "tx-349",
    "row": 1242,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 390",
    "amount": -180
  },
  {
    "id": "tx-350",
    "row": 1243,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "MORSE ADVOGADOS ASSOCIADOS",
    "code": "24.1.2",
    "categoryName": "Honorarios Legales",
    "type": "Débito",
    "doc": "N° 5221",
    "amount": -7038.75
  },
  {
    "id": "tx-351",
    "row": 1244,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 386",
    "amount": -6998.6
  },
  {
    "id": "tx-352",
    "row": 1245,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "ALMACOR SOLUCOES EM IMPRESSOES E EDITORA LTDA.",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "Nº 000.001.177",
    "amount": -1930
  },
  {
    "id": "tx-353",
    "row": 1246,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 391",
    "amount": -945
  },
  {
    "id": "tx-354",
    "row": 1247,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 387",
    "amount": -2879.7
  },
  {
    "id": "tx-355",
    "row": 1248,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-18",
    "supplier": "GESTEIN DIGITAL",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 392",
    "amount": -1919.8
  },
  {
    "id": "tx-356",
    "row": 1249,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "B&B CONFECCOES",
    "code": "23.1.1",
    "categoryName": "Uniformes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -12041.7
  },
  {
    "id": "tx-357",
    "row": 1250,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "PORTOEX SP LOGISTICA LTDA",
    "code": "2.1.1",
    "categoryName": "Alquileres",
    "type": "Crédito",
    "doc": "29",
    "amount": -5950
  },
  {
    "id": "tx-358",
    "row": 1251,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "RONCHI E RONCHI LTDA",
    "code": "7.1.6",
    "categoryName": "Otros Materiales",
    "type": "Crédito",
    "doc": "7949",
    "amount": -1830.57
  },
  {
    "id": "tx-359",
    "row": 1252,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "SMART2C",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -5083.2
  },
  {
    "id": "tx-360",
    "row": 1253,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3743",
    "amount": -29870.17
  },
  {
    "id": "tx-361",
    "row": 1254,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "WORLDPEL COMERCIO DE EMBALAGENS LTDA",
    "code": "9.1.1",
    "categoryName": "Packaging Clientes / Embalaje (Sacola)",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -16758
  },
  {
    "id": "tx-362",
    "row": 1255,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BRA-3759",
    "amount": -94644.06
  },
  {
    "id": "tx-363",
    "row": 1256,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "F. A. DA SILVA AR CONDICIONADO",
    "code": "7.1.8",
    "categoryName": "Servicios de Mantenimiento General y Reparaciones",
    "type": "Crédito",
    "doc": "N° 1231",
    "amount": -440
  },
  {
    "id": "tx-364",
    "row": 1257,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "PORTO SEGURO",
    "code": "10.1.42",
    "categoryName": "Seguros",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -8057.81
  },
  {
    "id": "tx-365",
    "row": 1258,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "F. A. DA SILVA AR CONDICIONADO",
    "code": "7.1.8",
    "categoryName": "Servicios de Mantenimiento General y Reparaciones",
    "type": "Crédito",
    "doc": "N° 1230",
    "amount": -415
  },
  {
    "id": "tx-366",
    "row": 1259,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "GESTEIN",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N° 376",
    "amount": -999.8
  },
  {
    "id": "tx-367",
    "row": 1260,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "LAIS BAUMGARTNER DO NASCIMENTO (MN INFORMATICA)",
    "code": "10.1.36",
    "categoryName": "Papeleria, Librería y Utiles",
    "type": "Crédito",
    "doc": "10621236",
    "amount": -600
  },
  {
    "id": "tx-368",
    "row": 1261,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "GESTEIN",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N° 379",
    "amount": -240
  },
  {
    "id": "tx-369",
    "row": 1262,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -5.27
  },
  {
    "id": "tx-370",
    "row": 1263,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "TILIBRA",
    "code": "27.1.36",
    "categoryName": "Papeleria, Librería y Utiles",
    "type": "Débito",
    "doc": "1497202",
    "amount": -3945.94
  },
  {
    "id": "tx-371",
    "row": 1264,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "GESTEIN",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N° 382",
    "amount": -959.8
  },
  {
    "id": "tx-372",
    "row": 1265,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "STARTLOG TRANSPORTES AEREO",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N° 2366",
    "amount": -3580
  },
  {
    "id": "tx-373",
    "row": 1266,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "PLUXEE BENEFICIOS BRASIL S/A (SODEXO)",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -22
  },
  {
    "id": "tx-374",
    "row": 1267,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "ALMACOR SOLUCOES EM IMPRESSOES E EDITORA LTDA.",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "Nº 000.001.178",
    "amount": -4728
  },
  {
    "id": "tx-375",
    "row": 1268,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "IMAX TECNOLOGIA DE COMUNICACAO LTDA.",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N/D",
    "amount": -3378.5
  },
  {
    "id": "tx-376",
    "row": 1269,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "GESTEIN",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N° 378",
    "amount": -590
  },
  {
    "id": "tx-377",
    "row": 1270,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "MUNICIPIO ITAJAI SC",
    "code": "4.1.11",
    "categoryName": "Timbrados, Sellados y Certificaciones",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -545.34
  },
  {
    "id": "tx-378",
    "row": 1271,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "GESTEIN",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N° 381",
    "amount": -360
  },
  {
    "id": "tx-379",
    "row": 1272,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -5.9
  },
  {
    "id": "tx-380",
    "row": 1273,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "GESTEIN",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N° 377",
    "amount": -300
  },
  {
    "id": "tx-381",
    "row": 1274,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-18",
    "supplier": "GESTEIN",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N° 380",
    "amount": -693
  },
  {
    "id": "tx-382",
    "row": 1275,
    "entity": "BLUE STAR BRASIL PARTICIPACOES LTDA.",
    "date": "2025-12-19",
    "supplier": "CLAITON MARCELINO DIAS DOS SANTOS",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -39408.18
  },
  {
    "id": "tx-383",
    "row": 1276,
    "entity": "BLUE STAR BRASIL PARTICIPACOES LTDA.",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "20.1.9",
    "categoryName": "INSS",
    "type": "Débito",
    "doc": "N/D",
    "amount": -25391.82
  },
  {
    "id": "tx-384",
    "row": 1277,
    "entity": "BLUE STAR BRASIL PARTICIPACOES LTDA.",
    "date": "2025-12-19",
    "supplier": "MINISTERIO DO TRABALHO E EMPREGO (FGTS)",
    "code": "1.1.8",
    "categoryName": "FGTS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -4320
  },
  {
    "id": "tx-385",
    "row": 1278,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -992.555
  },
  {
    "id": "tx-386",
    "row": 1279,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1539.945
  },
  {
    "id": "tx-387",
    "row": 1280,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "NEW HOLDER DIGITAL",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -342.51
  },
  {
    "id": "tx-388",
    "row": 1281,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1539.945
  },
  {
    "id": "tx-389",
    "row": 1282,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "20.1.9",
    "categoryName": "INSS",
    "type": "Débito",
    "doc": "N/D",
    "amount": -36080.47
  },
  {
    "id": "tx-390",
    "row": 1283,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N/D",
    "amount": -992.555
  },
  {
    "id": "tx-391",
    "row": 1284,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "MINISTERIO DO TRABALHO E EMPREGO (FGTS)",
    "code": "1.1.8",
    "categoryName": "FGTS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -6756
  },
  {
    "id": "tx-392",
    "row": 1285,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1006.12
  },
  {
    "id": "tx-393",
    "row": 1286,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "ANNA LUIZA LONGHI SALATINI",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1070.485
  },
  {
    "id": "tx-394",
    "row": 1287,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1006.12
  },
  {
    "id": "tx-395",
    "row": 1288,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "20.1.12",
    "categoryName": "13º INSS",
    "type": "Débito",
    "doc": "N/D",
    "amount": -6652.29
  },
  {
    "id": "tx-396",
    "row": 1289,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "ROGER ALEXANDER DOMINGUES PRACIDELLI",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -829.83
  },
  {
    "id": "tx-397",
    "row": 1290,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "ANNA LUIZA LONGHI SALATINI",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1070.485
  },
  {
    "id": "tx-398",
    "row": 1291,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-19",
    "supplier": "ROGER ALEXANDER DOMINGUES PRACIDELLI",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -829.83
  },
  {
    "id": "tx-399",
    "row": 1292,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "MINISTERIO DO TRABALHO E EMPREGO (FGTS)",
    "code": "20.1.8",
    "categoryName": "FGTS",
    "type": "Débito",
    "doc": "N/D",
    "amount": -11147.5
  },
  {
    "id": "tx-400",
    "row": 1293,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "NATHALIE PEDROZA ALVES GOMES",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -269.8
  },
  {
    "id": "tx-401",
    "row": 1294,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "PAMELA RIBEIRO DA SILVA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1185.24
  },
  {
    "id": "tx-402",
    "row": 1295,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "Thainara Pereira Lopes",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -163.42
  },
  {
    "id": "tx-403",
    "row": 1296,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "JOSUELLE GOMES DA SILVA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1866.63
  },
  {
    "id": "tx-404",
    "row": 1297,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "MADILLA MILENNA DA SILVA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -749.29
  },
  {
    "id": "tx-405",
    "row": 1298,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "20.1.9",
    "categoryName": "INSS",
    "type": "Débito",
    "doc": "N/D",
    "amount": -45565.43
  },
  {
    "id": "tx-406",
    "row": 1299,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "DAYANE VISGUEIRA MACEDO",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1706.25
  },
  {
    "id": "tx-407",
    "row": 1300,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "CAROLINY CRISTINA APARECIDA ELOI",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -173.73
  },
  {
    "id": "tx-408",
    "row": 1301,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "YASMIN VICTORIA ALMEIDA FERNANDES",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -163.42
  },
  {
    "id": "tx-409",
    "row": 1302,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "CLAUDINEIDE RAMOS DA SILVA GOMES",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1358.87
  },
  {
    "id": "tx-410",
    "row": 1303,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "JENNIFER ESPINDOLA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1024.85
  },
  {
    "id": "tx-411",
    "row": 1304,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "GISELE GENEROSO",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -979.44
  },
  {
    "id": "tx-412",
    "row": 1305,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "ESCARLATY KELLY DE CARVALHO",
    "code": "20.1.13",
    "categoryName": "Férias 1/3",
    "type": "Débito",
    "doc": "N/D",
    "amount": -734.83
  },
  {
    "id": "tx-413",
    "row": 1306,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "ISABELE COSTA DE BARROS",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -163.42
  },
  {
    "id": "tx-414",
    "row": 1307,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "PAMELA KATARIN COUTINHO MARTINS",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1291.83
  },
  {
    "id": "tx-415",
    "row": 1308,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "RANYELL ESDRAS SANTOS DE OLIVEIRA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -623.98
  },
  {
    "id": "tx-416",
    "row": 1309,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "KETHELYN MACHADO SORMANI",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1144.29
  },
  {
    "id": "tx-417",
    "row": 1310,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "JANAINA ROLDAO SILVA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -823.87
  },
  {
    "id": "tx-418",
    "row": 1311,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "NATHALIA SOARES VALVERDE",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -991.47
  },
  {
    "id": "tx-419",
    "row": 1312,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "GIOVANNA CARNEIRO AMARO NACHABE",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -250.78
  },
  {
    "id": "tx-420",
    "row": 1313,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "JANAINA CICERA DA SILVA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1082.06
  },
  {
    "id": "tx-421",
    "row": 1314,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "SABRINA FEITOSA MUNIZ",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -892.47
  },
  {
    "id": "tx-422",
    "row": 1315,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "THAISSA WERNECK FURUKAWA FUGAZZA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1049.54
  },
  {
    "id": "tx-423",
    "row": 1316,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "CLEISE VALES MORAES",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -365.98
  },
  {
    "id": "tx-424",
    "row": 1317,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "ELIZABETH PRISCILA BARBOSA BARROS",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -925
  },
  {
    "id": "tx-425",
    "row": 1318,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "MARIA DAS CANDEIAS DA SILVA SOARES",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -991.47
  },
  {
    "id": "tx-426",
    "row": 1319,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "EDLANE DA SILVA AMANSIO",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -842.77
  },
  {
    "id": "tx-427",
    "row": 1320,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "GABRYEL RONY LIMA RAMOS",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -833.49
  },
  {
    "id": "tx-428",
    "row": 1321,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "IRIS CAROLINA RODRIGUES DE ALMEIDA CONCEICAO",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1794.63
  },
  {
    "id": "tx-429",
    "row": 1322,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "KAELLE FEITOR SANTOS",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1259.8
  },
  {
    "id": "tx-430",
    "row": 1323,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "DEBORA FARIAS DA SILVA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1739.85
  },
  {
    "id": "tx-431",
    "row": 1324,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "VITORIA VIVIANE MOREIRA DE SOUZA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -163.42
  },
  {
    "id": "tx-432",
    "row": 1325,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "ANA CAROLINE SILVA COSTA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -295.38
  },
  {
    "id": "tx-433",
    "row": 1326,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "GISLAINE DO VALLE LOPES",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -231.25
  },
  {
    "id": "tx-434",
    "row": 1327,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "TALITA MAIARA MENGISDZKI KRUEGER",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -979.44
  },
  {
    "id": "tx-435",
    "row": 1328,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "DIEGO TIVERON SILVA DE OLIVEIRA",
    "code": "20.1.10",
    "categoryName": "13º Proporcional",
    "type": "Débito",
    "doc": "N/D",
    "amount": -381.28
  },
  {
    "id": "tx-436",
    "row": 1329,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-19",
    "supplier": "RECEITA FEDERAL",
    "code": "20.1.12",
    "categoryName": "13º INSS",
    "type": "Débito",
    "doc": "N/D",
    "amount": -23096.02
  },
  {
    "id": "tx-437",
    "row": 1330,
    "entity": "BLUE STAR BRASIL PARTICIPACOES LTDA.",
    "date": "2025-12-22",
    "supplier": "PLUXEE BENEFICIOS BRASIL S/A (SODEXO)",
    "code": "20.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Débito",
    "doc": "N/D",
    "amount": -538.6
  },
  {
    "id": "tx-438",
    "row": 1331,
    "entity": "BLUE STAR BRASIL PARTICIPACOES LTDA.",
    "date": "2025-12-22",
    "supplier": "CLUB COWORKING",
    "code": "21.1.1",
    "categoryName": "Alquileres",
    "type": "Débito",
    "doc": "N° 20476",
    "amount": -194.97
  },
  {
    "id": "tx-439",
    "row": 1332,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "CASSIA CARLA DE SOUZA PEGORARO",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3500
  },
  {
    "id": "tx-440",
    "row": 1333,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "CASSIA CARLA DE SOUZA PEGORARO",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3500
  },
  {
    "id": "tx-441",
    "row": 1334,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "CASSIA CARLA DE SOUZA PEGORARO",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N° 54",
    "amount": -7889.79
  },
  {
    "id": "tx-442",
    "row": 1335,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "CASSIA CARLA DE SOUZA PEGORARO",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3500
  },
  {
    "id": "tx-443",
    "row": 1336,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "CLUB COWORKING",
    "code": "21.1.1",
    "categoryName": "Alquileres",
    "type": "Débito",
    "doc": "N/D",
    "amount": -450
  },
  {
    "id": "tx-444",
    "row": 1337,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "CASSIA CARLA DE SOUZA PEGORARO",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3500
  },
  {
    "id": "tx-445",
    "row": 1338,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "AURE LTDA",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "N/D",
    "amount": -19124.44
  },
  {
    "id": "tx-446",
    "row": 1339,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "PLUXEE BENEFICIOS BRASIL S/A (SODEXO)",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -2423.7
  },
  {
    "id": "tx-447",
    "row": 1340,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-22",
    "supplier": "CASSIA CARLA DE SOUZA PEGORARO",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N° 52",
    "amount": -28000
  },
  {
    "id": "tx-448",
    "row": 1341,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "CONTASTE",
    "code": "3.1.4",
    "categoryName": "Equipos Alquilados",
    "type": "Débito",
    "doc": "1356",
    "amount": -1160
  },
  {
    "id": "tx-449",
    "row": 1342,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "ECAD - ESCRITÓRIO CENTRAL DE ARRECADAÇÃO E DISTRIBUIÇÃO",
    "code": "6.1.3",
    "categoryName": "Diarios, Revistas y Suscripciones",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -239.87
  },
  {
    "id": "tx-450",
    "row": 1343,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "M W DO BRASIL LTDA",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2766.67
  },
  {
    "id": "tx-451",
    "row": 1344,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "250590348020292",
    "amount": -41420.19
  },
  {
    "id": "tx-452",
    "row": 1345,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "ECAD - ESCRITÓRIO CENTRAL DE ARRECADAÇÃO E DISTRIBUIÇÃO",
    "code": "6.1.3",
    "categoryName": "Diarios, Revistas y Suscripciones",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -115.32
  },
  {
    "id": "tx-453",
    "row": 1346,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "AMERICA NET",
    "code": "6.1.7",
    "categoryName": "Servicio de Internet",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -280
  },
  {
    "id": "tx-454",
    "row": 1347,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "ERYC TEIDY HIRASAKA",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N° 162",
    "amount": -2500
  },
  {
    "id": "tx-455",
    "row": 1348,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "250590348018307",
    "amount": -93082.76
  },
  {
    "id": "tx-456",
    "row": 1349,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "BRASILPACK EMB. DE PAP. OND. LTDA",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "N° 000.014.270",
    "amount": -49347.8
  },
  {
    "id": "tx-457",
    "row": 1350,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "CORREIOS E TELEGRAFOS",
    "code": "3.1.13",
    "categoryName": "Fletes E-Commerce",
    "type": "Débito",
    "doc": "1142913",
    "amount": -948.48
  },
  {
    "id": "tx-458",
    "row": 1351,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "DE GOEYE ADVOGADOS ASSOCIADOS",
    "code": "24.1.2",
    "categoryName": "Honorarios Legales",
    "type": "Débito",
    "doc": "7274",
    "amount": -1877
  },
  {
    "id": "tx-459",
    "row": 1352,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -94973.46
  },
  {
    "id": "tx-460",
    "row": 1353,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "MARCOS ANTONIO MULLER JUNIOR SERVICOS - ME",
    "code": "26.1.8",
    "categoryName": "Servicios de Mantenimiento General y Reparaciones",
    "type": "Débito",
    "doc": "N° 6535",
    "amount": -120
  },
  {
    "id": "tx-461",
    "row": 1354,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "ELIZABETH PRISCILA BARBOSA BARROS",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -97.5
  },
  {
    "id": "tx-462",
    "row": 1355,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "MARIANA VILLELA DE CARVALHO",
    "code": "20.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Débito",
    "doc": "N/D",
    "amount": -127
  },
  {
    "id": "tx-463",
    "row": 1356,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "NATHALIE PEDROZA ALVES GOMES",
    "code": "20.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Débito",
    "doc": "N/D",
    "amount": -127
  },
  {
    "id": "tx-464",
    "row": 1357,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "VERO S.A.",
    "code": "6.1.7",
    "categoryName": "Servicio de Internet",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3364.88
  },
  {
    "id": "tx-465",
    "row": 1358,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "NAVEGAR COMUNICACAO E CULTURA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 2798",
    "amount": -65
  },
  {
    "id": "tx-466",
    "row": 1359,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "GISLAINE DO VALLE LOPES",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -175
  },
  {
    "id": "tx-467",
    "row": 1360,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "ABF - ASSOCIACAO BRASILEIRA DE FRANCHISING",
    "code": "25.1.3",
    "categoryName": "Diarios, Revistas y Suscripciones",
    "type": "Débito",
    "doc": "N/D",
    "amount": -508
  },
  {
    "id": "tx-468",
    "row": 1361,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -19.17
  },
  {
    "id": "tx-469",
    "row": 1362,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -16.64
  },
  {
    "id": "tx-470",
    "row": 1363,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "NAVEGAR COMUNICACAO E CULTURA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 2796",
    "amount": -65
  },
  {
    "id": "tx-471",
    "row": 1364,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -28.25
  },
  {
    "id": "tx-472",
    "row": 1365,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "IRIS CAROLINA RODRIGUES DE ALMEIDA C",
    "code": "20.1.13",
    "categoryName": "Férias 1/3",
    "type": "Débito",
    "doc": "N/D",
    "amount": -3465.38
  },
  {
    "id": "tx-473",
    "row": 1366,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -20.97
  },
  {
    "id": "tx-474",
    "row": 1367,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "MARIANA VILLELA DE CARVALHO",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -500
  },
  {
    "id": "tx-475",
    "row": 1368,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -13.99
  },
  {
    "id": "tx-476",
    "row": 1369,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -17.48
  },
  {
    "id": "tx-477",
    "row": 1370,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "ENEL",
    "code": "6.1.4",
    "categoryName": "Electricidad",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -51.43
  },
  {
    "id": "tx-478",
    "row": 1371,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-22",
    "supplier": "ERYC TEIDY HIRASAKA",
    "code": "13.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Crédito",
    "doc": "N° 163",
    "amount": -2500
  },
  {
    "id": "tx-479",
    "row": 1372,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-23",
    "supplier": "RECEITA FEDERAL",
    "code": "41.1.1",
    "categoryName": "Tiendas - PIS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -799.810019
  },
  {
    "id": "tx-480",
    "row": 1373,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-23",
    "supplier": "CANOA PUBLICIDADE",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 107",
    "amount": -1923
  },
  {
    "id": "tx-481",
    "row": 1374,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-23",
    "supplier": "RECEITA FEDERAL",
    "code": "41.1.1",
    "categoryName": "Tiendas - COFINS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3691.439981
  },
  {
    "id": "tx-482",
    "row": 1375,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-23",
    "supplier": "PLUXEE BENEFICIOS BRASIL S/A (SODEXO)",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -13325.58
  },
  {
    "id": "tx-483",
    "row": 1376,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-23",
    "supplier": "63.025.280 SAMANTHA CHRISTINA SOUZA LISBOA",
    "code": "27.1.36",
    "categoryName": "Papeleria, Librería y Utiles",
    "type": "Débito",
    "doc": "N° 1",
    "amount": -9550
  },
  {
    "id": "tx-484",
    "row": 1377,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-23",
    "supplier": "PLUXEE BENEFICIOS BRASIL S/A (SODEXO)",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3525.33
  },
  {
    "id": "tx-485",
    "row": 1378,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-26",
    "supplier": "STEPHANIE GOMES MONTEIRO SANTIAGO",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 18",
    "amount": -13481.45
  },
  {
    "id": "tx-486",
    "row": 1379,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-26",
    "supplier": "STEPHANIE GOMES MONTEIRO SANTIAGO",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 18",
    "amount": -13481.45
  },
  {
    "id": "tx-487",
    "row": 1380,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "SMART2C",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "FAT 6954444",
    "amount": -3741.18
  },
  {
    "id": "tx-488",
    "row": 1381,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "HSTONE COMERCIO E INSTALACAO DE MOVEIS LTDA",
    "code": "10.1.2",
    "categoryName": "Alquiler de Maquinas y Equipos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3379.85
  },
  {
    "id": "tx-489",
    "row": 1382,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "BELLA JOIAS ACESSORIOS FEMININOS LTDA",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "Nº 000.000.537",
    "amount": -21620
  },
  {
    "id": "tx-490",
    "row": 1383,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "BRILHANTE ARTES GRAFICAS LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "1825",
    "amount": -2453
  },
  {
    "id": "tx-491",
    "row": 1384,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "BRILHANTE ARTES GRAFICAS LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "N° 1796",
    "amount": -3284.5
  },
  {
    "id": "tx-492",
    "row": 1385,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "LUCAPI SISTEMAS LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -3072
  },
  {
    "id": "tx-493",
    "row": 1386,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "BSG25LW080 + IVG25BH",
    "amount": -35110.94
  },
  {
    "id": "tx-494",
    "row": 1387,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "KSE IMPORTACAO E DISTRIBUICAO LTDA",
    "code": "43.1.1",
    "categoryName": "CMV Tiendas",
    "type": "Crédito",
    "doc": "SCD2508285BR",
    "amount": -40269.27
  },
  {
    "id": "tx-495",
    "row": 1388,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "HSTONE COMERCIO E INSTALACAO DE MOVEIS LTDA",
    "code": "10.1.2",
    "categoryName": "Alquiler de Maquinas y Equipos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -5321.32
  },
  {
    "id": "tx-496",
    "row": 1389,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "GOAKIRA",
    "code": "23.1.4",
    "categoryName": "Publicidad",
    "type": "Débito",
    "doc": "N/D",
    "amount": -6638.66
  },
  {
    "id": "tx-497",
    "row": 1390,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -31.18
  },
  {
    "id": "tx-498",
    "row": 1391,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "BRILHANTE ARTES GRAFICAS LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "N° 1785",
    "amount": -366.99
  },
  {
    "id": "tx-499",
    "row": 1392,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "BRILHANTE ARTES GRAFICAS LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "1824",
    "amount": -542
  },
  {
    "id": "tx-500",
    "row": 1393,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "BRILHANTE ARTES GRAFICAS LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "1823",
    "amount": -185
  },
  {
    "id": "tx-501",
    "row": 1394,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -18.64
  },
  {
    "id": "tx-502",
    "row": 1395,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "JAMEF ENCOMENDAS URGENTES",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "455708",
    "amount": -1227.69
  },
  {
    "id": "tx-503",
    "row": 1396,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-26",
    "supplier": "SEFAZ SP",
    "code": "41.1.1",
    "categoryName": "Tiendas - ICMS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -7.79
  },
  {
    "id": "tx-504",
    "row": 1397,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-29",
    "supplier": "FRANQUIARIA SERVICOS EMPRESARIAIS",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "142",
    "amount": -7000
  },
  {
    "id": "tx-505",
    "row": 1398,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "SOLLIS PERFUMES E COSMETICOS EIRELI",
    "code": "5.1.2",
    "categoryName": "Gastos de Exhibicion de Mercaderia",
    "type": "Crédito",
    "doc": "52257",
    "amount": -256.59
  },
  {
    "id": "tx-506",
    "row": 1399,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "WORLDPEL COMERCIO DE EMBALAGENS LTDA",
    "code": "9.1.1",
    "categoryName": "Packaging Clientes / Embalaje (Sacola)",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -16758
  },
  {
    "id": "tx-507",
    "row": 1400,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "B&B CONFECCOES",
    "code": "23.1.1",
    "categoryName": "Uniformes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -5486.61
  },
  {
    "id": "tx-508",
    "row": 1401,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "B&B CONFECCOES",
    "code": "23.1.1",
    "categoryName": "Uniformes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1181.55
  },
  {
    "id": "tx-509",
    "row": 1402,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "BANCO ITAÚ",
    "code": "30.1.3",
    "categoryName": "Intereses Bancarios",
    "type": "Débito",
    "doc": "N/D",
    "amount": -174573.29
  },
  {
    "id": "tx-510",
    "row": 1403,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "DLOCAL SERV DE FACEBOOK E SERV ON LINE BRASIL LTDA",
    "code": "23.1.4",
    "categoryName": "Publicidad",
    "type": "Débito",
    "doc": "N/D",
    "amount": -5950
  },
  {
    "id": "tx-511",
    "row": 1404,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "B7 LOGISTICA LTDA",
    "code": "3.1.8",
    "categoryName": "Mano de Obra AZ",
    "type": "Débito",
    "doc": "N° 387",
    "amount": -9269.66
  },
  {
    "id": "tx-512",
    "row": 1405,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "SOLLIS PERFUMES E COSMETICOS EIRELI",
    "code": "5.1.2",
    "categoryName": "Gastos de Exhibicion de Mercaderia",
    "type": "Crédito",
    "doc": "52136",
    "amount": -256.59
  },
  {
    "id": "tx-513",
    "row": 1406,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "RM2",
    "code": "3.1.7",
    "categoryName": "Insumos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -10950
  },
  {
    "id": "tx-514",
    "row": 1407,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "MULTIPLAN ARRECADADORA LTDA",
    "code": "2.1.1",
    "categoryName": "Alquileres",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -49341.12
  },
  {
    "id": "tx-515",
    "row": 1408,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "VIP-SYSTEMS TECNOLOGIA & INOVACAO",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N° 029691",
    "amount": -2793.6
  },
  {
    "id": "tx-516",
    "row": 1409,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "JOSUELLE GOMES DA SILVA",
    "code": "20.1.13",
    "categoryName": "Férias 1/3",
    "type": "Débito",
    "doc": "N/D",
    "amount": -3086.89
  },
  {
    "id": "tx-517",
    "row": 1410,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "NATHALIA SOARES VALVERDE",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -3501.85
  },
  {
    "id": "tx-518",
    "row": 1411,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "DELMAX PAPELAO E EMBALAGENS LTDA",
    "code": "5.1.5",
    "categoryName": "Imagen em Puntos de Venta",
    "type": "Crédito",
    "doc": "N° 59.146",
    "amount": -173.43
  },
  {
    "id": "tx-519",
    "row": 1412,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "PORTOEXPRESS",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "FAT N° 56518",
    "amount": -37585.53
  },
  {
    "id": "tx-520",
    "row": 1413,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "Canaveral Produtos de Higiene e Limpeza",
    "code": "11.1.3",
    "categoryName": "Otros Gastos de Movilidad",
    "type": "Crédito",
    "doc": "N° 103.674",
    "amount": -459.76
  },
  {
    "id": "tx-521",
    "row": 1414,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "SCANSOURCE DO BRASIL",
    "code": "26.1.3",
    "categoryName": "Electricos",
    "type": "Débito",
    "doc": "157209",
    "amount": -2963.97
  },
  {
    "id": "tx-522",
    "row": 1415,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "CST SERVICOS DE INFORMATICA E TELECOMUNICACOES",
    "code": "6.1.7",
    "categoryName": "Servicio de Internet",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -120.88
  },
  {
    "id": "tx-523",
    "row": 1416,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-29",
    "supplier": "MARIA DAS CANDEIAS DA SILVA SOARES",
    "code": "20.1.13",
    "categoryName": "Férias 1/3",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2643.02
  },
  {
    "id": "tx-524",
    "row": 1417,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "FRANQUIARIA SERVICOS EMPRESARIAIS",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 146",
    "amount": -6700
  },
  {
    "id": "tx-525",
    "row": 1418,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "CASSIA CARLA DE SOUZA PEGORARO",
    "code": "10.1.28",
    "categoryName": "Gastos Varios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1837.8
  },
  {
    "id": "tx-526",
    "row": 1419,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "ANNA LUIZA LONGHI SALATINI",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1415.755
  },
  {
    "id": "tx-527",
    "row": 1420,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "ADRIANO ALBERTO N MAGALHAES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -19305
  },
  {
    "id": "tx-528",
    "row": 1421,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -632.367
  },
  {
    "id": "tx-529",
    "row": 1422,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1475.523
  },
  {
    "id": "tx-530",
    "row": 1423,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "ROGER ALEXANDER DOMINGUES PRACIDELLI",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -960.33
  },
  {
    "id": "tx-531",
    "row": 1424,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "ANNA LUIZA LONGHI SALATINI",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1415.755
  },
  {
    "id": "tx-532",
    "row": 1425,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "ROGER ALEXANDER DOMINGUES PRACIDELLI",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -960.33
  },
  {
    "id": "tx-533",
    "row": 1426,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "10.1.28",
    "categoryName": "Gastos Varios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -494.25
  },
  {
    "id": "tx-534",
    "row": 1427,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "ANNA LUIZA LONGHI SALATINI",
    "code": "10.1.28",
    "categoryName": "Gastos Varios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -2161.465
  },
  {
    "id": "tx-535",
    "row": 1428,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "10.1.28",
    "categoryName": "Gastos Varios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -25.355
  },
  {
    "id": "tx-536",
    "row": 1429,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "ANNA LUIZA LONGHI SALATINI",
    "code": "10.1.28",
    "categoryName": "Gastos Varios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -2161.465
  },
  {
    "id": "tx-537",
    "row": 1430,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "10.1.28",
    "categoryName": "Gastos Varios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -25.355
  },
  {
    "id": "tx-538",
    "row": 1431,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "PRISCILA MOREIRA DA SILVA TAVARES",
    "code": "10.1.28",
    "categoryName": "Gastos Varios",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -494.25
  },
  {
    "id": "tx-539",
    "row": 1432,
    "entity": "BSG BRASIL FRANQUIA LTDA",
    "date": "2025-12-30",
    "supplier": "DORNELLAS DE SOUZA-SOCIEDADE DE ADVOGADOS",
    "code": "10.1.28",
    "categoryName": "Gastos Varios",
    "type": "Crédito",
    "doc": "N° 3507",
    "amount": -1200
  },
  {
    "id": "tx-540",
    "row": 1433,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "CLAUDINEIDE RAMOS DA SILVA GOMES",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -350
  },
  {
    "id": "tx-541",
    "row": 1434,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "THAISSA WERNECK FURUKAWA FUGAZZA",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -350
  },
  {
    "id": "tx-542",
    "row": 1435,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "ESCARLATY KELLY DE CARVALHO",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2007.32
  },
  {
    "id": "tx-543",
    "row": 1436,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "MADILLA MILENNA DA SILVA",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -350
  },
  {
    "id": "tx-544",
    "row": 1437,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "ANA CAROLINE SILVA COSTA",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -350
  },
  {
    "id": "tx-545",
    "row": 1438,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "RD STATION",
    "code": "26.1.9",
    "categoryName": "Software",
    "type": "Débito",
    "doc": "N/D",
    "amount": -240
  },
  {
    "id": "tx-546",
    "row": 1439,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "JANAINA CICERA DA SILVA",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -122.5
  },
  {
    "id": "tx-547",
    "row": 1440,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "JANAINA CICERA DA SILVA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1289.91
  },
  {
    "id": "tx-548",
    "row": 1441,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "GABRYEL RONY LIMA RAMOS",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1163.21
  },
  {
    "id": "tx-549",
    "row": 1442,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "L&BARREIROS SERVICOS",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "N/D",
    "amount": -201.7
  },
  {
    "id": "tx-550",
    "row": 1443,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "MARIANA VILLELA DE CARVALHO",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1000
  },
  {
    "id": "tx-551",
    "row": 1444,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "VITORIA VIVIANE MOREIRA DE SOUZA",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -300
  },
  {
    "id": "tx-552",
    "row": 1445,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "ELIZABETH PRISCILA BARBOSA BARROS",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2363.72
  },
  {
    "id": "tx-553",
    "row": 1446,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "DIEGO TIVERON SILVA DE OLIVEIRA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -911.2
  },
  {
    "id": "tx-554",
    "row": 1447,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "DEBORA FARIAS DA SILVA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1973.25
  },
  {
    "id": "tx-555",
    "row": 1448,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "VITORIA VIVIANE MOREIRA DE SOUZA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -686.5
  },
  {
    "id": "tx-556",
    "row": 1449,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "ISABELE COSTA DE BARROS",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1336.49
  },
  {
    "id": "tx-557",
    "row": 1450,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "ANA PAULA PINTO MACIEL",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 51",
    "amount": -5100
  },
  {
    "id": "tx-558",
    "row": 1451,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "KAELLE FEITOR SANTOS",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2371.81
  },
  {
    "id": "tx-559",
    "row": 1452,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "KETHELYN MACHADO SORMANI",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1425
  },
  {
    "id": "tx-560",
    "row": 1453,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "PONTOMAIS TECNOLOGIA LTDA",
    "code": "7.1.9",
    "categoryName": "Software",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -395.71
  },
  {
    "id": "tx-561",
    "row": 1454,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "NATHALIE PEDROZA ALVES GOMES",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -390
  },
  {
    "id": "tx-562",
    "row": 1455,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "VITORIA VIVIANE MOREIRA DE SOUZA",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -381
  },
  {
    "id": "tx-563",
    "row": 1456,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "JOSUELLE GOMES DA SILVA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2134.53
  },
  {
    "id": "tx-564",
    "row": 1457,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "Thainara Pereira Lopes",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -746.06
  },
  {
    "id": "tx-565",
    "row": 1458,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "VILLELA SERVICOS LTDA",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 01",
    "amount": -30000
  },
  {
    "id": "tx-566",
    "row": 1459,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "ELIZABETH PRISCILA BARBOSA BARROS",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -390
  },
  {
    "id": "tx-567",
    "row": 1460,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "TALITA MAIARA MENGISDZKI KRUEGER",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -200
  },
  {
    "id": "tx-568",
    "row": 1461,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "GISELE GENEROSO",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2320.92
  },
  {
    "id": "tx-569",
    "row": 1462,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "NATHALIE PEDROZA ALVES GOMES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1170.53
  },
  {
    "id": "tx-570",
    "row": 1463,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "TRANSPORTES ADRE LTDA",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N° 460521",
    "amount": -1350.29
  },
  {
    "id": "tx-571",
    "row": 1464,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "PORTOEXPRESS",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N° 8148",
    "amount": -1782.81
  },
  {
    "id": "tx-572",
    "row": 1465,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "JANAINA ROLDAO SILVA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -539.58
  },
  {
    "id": "tx-573",
    "row": 1466,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "MARIA DAS CANDEIAS DA SILVA SOARES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1239.99
  },
  {
    "id": "tx-574",
    "row": 1467,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "GIOVANNA CARNEIRO AMARO NACHABE",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1308.46
  },
  {
    "id": "tx-575",
    "row": 1468,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "CAROLINY CRISTINA APARECIDA ELOI",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1761.65
  },
  {
    "id": "tx-576",
    "row": 1469,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "THAISSA WERNECK FURUKAWA FUGAZZA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -968.17
  },
  {
    "id": "tx-577",
    "row": 1470,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "MINISTERIO DO TRABALHO E EMPREGO (FGTS)",
    "code": "1.1.8",
    "categoryName": "FGTS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -201.56
  },
  {
    "id": "tx-578",
    "row": 1471,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "MINISTERIO DO TRABALHO E EMPREGO (FGTS)",
    "code": "1.1.8",
    "categoryName": "FGTS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -214.05
  },
  {
    "id": "tx-579",
    "row": 1472,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "Thainara Pereira Lopes",
    "code": "1.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -345
  },
  {
    "id": "tx-580",
    "row": 1473,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "Thainara Pereira Lopes",
    "code": "1.1.6",
    "categoryName": "Vale Refeição / Vales de Alimentacion",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -381
  },
  {
    "id": "tx-581",
    "row": 1474,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "EDLANE DA SILVA AMANSIO",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2413.99
  },
  {
    "id": "tx-582",
    "row": 1475,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "IRIS CAROLINA RODRIGUES DE ALMEIDA CONCEICAO",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2291.1
  },
  {
    "id": "tx-583",
    "row": 1476,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "TALITA MAIARA MENGISDZKI KRUEGER",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1965.8
  },
  {
    "id": "tx-584",
    "row": 1477,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "YASMIN VICTORIA ALMEIDA FERNANDES",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1349.74
  },
  {
    "id": "tx-585",
    "row": 1478,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "NATHALIE PEDROZA ALVES GOMES",
    "code": "27.1.28",
    "categoryName": "Gastos Varios",
    "type": "Débito",
    "doc": "N/D",
    "amount": -49.8
  },
  {
    "id": "tx-586",
    "row": 1479,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "TRANSPORTES ADRE LTDA",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1580.21
  },
  {
    "id": "tx-587",
    "row": 1480,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "MILENE PEREIRA DE OLIVEIRA",
    "code": "40.1.2",
    "categoryName": "Tiendas (Devolución)",
    "type": "Débito",
    "doc": "OS22020",
    "amount": -29.9
  },
  {
    "id": "tx-588",
    "row": 1481,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "GISLAINE DO VALLE LOPES",
    "code": "20.1.5",
    "categoryName": "Vales de Transporte / Desplazamiento",
    "type": "Débito",
    "doc": "N/D",
    "amount": -350
  },
  {
    "id": "tx-589",
    "row": 1482,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "ANA CAROLINE SILVA COSTA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1025.16
  },
  {
    "id": "tx-590",
    "row": 1483,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "MADILLA MILENNA DA SILVA",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1239.99
  },
  {
    "id": "tx-591",
    "row": 1484,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "VANESSA SELLMER",
    "code": "40.1.2",
    "categoryName": "Tiendas (Devolución)",
    "type": "Débito",
    "doc": "OS22101",
    "amount": -19.9
  },
  {
    "id": "tx-592",
    "row": 1485,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "PAMELA RIBEIRO DA SILVA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1491.95
  },
  {
    "id": "tx-593",
    "row": 1486,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "JENNIFER ESPINDOLA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1270.02
  },
  {
    "id": "tx-594",
    "row": 1487,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "GOL LINHAS AEREAS S.A.",
    "code": "3.1.11",
    "categoryName": "Viaticos / Costos con Viajes",
    "type": "Débito",
    "doc": "N/D",
    "amount": -26813.15
  },
  {
    "id": "tx-595",
    "row": 1488,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "PORTOEXPRESS",
    "code": "3.1.2",
    "categoryName": "Fletes",
    "type": "Débito",
    "doc": "FAT N° 56516",
    "amount": -1079.6
  },
  {
    "id": "tx-596",
    "row": 1489,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "AGISET COMERCIO E DISTRIBUIDORA DE EMBALAGENS LTDA",
    "code": "9.1.1",
    "categoryName": "Packaging Clientes / Embalaje (Sacola)",
    "type": "Crédito",
    "doc": "N° 632",
    "amount": -19699.73
  },
  {
    "id": "tx-597",
    "row": 1490,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "CLEISE VALES MORAES",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1084.73
  },
  {
    "id": "tx-598",
    "row": 1491,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "RANYELL ESDRAS SANTOS DE OLIVEIRA",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1014.88
  },
  {
    "id": "tx-599",
    "row": 1492,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "MINISTERIO DO TRABALHO E EMPREGO (FGTS)",
    "code": "1.1.8",
    "categoryName": "FGTS",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -200.44
  },
  {
    "id": "tx-600",
    "row": 1493,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "SABRINA FEITOSA MUNIZ",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1143.51
  },
  {
    "id": "tx-601",
    "row": 1494,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "DAYANE VISGUEIRA MACEDO",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -2140.48
  },
  {
    "id": "tx-602",
    "row": 1495,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "PORTOEX SP LOGISTICA LTDA",
    "code": "2.1.1",
    "categoryName": "Alquileres",
    "type": "Crédito",
    "doc": "N° 24",
    "amount": -5950
  },
  {
    "id": "tx-603",
    "row": 1496,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "L&BARREIROS SERVICOS",
    "code": "24.1.3",
    "categoryName": "Honorarios de Terceros",
    "type": "Débito",
    "doc": "N° 03",
    "amount": -16500
  },
  {
    "id": "tx-604",
    "row": 1497,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "CLAUDINEIDE RAMOS DA SILVA GOMES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -1658.53
  },
  {
    "id": "tx-605",
    "row": 1498,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "GISLAINE DO VALLE LOPES",
    "code": "20.1.1",
    "categoryName": "Sueldos",
    "type": "Débito",
    "doc": "N/D",
    "amount": -2067.58
  },
  {
    "id": "tx-606",
    "row": 1499,
    "entity": "BSG BIJOU BRASIL",
    "date": "2025-12-30",
    "supplier": "PAMELA KATARIN COUTINHO MARTINS",
    "code": "1.1.1",
    "categoryName": "Sueldos",
    "type": "Crédito",
    "doc": "N/D",
    "amount": -1460.09
  }
];
