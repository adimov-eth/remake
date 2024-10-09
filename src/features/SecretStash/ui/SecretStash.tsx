import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetMissions, claimMissionReward } from '@shared/services/api/missions/model';
import { initDataRaw } from '@app/stores/telegram';
import { useModal } from '@shared/hooks';

import { GlitchyText } from '@shared/ui/GlitchyText';
import { CongratulationsDialog } from '@features/CongratulationsDialog';

interface SecretStashProps {
  string: string
}

const MISSION_SLUG = 'secret_stash';

export const SecretStash: React.FC<SecretStashProps> = ({ string }) => {
  const rawData = initDataRaw || '';
  const { data: missions, refetch } = useGetMissions({ enabled: !!rawData, variables: { rawData } });
  const { id, reward_quarks, progress_status, status } = missions?.find(({ slug }) => slug === MISSION_SLUG) || {};
  const isMissionAvailable = progress_status !== 'claimed_reward' && status !== 'unavailable';

  const { t } = useTranslation('global');
  const [isOpen, openModal, closeModal] = useModal();

  const handleClick = () => {
    claimMissionReward({ missionId: id || '', rawData: rawData });
    openModal();
  };

  const handleClose = () => {
    refetch();
    closeModal();
  };

  if (!isMissionAvailable) return string;

  const renderTextWithGlitch = (text: string, wordNumber: number, letterNumber: number) => {
    const words = text.split(' ');
    const wordIndex = wordNumber - 1;
    const letterIndex = letterNumber - 1;

    if (wordIndex < 0 || wordIndex >= words.length) return null;

    const before = words.slice(0, wordIndex).join(' ') + (wordIndex > 0 ? ' ' : '');
    const word = words[wordIndex];
    const after = (wordIndex < words.length - 1 ? ' ' : '') + words.slice(wordIndex + 1).join(' ');

    if (letterIndex < 0 || letterIndex >= word.length) return null;

    const beforeLetter = word.slice(0, letterIndex);
    const letter = word[letterIndex];
    const afterLetter = word.slice(letterIndex + 1);

    return (
      <>
        {before}{beforeLetter}
        <GlitchyText onClick={handleClick}>{letter}</GlitchyText>
        {afterLetter}{after}
      </>
    );
  };

  const textWithGlitch = renderTextWithGlitch(string, 2, 2);

  return (
    <>
      {textWithGlitch}
      <CongratulationsDialog
        missionName={t('secret_stash')}
        reward={reward_quarks}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
};