import { ReactNode } from 'react';
import { ContainerProps as MuiContainerProps } from '@mui/material/Container';

export type ContainerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export type ContainerVariant = 'fluid' | 'fixed' | 'constrained';

export interface ContainerProps extends Omit<MuiContainerProps, 'maxWidth'> {
  /**
   * The content of the container
   */
  children: ReactNode;
  
  /**
   * Variant of the container
   */
  variant?: ContainerVariant;
  
  /**
   * Maximum width of the container
   */
  maxWidth?: ContainerMaxWidth;
  
  /**
   * If true, the container will be centered
   */
  centered?: boolean;
  
  /**
   * If true, the container will have gutters (left and right padding)
   */
  disableGutters?: boolean;
  
  /**
   * If true, the container will take the full width
   */
  fluid?: boolean;
  
  /**
   * Custom padding for the container
   */
  padding?: number | string;
  
  /**
   * Custom margin for the container
   */
  margin?: number | string;
  
  /**
   * Background color of the container
   */
  bgcolor?: string;
  
  /**
   * Minimum height of the container
   */
  minHeight?: number | string;
  
  /**
   * Maximum height of the container
   */
  maxHeight?: number | string;
  
  /**
   * If true, the container will have a subtle border
   */
  bordered?: boolean;
  
  /**
   * If true, the container will have rounded corners
   */
  rounded?: boolean;
  
  /**
   * Shadow level (0-24)
   */
  elevation?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom styles
   */
  sx?: object;
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  
  /**
   * ARIA described by for accessibility
   */
  'aria-describedby'?: string;
  
  /**
   * Role for accessibility
   */
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
  /**
   * Default maximum widths for each breakpoint
   */
  maxWidths: Record<string, number>;
  
  /**
   * Default gutters for each breakpoint
   */
  gutters: Record<string, number>;
  
  /**
   * Responsive breakpoints
   */
  breakpoints: ResponsiveBreakpoints;
}