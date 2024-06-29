import { QrCodePix, QrCodePixParams } from 'qrcode-pix';
import { Inject, Injectable } from '@nestjs/common';

type ParamsOmit = 'version' | 'cep' | 'currency' | 'countryCode' | 'city';
export type GenerateQRCodePixUseCaseRequest = Omit<QrCodePixParams, ParamsOmit>;

export interface GenerateQRCodePixUseCaseResponse {
    data?: {
        qrCodeImage: string;
        brCode: string;
    };
    error?: Error;
}

@Injectable()
export class GenerateQRCodePixUseCase {
    constructor(@Inject('VERSION') private version: string) { }

    async execute(
        params: GenerateQRCodePixUseCaseRequest,
    ): Promise<GenerateQRCodePixUseCaseResponse> {
        const version = this.version;
        const parameter: QrCodePixParams = {
            ...params, version,
            city: 'Jaraguá do Sul'
        };
        try {
            const qrCodePix = QrCodePix(parameter);
            const qrCodeImage = await qrCodePix.base64();
            const brCode = qrCodePix.payload();

            return { data: { brCode, qrCodeImage } };
        } catch (error) {
            return { error: new Error(`${error}`) };
        }
    }
}