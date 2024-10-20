import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCopyToClipboard } from 'usehooks-ts';

import { formatNumber } from '@shared/utils/formatters';
import { Modal } from '@shared/ui/Modal';
import { Avatar } from '@shared/ui/Avatar';
import { Button } from '@shared/ui/Button';
import { MissionProgressStatus, MissionRequirements, MissionStatus } from '@shared/services/api/missions/types';
import { useClickNotification, useShareRefferalLink } from '@shared/hooks';
import * as S from './MissionModal.styles';

interface IMissionModalProps {
  open: boolean
  icon: string | null | undefined
  onClose: () => void
  title: string
  description: string
  onButtonClick: () => void
  status: MissionStatus.UNAVAILABLE | MissionProgressStatus
  amountQuarks: number
  amountStars: number
  loading: boolean
  requirements: string
}

export const MissionModal: FC<IMissionModalProps> = ({
  open,
  onClose,
  icon,
  title,
  description,
  onButtonClick,
  status,
  amountQuarks,
  amountStars,
  loading,
  requirements,
}: IMissionModalProps) => {
  const navigate = useNavigate();

  const { handleShare, buildShareUrl } = useShareRefferalLink();

  const { notifyUser } = useClickNotification('');
  const [, copy] = useCopyToClipboard();

  const refUrl = buildShareUrl() || '';

  const handleCopy = async (text: string) => {
    try {
      await copy(text);
      notifyUser();
      handleShare();
    } catch (error) {
      console.error('Failed to copy!', error);
    }
  };

  const { t } = useTranslation('global');
  
  const requirementActions: { [key: string]: () => void } = {
    referrals_count: () => handleCopy(refUrl),
    daily_friends_invited: () => handleCopy(refUrl),
    daily_quarks_swapped: () => navigate('/swap'),
    quarks_count: () => navigate('/'),
    daily_quarks_tapped: () => navigate('/'),
    daily_clicks_tapped: () => navigate('/'),
    level: () => navigate('/'),
    clicks_count: () => navigate('/'),
    daily_boosts_bought: () => navigate('/accelerators'),
    quarks_spent_on_upgrades: () => navigate('/accelerators'),
    join_before: () => navigate('/profile'),
    daily_login: () => navigate('/profile'),
  };
  
  const handleButtonClick = async () => {
    if (status === MissionProgressStatus.IN_PROGRESS) {
      try {
        const parsedRequirements: MissionRequirements = JSON.parse(requirements);
        Object.keys(parsedRequirements).forEach( (key: string) => {
          requirementActions[key]?.();
        });
      } catch (error) {
        console.error('Failed to parse requirements:', error);
      }
    } else {
      onButtonClick();
    }
  };

  const isShowQuarks = Boolean(amountQuarks);
  const isShowStars = Boolean(amountStars);
  const btnText = useMemo(() => {
    switch (true) {
    case loading:
      return t('loading');
    case status === MissionProgressStatus.NOT_STARTED:
      return t('start_mission');
    case status === MissionProgressStatus.IN_PROGRESS:
      return t('lets_go');
    case status === MissionProgressStatus.COMPLETE:
      return t('claim');
    default:
      return t('claimed');
    }
  }, [status, loading]);


  return (
    <Modal open={open} onClose={onClose}>
      <S.Content>
        <Avatar src={icon} size={112}/>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        {isShowQuarks && (
          <S.Reward variant='quark'>
            {formatNumber(amountQuarks)}
          </S.Reward>
        )}
        {isShowStars && (
          <S.Reward variant='star'>
            {formatNumber(amountStars)}
          </S.Reward>
        )}
        <Button 
          onClick={handleButtonClick} 
          disabled={loading}
          variant='primary'
          size='large'
        >
          {btnText}
        </Button>
      </S.Content>
    </Modal>
  );
};
