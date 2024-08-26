import React from 'react'
import { styled } from '@/core/stitches.config'
import { formatNumberGroup, toRoman } from '@/utils/formatters.ts'
import acceleratorIcons from "@/assets/accelerators/index.ts"
import currencyIcons from "@/assets/currency/index.ts"

type Card = {
    disabled: boolean;
    slug: string;
    name: string;
    tier: number; // >0
    description: string;
    price: number;
    currency: 'QRK' | 'STR';
  };  

const Card: React.FC<Card> = ({ disabled, slug, name, tier, description, price, currency }) => {
    if (disabled) slug = 'locked'
    return (
        <$Card disabled={disabled}>
            <Icon image={slug} />
            <Title>{name}</Title>
            <Tier>{toRoman(tier)}</Tier>
            <Description>{description}</Description>
            <Divider />
            <Price>
                <CurrencyIcon currency={currency} />
                <Value price={price} />
            </Price>
        </$Card>
    );
};

export default Card


const $Icon = styled('div', {
    background: '#1C1F30',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    marginBottom: '10px',
});

const Icon: React.FC<{ image: string | null }> = ({ image }) => {
    const imagePath = acceleratorIcons[image as keyof typeof acceleratorIcons ]
    return (
        <$Icon>
            <img src={imagePath} alt={image || 'Unknown'} width="48" height="48" />
        </$Icon>
    );
};

const Title = styled('div', {
    fontFamily: '$proDisplay',
    fontSize: '16px',
    lineHeight: 1,
    fontWeight: 600,
    textAlign: 'center',
    color: 'white',
})

const Tier = styled('div', {
    fontFamily: '$proDisplay',
    fontSize: '12px',
    lineHeight: 1,
    minHeight: '12px',
    fontWeight: 400,
    color: '#67718C',
    textAlign: 'center',
    margin: '4px auto 12px auto',
})

const Description = styled('div', {
    fontFamily: '$proDisplay',
    fontSize: '14px',
    fontWeight: 400,
    minHeight: '48px',
    color: '#67718C',
    textAlign: 'center',
})

const Divider = styled('div', {
    width: '100%',
    height: '1px',
    backgroundColor: '$grey200',
    margin: '16px 0'
})

const Price = styled('div', {
    display: 'flex',    
    flexDirection: 'row',
    gap: '8px',
})

const $Value = styled('div', {
    fontFamily: '$mono', 
    fontSize: '14px',
    fontWeight: '500',
    color: '$textActive',
})

const Value: React.FC<{ price: number }> = ({ price }) => {
    return (
        <$Value>{formatNumberGroup(price)}</$Value>
    );
};


const $Card = styled('div', {
    backgroundColor: '#14151E',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 16px 16px 16px',

    background: 'rgba(43, 46, 69, 0.3)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(24px)',

    variants: {
        disabled: {
          true: {
            opacity: 0.5,
            pointerEvents: 'none'
          },
        },
      },
})


const $CurrencyIcon = styled('div', {
    width: '16px',
    height: '16px',
    backgroundColor: '$gray-200',
})

const CurrencyIcon: React.FC<{ currency: 'QRK' | 'STR' }> = ({ currency }) => {
    const imagePath = currencyIcons[currency as keyof typeof currencyIcons]
    return (
        <$CurrencyIcon>
            <img src={imagePath} alt={currency} width="16" height="16" />
        </$CurrencyIcon>
    );
};

