import React from 'react';
import { cn } from '../../../lib/utils';

interface ChessAvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    borderColor?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE_CLASSES = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36'
};

export function ChessAvatar({
                            src,
                            alt,
                            className,
                            borderColor = '#262421',
                            size,
                            style,
                            ...props
                            }: ChessAvatarProps) {
return (
        <img
            src={src}
            alt={alt}
            className={cn(
                "rounded-full object-cover border-4 bg-[#262421] shadow-xl",
                size && SIZE_CLASSES[size],
                className
            )}
            style={{ borderColor, ...style }}
            onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://www.chess.com/bundles/web/images/user-image.svg";
            }}
            {...props}
        />
    );
}