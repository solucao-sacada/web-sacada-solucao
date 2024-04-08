export interface OrcamentoRequestModel {
    idUser: string;
    client: string;
    emailClient: string;
    price: number;
}

export interface IConstsOrcamento {
    sel: number;
    red: number;
    apa: number;
    fec: number;
    ins: number;
    // chapa_in: number;
    cond: string;
    Vsac_AVISTA: number;
    Vsac_APRAZO: number;
}

export interface IValuesClient {
    send: string;
    qt_abert: number;
    vd: number; // valor do vidro
    mar: number; // meta de margem  
    ml: number; // metro linear
    wGlass: number; // largura do vidro
    h: number; // altura
}

export class CalculoOrcamento implements IConstsOrcamento, IValuesClient {
    // constantes

    /**
     * Selante
     */
    private _sel = 60;
    /**
     * Metros lineares por tubo
     */
    private _red = 7;
    /**
     * Aparador
     */
    private _apa = 75;
    /**
     * Fechadura 3210/3211
     */
    private _fec = 150;
    /**
     * Medias de isumo por custo m2
     */
    private _ins = 150;
    /**
     * Chapa de correção
     */
    private _chapaInf = 175;
    private _chapaSup = 175;
    /**
     * Prolongador
     */
    private _prolong = 50;
    /**
     * TEXTO QUE SERÁ INFORMANDO NO
     * ORÇAMENTO DO CLIENTE FINAL PARA PAGAMENTO
     * DE PARCEIRO SERÁ ARMAZENADO COMO
     * VARIAVEL DE TEXTO;
     */
    private _cond = '';

    /**
     * Metro linear da sacada
     */
    private _Vsac_AVISTA = 550;
    private _Vsac_APRAZO = 575;

    public get sel() {
        return this._sel;
    }
    public get red() {
        return this._red;
    }
    public get apa() {
        return this._apa;
    }
    public get fec() {
        return this._fec;
    }
    public get ins() {
        return this._ins;
    }
    public get chapaSup() {
        return this._chapaSup;
    }
    public get chapaInf() {
        return this._chapaInf;
    }
    public get prolong() {
        return this._prolong;
    }
    public get cond() {
        return this._cond;
    }
    public get Vsac_AVISTA() {
        return this._Vsac_AVISTA;
    }
    public get Vsac_APRAZO() {
        return this._Vsac_APRAZO;
    }

    //variaveis do cliente
    send = '';
    qt_abert = null;
    vd = null;  //valor do vidro  
    mar = null; //meta de margem 
    ml = null; //largura total
    wGlass = null; //largura do vidro
    h = null; //altura do vidro

    //variaveis adicionadas
    cliente: string = '';
    aparador: boolean = false;
    selante: boolean = false;
    chapaSuperior: boolean = false;
    chapaInferior: boolean = false;
    prolongador: boolean = false;
    
    qtdAparador: number | null = null;
    qtdProlongador: number | null = null;
    qtdSelante: number | null = null;
    valorFinal: number = null;

    set setCliente(value: string) {
        this.cliente = value;
    }
    /**
     * Valor do Kit A Vista
     */
    get kitAVista(): number {
        return this.ml * this.wGlass * 0.001;
    }

    /**
     * Valor do Kit a prazo
     */
    get kitAPrazo(): number {
        return this.Vsac_APRAZO * this.ml * 0.001;
    }

    /**
     * Custo do Vidro
     */
    get valorVidro(): number {
        return this.wGlass * this.h * this.vd * 0.000001;
    }

    /**
     * Valor do insumo
     */
    get valorInsumos(): number {
        return this.ml * this.h * this.ins * 0.000001;
    }

    /**
     * Valor dos acessórios
     */
    get valorAcessorios(): number {
        let valor = this.sel * this.qtdSelante + this.qtdAparador * this.apa + this.qtdProlongador * this.prolong;
    
        return valor;
    }
    
     /**
     * Custo total Chapas
     */
    get ValorChapas(): number {
        let valor = this.chapaSup + this.chapaInf;
        if (this.chapaSuperior) {
            valor += this.chapaSup;
        }
        if (this.chapaInferior) {
            valor += this.chapaInf;
        }
        return valor;
    }

    
    /**
     * Custo total a vista
     */
    get custoTotalAVista(): number {
        return this.kitAVista + this.valorVidro + this.valorAcessorios;
    }

    /**
     * Custo total a prazo
     */
    get custoTotalPrazo(): number {
        return this.kitAPrazo + this.valorVidro + this.valorAcessorios;
    }

    /**
     * Custo dos insumos e acessórios
     */
    get custoInsumoEAcessorio(): number {
        return this.valorInsumos + this.valorAcessorios;
    }

    get valorFinalMargem(): number {
        return Math.round(
            this.custoTotalAVista + this.mar * this.custoTotalAVista * 0.01
        );
    }
    get valorFinalMargem2(): number {
        return Math.round(
            this.custoTotalAVista +
                (this.mar + 5) * this.custoTotalAVista * 0.01
        );
    }
    get valorFinalMargem3(): number {
        return Math.round(
            this.custoTotalAVista +
                (this.mar + 10) * this.custoTotalAVista * 0.01
        );
    }

    constructor(value?: IValuesClient) {
        if (value) {
            this.send = value.send;
            this.qt_abert = value.qt_abert;
            this.vd = value.vd;
            this.mar = value.mar;
            this.ml = value.ml;
            this.h = value.h;
            this.wGlass = value.wGlass;
        }
    }
}
