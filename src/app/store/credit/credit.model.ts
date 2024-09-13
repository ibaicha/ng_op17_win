import { ICredit, ICreditCustom, IExploitationCredit } from '../../interfaces/credit.interface';

export interface ICreditState {
    credits: ICredit[];
    creditsCustom: ICreditCustom[];
    customCreditAgenceVarieteAnneeSaison: ICreditCustom[];
    customCreditSocieteVarieteAnneeSaison: ICreditCustom[];
    exploitationCredits: IExploitationCredit[];
    creditWithFilters: ICreditCustom[];
    isLoading: boolean;
}

