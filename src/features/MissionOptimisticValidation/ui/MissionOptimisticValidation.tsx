
import { ConfirmDialog } from "@shared/ui/ConfirmDialog";
import { useMissionValidation, type MissionValidationConfig } from "@shared/hooks/useMissionValidation";
import { PurpleMoonIcon } from "@shared/ui/PurpleMoonIcon";
import { type Mission } from "@shared/services/api/missions/types";

import * as S from './MissionOptimisticValidation.styles';

interface OptimisticValidationProps {
  url: string;
  icon?: React.ReactNode;
  title: string;
  children: (isCompleted: boolean, isLoading: boolean) => React.ReactNode;
  modalDescription: string;
  incompleteModalDescription: string;
  incompleteModalTitle?: string;
  modalTitle: string;
  modalConfirm: string;
  style?: React.CSSProperties;
  mission: Mission;
  config: MissionValidationConfig;
}

/**
 * Component that handles mission validation and displays a confirmation dialog.
 *
 * @param {OptimisticValidationProps} props - Component properties.
 * @returns {ReactElement} - Rendered component.
 */
export const MissionOptimisticValidation: React.FC<OptimisticValidationProps> = ({
  url,
  icon,
  title,
  children,
  modalDescription,
  modalTitle,
  modalConfirm,
  incompleteModalDescription,
  incompleteModalTitle = 'Sorry...',
  style,
  mission,
  config,
}) => {
  const {
    isCompleted,
    isValidating,
    isOpen,
    handleClick,
    handleClose,
  } = useMissionValidation({
    title,
    mission,
    url,
    config
  });

  const handleItemClick = () => {
    if (isCompleted) return;
    console.log('handleItemClick', [isCompleted, isValidating, isOpen]);
    return handleClick();
  }

  return (
    <>
      <div
        onClick={() => handleItemClick() }
        style={{
          cursor: 'pointer',
          display: 'flex',
          ...style,
        }}
      >
        {mission && children(isCompleted, isValidating)}
      </div>
      <ConfirmDialog
        buttonText={modalConfirm}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <S.ConfirmContent>
          {isCompleted ? icon : <PurpleMoonIcon/>}
          <S.ConfirmTitle>{isCompleted ? modalTitle : incompleteModalTitle}</S.ConfirmTitle>
          <S.ConfirmDescription>{isCompleted ? modalDescription : incompleteModalDescription}</S.ConfirmDescription>
        </S.ConfirmContent>
      </ConfirmDialog>
    </>
  );
};