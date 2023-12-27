export interface PedidoJson {
    _id?: string;
    code?: number;
    createdAt?: Date;
    accessories: Accessories;
    balcony: Balcony;
    client: Client;
    technician: string;
}

export interface Accessories {
    aparador_aluminio: boolean;
    aparador_inox: boolean;
    selante: boolean;
}

export interface Balcony {
    aluminium: Aluminium;
    aperture: Aperture;
    beam: Beam;
    dimensions: Dimensions;
    glass: Glass;
    levels: Levels;
    lock: Lock;
    plumb: Plumb;
    rails: Rails;
    tip: Tip6;
    format: any;
}

export interface Aluminium {
    color: Color;
}

export interface Color {
    black: boolean;
    bz1001: boolean;
    bz1002: boolean;
    bz1003: boolean;
    mat: boolean;
    white: boolean;
    other: string;
}

export interface Aperture {
    inside: boolean;
    locations: LocationP[];
    outside: boolean;
}

export interface LocationP {
    distribution: string;
    door_distance: string;
    glasses: string;
    piece: string;
    stacking: string;
    tip: string;
}

export interface Beam {
    position: Position;
}

export interface Position {
    aligned: boolean;
    inside: boolean;
    outside: boolean;
}

export interface Dimensions {
    data: string[][];
    total: string;
}

export interface Glass {
    color: Color2;
    laminated: boolean;
    tempered: boolean;
    thickness: Thickness;
}

export interface Color2 {
    bronze: boolean;
    colorless: boolean;
    green: boolean;
    tinted: boolean;
    other: string;
}

export interface Thickness {
    '10mm': boolean;
    '8mm': boolean;
}

export interface Levels {
    full_aperture: string;
    measures: Measures;
}

export interface Measures {
    data: string[][];
    highest_ceiling: string;
    highest_floor: string;
    lower_ceiling: string;
    lower_floor: string;
}

export interface Lock {
    fechadura_para_porta: boolean;
    fechadura_vidro_vidro: boolean;
    pvc: boolean;
    ferro: boolean;
    '1520/1531': boolean;
    '3210/3211': boolean;
}

export interface Plumb {
    left_wall: LeftWall;
    right_wall: RightWall;
}

export interface LeftWall {
    bottom: string;
    top: string;
}

export interface RightWall {
    bottom: string;
    top: string;
}

export interface Rails {
    lower_rail: LowerRail;
    upper_rail: UpperRail;
}

export interface LowerRail {
    built_in: BuiltIn;
    normal: Normal;
    tab: Tab;
    tip: Tip4;
}

export interface BuiltIn {
    ref: Ref;
    tip: Tip;
}

export interface Ref {
    A: boolean;
    B: boolean;
    C: boolean;
    other: boolean;
}

export interface Tip {
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
}

export interface Normal {
    tip: Tip2;
}

export interface Tip2 {
    A: boolean;
    B: boolean;
    C: boolean;
    other: boolean | string;
}

export interface Tab {
    inside: boolean;
    outside: boolean;
    tip: Tip3;
}

export interface Tip3 {
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
    E: boolean;
}

export interface Tip4 {
    built_in: boolean;
    normal: boolean;
    tab: boolean;
}

export interface UpperRail {
    tab: Tab2;
    tip: Tip5;
}

export interface Tab2 {
    inside: boolean;
    outside: boolean;
}

export interface Tip5 {
    normal: boolean;
    tab: boolean;
}

export interface Tip6 {
    better_adjustment: boolean;
    defined: Defined;
}

export interface Defined {
    glass_quantity: string;
    isDefined: boolean;
}

export interface Client {
    address: string;
    zipCode: string;
    apartment: string;
    building: string;
    city: string;
    name: string;
    neighborhood: string;
    state: string;
    num: number;
}
