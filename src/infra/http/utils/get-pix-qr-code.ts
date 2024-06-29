import QRCodePixGeneratorService from '@/domain/hotel/application/services/QRCodePixGenerator';
import { Pix } from '@/domain/hotel/enterprise/entities/pix';

export const getPixBrCode = async (value: number, userId: string, pix: Pix) => {
    try {
        const qrCodePixGenerator = new QRCodePixGeneratorService("01");
        const payload = {
            name: userId,
            key: pix.key,
            city: pix.city,
            // message: pix.message,
            // transactionId?: string;
        };
        const { data, error } = await qrCodePixGenerator.generate({
            ...payload,
            value,
        });
        if (error) throw new Error(error.message);
        return data;
    } catch (error: any) {
        console.error("Erro ao gerar Pix QrCode.", error.message);
        throw new Error("Erro ao gerar Pix QrCode.", error.message);
    }
};
