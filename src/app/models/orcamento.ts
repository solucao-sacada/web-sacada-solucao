export interface OrcamentoRequestModel {
    _id?: string;
    internal_id?: string | null; //código do orçamento
    idUser: string;
    client: string;
    emailClient: string;
    address: string;
    area: number
    pricePlates: number
    priceGlasses: number
    priceAcessories: number
    priceProlongador: number
    priceKitSolutions: number

    aparador?: boolean
    selante?: boolean
    prolongador?: boolean
    chapaSuperior: boolean
    chapaInferior: boolean
    qtdAparador: number
    qtdProlongador: number
    qtdSelante: number
    price: number;
    height: number
    width: number
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
    chapaInf: number; // chapas inferiores
    chapaSup: number; // chapa superior
    prolong: number;
    fec: number
    qtdAparador: number;
    qtdSelante: number;
    qtdProlongador: number;
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
    private _chapaInf = 70;
    private _chapaSup = 70;
    /**
     * Prolongador
     */
    private _prolong = 70;
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

    qtdAparador: number = 0;
    qtdProlongador: number = 0;
    qtdSelante: number = 0;
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
        let valor = 0


        if(this.selante){
            valor += this.qtdSelante * this.sel;
        }

        if(this.aparador){
            valor += this.qtdAparador * this.apa;
        }

        return valor;
    }

    get valorProlongador(): number {
        let valor = 0

        if(this.prolongador){
            valor += this.qtdProlongador * this.prolong;
        }

        return valor
    }

    get areaTotal(): number {
        return (this.wGlass / 1000) * (this.h / 1000);
    }

     /**
     * Custo total Chapas
     */
    get valorChapas(): number {
        let valor = 0

        if (this.chapaSuperior) {
            valor += this.chapaSup * this.wGlass;
        }

        if (this.chapaInferior) {
            valor += this.chapaInf * this.wGlass;
        }

        let calcValor = valor / 1000

        return calcValor;
    }


    /**
     * Custo total a vista
     */
    get custoTotalAVista(): number {
        return this.kitAVista + this.valorVidro + this.valorAcessorios + this.valorChapas + this.valorProlongador;
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
        return parseFloat(
            (this.custoTotalAVista + this.mar * this.custoTotalAVista * 0.01).toFixed(2)
        );
    }

    get valorFinalMargem2(): number {
        return parseFloat(
            (this.custoTotalAVista + (this.mar + 5) * this.custoTotalAVista * 0.01).toFixed(2)
        );
    }

    get valorFinalMargem3(): number {
        return parseFloat(
            (this.custoTotalAVista + (this.mar + 10) * this.custoTotalAVista * 0.01).toFixed(2)
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
            this._chapaInf = value.chapaInf;
            this._chapaSup = value.chapaSup;
            this._prolong = value.prolong
            this.qtdAparador = value.qtdAparador;
            this.qtdSelante = value.qtdSelante;
            this.qtdProlongador = value.qtdProlongador;
        }
    }
}
