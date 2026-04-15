export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';

export type ButtonColor = 'neutral' | 'primary' | 'secondary' | 'success' | 'danger';

type ButtonColorStyles = {
  solid: string;
  outline: string;
  ghost: string;
  link: string;
};

export const BUTTON_COLOR_CLASSES: Record<ButtonColor, ButtonColorStyles> = {
  primary: {
    solid: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
    ghost: 'text-primary-600 hover:bg-primary-600/10',
    link: 'text-primary-600 underline hover:text-primary-700'
  },

  neutral: {
    solid: 'bg-slate-500 text-white hover:bg-slate-600',
    outline: 'border border-slate-500 text-slate-500 hover:bg-slate-500 hover:text-white',
    ghost: 'text-slate-500 hover:bg-slate-50',
    link: 'text-slate-500 underline hover:text-slate-600'
  },

  secondary: {
    solid: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white',
    ghost: 'text-purple-600 hover:bg-purple-600/10',
    link: 'text-purple-600 underline hover:text-purple-700'
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

export function buttonColorClass(color: ButtonColor, variant: ButtonVariant) {
  return BUTTON_COLOR_CLASSES[color][variant];
}

export const BUTTON_SHADOW_CLASSES: Record<ButtonColor, string> = {
  primary: 'hover:shadow-primary-500/30',
  secondary: 'hover:shadow-secondary/30',
  neutral: 'hover:shadow-slate-500/30',
  success: 'hover:shadow-green-500/30',
  danger: 'hover:shadow-red-500/30'
};

export function buttonShadowColor(color: ButtonColor) {
  return BUTTON_SHADOW_CLASSES[color];
}
