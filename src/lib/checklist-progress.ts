/**
 * Cuenta solo los documentos de la categoría mostrada.
 * Las marcas de otras listas nunca aumentan el porcentaje actual.
 */
export function calculateChecklistProgress(
  items: readonly { id: string }[],
  checkedItems: Readonly<Record<string, boolean>>,
): { done: number; total: number; percent: number } {
  const ids = new Set(items.map((item) => item.id));
  const total = ids.size;
  let done = 0;
  for (const id of ids) {
    if (checkedItems[id] === true) done += 1;
  }
  return {
    done,
    total,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}
