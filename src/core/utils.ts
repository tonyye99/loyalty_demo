export async function calculatePoints(
  spentAmount: number,
  perPoint: number,
): Promise<number> {
  return spentAmount * perPoint
}

export function calculateOrderTotal(
  items: { price: number; quantity: number }[],
): number {
  let total = 0
  for (const item of items) {
    total += item.price * item.quantity
  }
  return total
}
