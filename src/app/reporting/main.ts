import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Init } from '../Init'
import { ReportingModule } from './reporting.module';

//set url from web config
Init()
platformBrowserDynamic().bootstrapModule(ReportingModule);

