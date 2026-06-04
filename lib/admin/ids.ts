export function newMenuItemId() {
  return `item_${Math.random().toString(36).slice(2, 10)}`
}

export function newMenuSectionId() {
  return `section_${Math.random().toString(36).slice(2, 8)}`
}

export function newReservationId() {
  return `res_${Date.now().toString(36)}`
}
