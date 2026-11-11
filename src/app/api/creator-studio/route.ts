import { createCreatorStudioCvModel, type CreatorStudioProfile } from '../../../lib/creator-studio';

export async function GET() {
  return Response.json({
    status: 'ok',
    product: 'manos-abiertas',
    module: 'creator-studio',
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreatorStudioProfile;
  const cv = createCreatorStudioCvModel(body);
  return Response.json({ ok: true, cv });
}
