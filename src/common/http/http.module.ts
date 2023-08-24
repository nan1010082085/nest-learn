import { DynamicModule, Module } from '@nestjs/common';
import { HttpService } from './http.service';

@Module({
  providers: [HttpService],
})
export class HttpModule {
  static forRoot(options?: HttpModuleRootOptions): DynamicModule {
    const { isGlobal = false } = options;
    return {
      global: isGlobal,
      module: HttpModule,
      providers: [HttpService],
      exports: [HttpService],
    };
  }
}

export interface HttpModuleRootOptions {
  isGlobal: boolean;
}
