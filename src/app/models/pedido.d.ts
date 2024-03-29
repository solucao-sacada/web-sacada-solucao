export interface Pedido {
    client?: Client;
    passo2?: passo2;
    passo3?: passo3;
    passo4?: passo4;
    passo5?: passo5;
    passo6?: passo6;
    passo7?: passo7;
}

interface Client {
    address: string;
    apartament: string;
    building: string;
    city: string;
    name: string;
    neighborhood: string;
    state: string;
}

interface Balcony {
    aluminiun: {
        color: {
            black: boolean;
            bz1001: boolean;
            bz1002: boolean;
            bz1003: boolean;
            mat: boolean;
            white: boolean;
        };
    };
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

interface passo5 {
    formato_sacada: string;
    quantidade_vidro: number;
    quantidade_aluminio: number;
}

interface passo6 {
    alinhamento_viga: string;
}

interface passo7 {
    tipo_aba: string;
}
