import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HandlerErrors } from './filters/handler-errors.filter';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [HandlerErrors,
        AxiosAdapter],
    exports: [HandlerErrors,
        AxiosAdapter],
    imports: [
        CacheModule.register({})
    ],
})
export class CommonModule {}
