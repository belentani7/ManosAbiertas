import {
  buildEuropassText,
  downloadCvDocx,
  downloadCvEuropass,
  type CvExportEducation,
  type CvExportExperience,
  type CvExportModel,
} from './cv-docx-export';

export interface CreatorStudioProfile {
  fullName: string;
  profession: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  experiences: CvExportExperience[];
  education: CvExportEducation[];
  skills: string[];
  languages: string[];
}

export function createCreatorStudioCvModel(profile: CreatorStudioProfile): CvExportModel {
  return {
    fullName: profile.fullName ?? '',
    profession: profile.profession ?? '',
    email: profile.email ?? '',
    phone: profile.phone ?? '',
    address: profile.address ?? '',
    summary: profile.summary ?? '',
    experiences: (profile.experiences ?? []).map((experience) => ({ ...experience })),
    education: (profile.education ?? []).map((item) => ({ ...item })),
    skills: profile.skills ?? [],
    languages: profile.languages ?? [],
  };
}

export function exportCreatorStudioCv(model: CvExportModel, format: 'docx' | 'europass'): void {
  if (format === 'europass') {
    downloadCvEuropass(model);
    return;
  }
  downloadCvDocx(model);
}

export function buildCreatorStudioEuropassText(model: CvExportModel): string {
  return buildEuropassText(model);
}
