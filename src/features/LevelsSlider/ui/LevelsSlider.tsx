import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $gameState, $level } from '@app/stores/state';
import { formatNumberGroup } from '@shared/utils/formatters';
import { LEVELS } from '@shared/services/websocket/clicker';

import { ProgressBar } from '@shared/ui/ProgressBar';
import { SecretStash } from '@features/SecretStash';

import * as S from './LevelsSlider.styles';

export const LevelsSlider = () => {
  const clickerState = $gameState.get();
  // TODO fix this hotfix
  const currentLevel = useStore($level);
  const { name: currentLevelName } = useStore(clickerState.levelDef);
  const quarks = useStore(clickerState.quarks);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const { t } = useTranslation('global');
  const isLastLevel = selectedLevel === LEVELS.length;

  useEffect(() => {
    setSelectedLevel(currentLevel);
  }, [currentLevelName]);

  const handleClickBtnPrev = () => {
    if (selectedLevel > 1) {
      setSelectedLevel((prev) => prev - 1);
    }
  };

  const handleClickBtnNext = () => {
    if (selectedLevel < LEVELS.length) {
      setSelectedLevel((prev) => prev + 1);
    }
  };

  const selectedLevelDef = LEVELS[selectedLevel - 1] || LEVELS[0];
  const { name } = selectedLevelDef;

  const isDisabledPrevButton = selectedLevel <= 1;
  const isDisabledNextButton = selectedLevel === LEVELS.length;
  const levelProgress = (quarks / selectedLevelDef.quarksToUpgrade) * 100;

  // TODO вынести кнопки слайдера в компонент кнопки

  return (
    <S.Root>
      <S.LevelsSlider>
        <S.LevelsSliderNavButton variant="prev" onClick={handleClickBtnPrev} disabled={isDisabledPrevButton}>
          <S.LevelsSliderNavButtonIcon />
        </S.LevelsSliderNavButton>

        <S.Level>
          <S.Title>
            {isLastLevel ? <SecretStash string={t(name)} /> : t(name)}
          </S.Title>
          <S.Description>
            {`${formatNumberGroup(quarks)}/${formatNumberGroup(selectedLevelDef.quarksToUpgrade)}`}
          </S.Description>
        </S.Level>

        <S.LevelsSliderNavButton variant="next" onClick={handleClickBtnNext} disabled={isDisabledNextButton}>
          <S.LevelsSliderNavButtonIcon />
        </S.LevelsSliderNavButton>
      </S.LevelsSlider>
      <ProgressBar levelProgress={levelProgress} />
    </S.Root>
  );
};