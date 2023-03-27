import { StateSchema } from 'app/providers/StoreProvider';
import { initialForm } from '../../slice/register.slice';

export const getRegisterForm = (state: StateSchema) => state.registerForm?.form || initialForm;
