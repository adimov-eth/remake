import { Button } from '@shared/ui/Button';
import { Link } from '@shared/ui/Link';

import * as S from './CrashCard.styles';
import PlanetPng from '@shared/assets/crash/planet.png';

export const CrashCard = () => {
  return (
    <S.Root>
      <img src={PlanetPng} alt="planet" width={48} height={48} />
      <S.Content>
        <S.Title>New</S.Title>
        <S.Description>Crash game</S.Description>
      </S.Content>
      <Button 
        as={Link} 
        to="/crash"
        wide={false}
        rounded="lg"
        size="large"
        variant="accent"
      >
        Play
      </Button>
    </S.Root>
  );
};
