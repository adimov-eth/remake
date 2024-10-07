import * as S from './ProgressBar.styles';

export const ProgressBar = ({
  levelProgress,
}: {
  levelProgress: number
}) => {
  return (
    <S.Root>
      <S.ProgressFill style={{ width: `${levelProgress}%`}}/>
    </S.Root>
  );
};
