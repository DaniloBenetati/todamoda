// DRE Types and Schema definition
export type ChannelKey = 'tiendas' | 'produto' | 'franquias' | 'consolidado';

export interface ChannelOption {
  key: ChannelKey;
  label: string;
  description: string;
  icon: string;
}

export const CHANNELS: ChannelOption[] = [
  { key: 'consolidado', label: 'Consolidado Global', description: 'Todas as operações (Lojas + Atacado + Franquias)', icon: 'Globe' },
  { key: 'tiendas', label: 'Tiendas Propias (Lojas)', description: 'Lojas Próprias de Varejo e E-Commerce', icon: 'Store' },
  { key: 'produto', label: 'Venta Producto (Atacado)', description: 'Venda de Produtos B2B e Multimarcas', icon: 'Package' },
  { key: 'franquias', label: 'Franquias (Royalties & Taxas)', description: 'Rede Franqueada e Royalties', icon: 'Building2' }
];

export const MONTHS = [
  { key: 'jan_26', label: 'Janeiro 2026', short: 'Jan/26' },
  { key: 'feb_26', label: 'Fevereiro 2026', short: 'Fev/26' },
  { key: 'mar_26', label: 'Março 2026', short: 'Mar/26' },
  { key: 'acum_26', label: 'Acumulado 2026', short: 'YTD 2026' }
];
