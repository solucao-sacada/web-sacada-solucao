export interface Pedido {
    passo2?: passo2;
    passo3?: passo3;
    passo4?: passo4;
}

interface passo2 {
    better_adjustment: boolean;
    defined: {
        glass_quantity: number | null;
        isDefined: boolean;
    };
}

interface passo3 {
    tipo_vidro: string;
    cor_vidro: string;
    espessura_vidro: string;
    identificacao_cor: string;
}

interface passo4 {
    cor_aluminio: string;
    identificacao_cor: string;
}
