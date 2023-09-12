import { HttpModule } from './common/http/http.module';

const dynamicModules = [HttpModule.forRoot({ isGlobal: true })];

export default dynamicModules;
