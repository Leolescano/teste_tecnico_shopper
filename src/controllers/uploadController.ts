import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Measure } from '../models/Measure';
import { recognizeImageValue } from '../services/geminiService';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // ... (validações existentes) ...

    const recognizedValue = await recognizeImageValue(image);

    const uuid = uuidv4();
    // Gera uma URL única usando Picsum Photos
    const imageUrl = `https://picsum.photos/seed/${uuid}/300/200`;

    const newMeasure = new Measure({
      customerCode: customer_code,
      measureDatetime: measure_datetime,
      measureType: measure_type,
      measureValue: recognizedValue,
      imageUrl,
      uuid
    });

    await newMeasure.save();

    res.status(200).json({
      image_url: imageUrl,
      measure_value: recognizedValue,
      measure_uuid: uuid
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Internal server error' });
  }
};