import type { ContainerProps as MuiContainerProps } from '@mui/material/Container';
import type { ReactNode } from 'react';

export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export type ContainerVariant = 'fluid' | 'fixed' | 'constrained';

export interface ContainerProps extends Omit<MuiContainerProps, 'maxWidth'> {
  children: ReactNode;
  
  variant?: ContainerVariant;
  
  maxWidth?: ContainerMaxWidth;
  
  centered?: boolean;
  
  disableGutters?: boolean;
  
  fluid?: boolean;
  
  padding?: number | string;
  
  margin?: number | string;
  
  bgcolor?: string;
  
  minHeight?: number | string;
  
  maxHeight?: number | string;
  
  bordered?: boolean;
  
  rounded?: boolean;
  
  elevation?: number;
  
  className?: string;
  
  sx?: object;
  
  'aria-label'?: string;
  
  'aria-describedby'?: string;
  
  role?: string;
}

export interface ContainerStyleProps {
  variant: ContainerVariant;
  maxWidth: ContainerMaxWidth;
  centered: boolean;
  disableGutters: boolean;
  fluid: boolean;
  bordered: boolean;
  rounded: boolean;
  elevation: number;
  bgcolor?: string;
  padding?: number | string;
  margin?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}

export interface ResponsiveBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ContainerConfiguration {
  maxWidths: Record<string, number>;
  
  gutters: Record<string, number>;
  
  breakpoints: ResponsiveBreakpoints;
}