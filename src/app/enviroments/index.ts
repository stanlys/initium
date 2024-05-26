import { InjectionToken } from '@angular/core';

const BASE_URL = 'https://test-data.directorix.cloud/';

export const TASK1 = `${BASE_URL}task1`;

export const LS_DATA_KEY = new InjectionToken<string>('LS_DATA_KEY');
