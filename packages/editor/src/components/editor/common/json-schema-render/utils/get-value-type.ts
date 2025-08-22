export const getValueType = (value: any) => {
  const type = typeof value;
  return type === 'object' ? (Array.isArray(value) ? 'array' : 'object') : type;
};