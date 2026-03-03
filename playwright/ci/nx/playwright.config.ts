import { currentsReporter } from '@currents/playwright';
import currentsConfig from './currents.config';

export const reporter = [currentsReporter(currentsConfig)];
