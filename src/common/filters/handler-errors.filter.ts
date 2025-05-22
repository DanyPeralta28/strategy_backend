
import { BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { readFileSync } from 'fs';
import { Cache } from 'cache-manager';

export class HandlerErrors {    

    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    handleCostumExceptions(error: any, json: any) {
        if (error !== undefined && error.code == undefined) {
            throw new BadRequestException('Unexpected error check logs', error);
        }
        else if (error !== undefined && error.code !== undefined) {
            const registro = json.registros.find((registroActual) => {
                return registroActual.id === error.code
            });
                
            if (registro.active == true) {
                throw new BadRequestException(registro.description, error);
            }
            throw new BadRequestException(error.detail, error)
        }
        else {
            throw new InternalServerErrorException('Unexpected error check server logs', error);
        }
    }

    async loadErrorFile() {
        let json = await JSON.parse(readFileSync('./dist/common/filters/costum-codes-exceptions.json', 'utf8',))
        await this.cacheManager.set('excepFile', json, 120);
    }
  
    async controlErrorFile() {
        let json = await this.cacheManager.get('excepFile')
        if (json == undefined) {
            await this.loadErrorFile()
            json = await this.cacheManager.get('excepFile')
        }
        return json
    }
}
    