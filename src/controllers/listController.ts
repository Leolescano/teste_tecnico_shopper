import { Request, Response } from 'express';
import { Measure } from '../models/Measure';

export const listMeasures = async (req: Request, res: Response) => {
  try {
    const { customerCode } = req.params;
    const { measure_type } = req.query;

    if (measure_type && typeof measure_type === 'string' && !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
      return res.status(400).json({ error_code: 'INVALID_TYPE', error_description: 'Tipo de medição não permitida' });
    }

    const query: any = { customerCode };
    if (measure_type) {
      query.measureType = measure_type.toString().toUpperCase();
    }

    const measures = await Measure.find(query);

    if (measures.length === 0) {
      return res.status(404).json({ error_code: 'MEASURES_NOT_FOUND', error_description: 'Nenhuma leitura encontrada' });
    }

    const formattedMeasures = measures.map(measure => ({
      measure_uuid: measure.uuid,
      measure_datetime: measure.measureDatetime,
      measure_type: measure.measureType,
      has_confirmed: measure.confirmed,
      image_url: measure.imageUrl
    }));

    res.status(200).json({
      customer_code: customerCode,
      measures: formattedMeasures
    });
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error_code: 'SERVER_ERROR', error_description: 'Internal server error' });
  }
};