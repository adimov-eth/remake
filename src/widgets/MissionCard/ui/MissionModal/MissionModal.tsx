import { FC, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCopyToClipboard } from 'usehooks-ts';

import { Modal } from '@shared/ui/Modal';
import { formatNumber } from '@shared/utils/formatters';
import QuarkIcon from '@shared/assets/quark.svg?react';
import StarIcon from '@shared/assets/star-gradient.svg?react';
import UserIcon from '@shared/assets/user.svg?react';
import {
  MissionProgressStatus,
  MissionRequirements,
  MissionStatus,
} from '@shared/services/api/missions/types';
import { useClickNotification, useShareRefferalLink } from '@shared/hooks';
import * as S from './MissionModal.styles';

interface IMissionModalProps {
  open: boolean
  icon: ReactNode
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

  const getButtonText = useMemo(() => {
    switch (status) {
    case MissionProgressStatus.NOT_STARTED:
      return t('start_mission');
    case MissionProgressStatus.IN_PROGRESS:
      return t('lets_go');
    case MissionProgressStatus.COMPLETE:
      return t('claim');
    default:
      return t('claimed');
    }
  }, [status]);

  const handleButtonClick = async () => {
    if (status === MissionProgressStatus.IN_PROGRESS) {
      try {
        const parsedRequirements: MissionRequirements = JSON.parse(requirements);

        for (const key of Object.keys(parsedRequirements)) {
          switch (key) {
          case 'referrals_count':
            await handleCopy(refUrl);
            break;
          case 'quarks_count':
            navigate('/');
            break;
          case 'level':
            navigate('/');
            break;
          case 'clicks_count':
            navigate('/');
            break;
          case 'quarks_spent_on_upgrades':
            navigate('/accelerators');
            break;
          case 'join_before':
            navigate('/profile');
            break;
          case 'daily_login':
            navigate('/profile');
            break;
          default:
            console.log(`Unknown requirement: ${key}`);
          }
        }
      } catch (error) {
        console.error('Failed to parse requirements:', error);
      }
    } else {
      onButtonClick();
    }
  };

  const isShowQuarks = Boolean(amountQuarks);
  const isShowStars = Boolean(amountStars);

  return (
    <Modal open={open} onClose={onClose}>
      <S.Content>
        <S.Icon>{icon || <UserIcon />}</S.Icon>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Reward>
          {isShowQuarks && (
            <S.Currency>
              <QuarkIcon />
              <S.Value>{formatNumber(amountQuarks)}</S.Value>
            </S.Currency>
          )}
          {isShowStars && (
            <S.Currency>
              <StarIcon />
              <S.Value>{formatNumber(amountStars)}</S.Value>
            </S.Currency>
          )}
        </S.Reward>
        <S.Button onClick={handleButtonClick} disabled={loading}>
          {loading ? t('loading') : getButtonText}
        </S.Button>
      </S.Content>
    </Modal>
  );
};
