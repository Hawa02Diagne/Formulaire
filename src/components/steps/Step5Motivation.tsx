import TextAreaField from '../TextAreaField';
import { FormData } from '../../types';

interface Props {
  data: FormData;
  update: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function Step5Motivation({ data, update, errors }: Props) {
  return (
    <div className="step-content space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-navy-800 mb-1">Motivation et projet professionnel</h3>
        <p className="text-sm text-gray-500 mb-4">Parlez-nous de vous et de vos ambitions.</p>
      </div>

      <TextAreaField
        label="Lettre de motivation"
        required
        value={data.motivation}
        onChange={(v) => update('motivation', v)}
        error={errors.motivation}
        rows={5}
        maxLength={1000}
        placeholder="Expliquez pourquoi vous souhaitez rejoindre SBS School et ce qui vous motive pour cette formation..."
      />

      <TextAreaField
        label="Projet professionnel"
        required
        value={data.projetProfessionnel}
        onChange={(v) => update('projetProfessionnel', v)}
        error={errors.projetProfessionnel}
        rows={5}
        maxLength={1000}
        placeholder="Décrivez votre projet professionnel, vos objectifs de carrière et comment cette formation vous aidera à les atteindre..."
      />
    </div>
  );
}
