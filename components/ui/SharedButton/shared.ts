export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

export type ButtonColor = 'neutral' | 'primary' | 'secondary' | 'success' | 'danger';

type ButtonColorStyles = {
  solid: string;
  outline: string;
  ghost: string;
  link: string;
};

// 🎨 Definición central de colores (una sola vez)
export const BUTTON_COLOR_CLASSES: Record<ButtonColor, ButtonColorStyles> = {
  primary: {
    solid: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    ghost: 'text-blue-500 hover:bg-blue-50',
    link: 'text-blue-500 underline hover:text-blue-600'
  },
  neutral: {
    solid: 'bg-slate-500 text-white hover:bg-slate-600',
    outline: 'border border-slate-500 text-slate-500 hover:bg-slate-500 hover:text-white',
    ghost: 'text-slate-500 hover:bg-slate-50',
    link: 'text-slate-500 underline hover:text-slate-600'
  },
  secondary: {
    solid: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white',
    ghost: 'text-gray-500 hover:bg-gray-50',
    link: 'text-gray-500 underline hover:text-gray-600'
  },
  success: {
    solid: 'bg-green-500 text-white hover:bg-green-600',
    outline: 'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
    ghost: 'text-green-500 hover:bg-green-50',
    link: 'text-green-500 underline hover:text-green-600'
  },
  danger: {
    solid: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
    ghost: 'text-red-500 hover:bg-red-50',
    link: 'text-red-500 underline hover:text-red-600'
  }
};

// 🔥 Mantienes la función (pero mejorada)
export function buttonColorClass(color: ButtonColor, variant: ButtonVariant) {
  return BUTTON_COLOR_CLASSES[color][variant];
}
