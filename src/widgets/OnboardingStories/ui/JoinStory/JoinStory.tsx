import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initUtils } from '@telegram-apps/sdk-react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $subscribed } from '@app/stores/state';
import { queryClient } from '@shared/services/api/queryClient';
import { useGetUserData } from '@shared/services/api/user/model';
import { initDataRaw } from '@app/stores/telegram';

import { StoryHeader, StorySeeMore } from '../Story';
import * as S from './JoinStory.styles';
import bg6 from '@shared/assets/stories/bg6.jpg';

const FollowButton: React.FC = () => {
    const rawData = initDataRaw || '';
    const { t } = useTranslation('stories');
    const navigate = useNavigate();
    const utils = initUtils();
    const subscriptionStatus = useStore($subscribed);
    const [loading, setLoading] = useState(false)
    const [buttonText, setButtonText] = useState(subscriptionStatus ? t('join.go') : t('join.follow'))
    const { data: userResponseData } = useGetUserData({ enabled: !!rawData, variables: { rawData } });
    const retryCountRef = useRef(0);

    const ctxFollow = () => {
        setButtonText(t('join.follow'));
        setLoading(false);
    }

    const ctxVerifying = () => {
        setButtonText(t('join.verifying'));
        setLoading(true);

        utils.openTelegramLink('https://t.me/tonstarsdao');
        runSubscriptionVerification();
    }

    const ctxGo = () =>{
        setButtonText(t('join.go'));
        setLoading(false);
    }

    const handleSuccessfulSubscription = () => {
        retryCountRef.current = 0;
        $subscribed.set(true);
        ctxGo();
        navigate('/');
    };

    const handleUnsuccessfulSubscription = () => {
        retryCountRef.current = 0;
        $subscribed.set(false);
        ctxFollow();
    }

    const runSubscriptionVerification = () => {
        retryCountRef.current++;

        if (retryCountRef.current >= 3) return handleUnsuccessfulSubscription();

        queryClient
            .refetchQueries({ queryKey: ['get/userData'] }, { cancelRefetch: false })
            .then(() => {
                if (!userResponseData?.user?.can_play) 
                    return setTimeout(() => runSubscriptionVerification(), 3000);

                handleSuccessfulSubscription();
            })
    }

    const handleClick = () => {
        subscriptionStatus
            ? navigate('/')
            : ctxVerifying();
    }

    return (
        <StorySeeMore style={{ pointerEvents: 'auto', zIndex: 2, marginTop: '2.5rem' }} as="button" disabled={loading} loading={loading} onClick={handleClick}><S.Icon />{buttonText}</StorySeeMore>
    );
};

const Header: React.FC = () => {
    const { t } = useTranslation('stories');

    return (
        <StoryHeader justify="center" title={t('join.title')} description={t('join.description')}>
            <FollowButton />
        </StoryHeader>
    );
};

export const joinStoryConfig = {
    url: bg6,
    type: 'image',
    header: Header,
    seeMore: null,
    onSeeMoreClick: null,
};