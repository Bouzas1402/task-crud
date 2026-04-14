export type ButtonColor = 'neutral' | 'primary' | 'secondary' | 'success' | 'danger';

export const BUTTON_COLOR_CLASSES: Record<ButtonColor, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600',
  neutral: 'bg-slate-500 hover:bg-slate-600',
  secondary: 'bg-gray-500 hover:bg-gray-600',
  success: 'bg-green-500 hover:bg-green-600',
  danger: 'bg-red-500 hover:bg-red-600'
};

export function buttonColorClass(color: ButtonColor) {
  return BUTTON_COLOR_CLASSES[color];
}
