import * as S from './GlitchyText.styles'


export const GlitchyText: React.FC<React.HTMLAttributes<HTMLSpanElement> & { children: string }> = ({ children, ...props }) => {
    return (
        <S.GlitchyTextWrapper data-text={children} {...props}>
            <span>{children}</span>
        </S.GlitchyTextWrapper>
    );
}