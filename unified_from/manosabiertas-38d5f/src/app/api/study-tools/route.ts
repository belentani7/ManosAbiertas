import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export const runtime = 'nodejs';
export const maxDuration = 60;

interface StudyToolsRequest {
  tool: 'questions' | 'summary';
  content: string;
  title?: string;
  language?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: StudyToolsRequest = await req.json();
    const lang = body.language || 'es';

    if (!body.content || body.content.trim().length < 50) {
      return NextResponse.json(
        { ok: false, error: 'El contenido es demasiado corto para analizar' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();
    const content = body.content.slice(0, 5000); // Limit to 5000 chars

    let systemPrompt = '';
    let userPrompt = '';

    if (body.tool === 'questions') {
      systemPrompt = `Eres un profesor experto que crea preguntas de comprensión lectora para adultos. Las preguntas deben ser claras, prácticas y ayudar a retener la información. ${lang === 'es' ? 'Responde en español.' : 'Respond in the user language.'}`;

      userPrompt = `Basándote en el siguiente contenido, genera 3 preguntas de comprensión lectora. Las preguntas deben cubrir los puntos más importantes del texto.

Título del contenido: ${body.title || 'Contenido educativo'}

Contenido:
${content}

Formato de respuesta (devuelve SOLO el JSON, sin markdown):
{
  "questions": [
    { "question": "...", "hint": "Pista breve para responder" },
    { "question": "...", "hint": "..." },
    { "question": "...", "hint": "..." }
  ]
}`;
    } else if (body.tool === 'summary') {
      systemPrompt = `Eres un experto en síntesis de información para adultos. Creas resúmenes claros y concisos que capturan las ideas principales. ${lang === 'es' ? 'Responde en español.' : 'Respond in the user language.'}`;

      userPrompt = `Resume el siguiente contenido en máximo 5 puntos clave. Cada punto debe ser una frase corta y accionable.

Título: ${body.title || 'Contenido'}

Contenido:
${content}

Formato: lista numerada, cada punto en una línea, máximo 15 palabras por punto.`;
    }

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      thinking: { type: 'disabled' },
    });

    const text = completion.choices[0]?.message?.content?.trim() || '';

    return NextResponse.json({ text, ok: true, tool: body.tool });
  } catch (error: unknown) {
    console.error('Study tools API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { ok: false, error: message, text: '' },
      { status: 500 }
    );
  }
}
