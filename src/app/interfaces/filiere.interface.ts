
export interface IVariete {
    id: number;
    name: string;
    surface_unite: string;
    quantite_unite: string;
    rendement_unite: number;
    isActive: boolean;
    produit: IProduit;
}

export interface IProduit {
    id: number;
    name: string;
    isDerive: boolean;
    isEnsachage: boolean;
    isActive: boolean;
    filiere: IFiliere;
    familleEmplacement: IFamilleEmplacement;
}

export interface IFiliere {
    id: number;
    name: string;
}

export interface IFamilleEmplacement {
    id: number;
    name: string;
}