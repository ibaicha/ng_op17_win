import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Filiere} from '../../../models/filiere';

export const FiliereActions = createActionGroup({
  source: 'Filiere',
  events: {
    'Load Filieres': emptyProps(),
    'Load Filieres Success': props<{ data: unknown }>(),
    'Load Filieres Failure': props<{ error: unknown }>(),
  }
});
