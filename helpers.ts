export function format (value: number) {
  return "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function toArray(obj: object){
  return Object.values(obj);
}
