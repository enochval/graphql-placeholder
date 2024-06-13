import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class JsonplaceholderService<T> {

    private readonly baseUrl: string
    private readonly logger: Logger = new Logger(JsonplaceholderService.name)

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = this.configService.get<string>('api.baseurl')
    }

    async handleGetRequest(uri: string, args?: any): Promise<any> {
        const url: string = `${this.baseUrl}${uri}`

        const { data } = await firstValueFrom(
            this.httpService.get<any|T[]>(url)
                .pipe(
                    catchError((err: AxiosError) => {
                        this.logger.error(err.response.data)
                        throw new BadRequestException('An error happened!')
                    })
                )
        )

        if(args && args.isOne) {
            const resp: Array<T> = []
            resp.push(data)
            return resp
        }

        if (!Array.isArray(data)) {
            return data
        }

        let rsp: Array<T> = data
        if (args.first) {
            const length = (args.first > rsp.length) ? rsp.length : args.first
            rsp = rsp.slice(0, length)
        }

        return rsp
    }

    async handlePostRequest<P>(uri: string, payload: P): Promise<T> {
        const url = `${this.baseUrl}${uri}`
        const { data } = await firstValueFrom(
            this.httpService.post<T>(url, payload).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        
        return data
    }

    async handlePatchRequest<P>(uri: string, payload: P): Promise<T> {
        const url = `${this.baseUrl}${uri}`
        const { data } = await firstValueFrom(
            this.httpService.patch<T>(url, payload).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        return data
    }

    async handleDeleteRequest(uri: string): Promise<any> {
        const url = `${this.baseUrl}${uri}`
        const { data } = await firstValueFrom(
            this.httpService.delete<any>(url).pipe(
                catchError((err: AxiosError) => {
                    this.logger.error(err.response.data)
                    throw new BadRequestException("An error happened!")
                })
            )
        )
        return data
    }
}
