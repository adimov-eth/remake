// This code shared with backend

import { atom, computed } from 'nanostores';

import { intervalStore, addDecimals } from './utils';

export type LevelDefinition = {
  name: string;
  energy: number;
  quarksToUpgrade: number;
  quarksPerClick: number;
};

// TODO Уровни должны приходить из бэка

export const LEVELS: LevelDefinition[] = [
  { 
    name: 'protostar', 
    energy: 500, 
    quarksToUpgrade: 1000, 
    quarksPerClick: 1 
  },
  {
    name: 'brown_dwarf',
    energy: 750,
    quarksToUpgrade: 5000,
    quarksPerClick: 2,
  },
  {
    name: 'red_dwarf',
    energy: 1000,
    quarksToUpgrade: 10000,
    quarksPerClick: 2,
  },
  {
    name: 'white_dwarf',
    energy: 1500,
    quarksToUpgrade: 50000,
    quarksPerClick: 3,
  },
  {
    name: 'red_giant',
    energy: 2000,
    quarksToUpgrade: 100000,
    quarksPerClick: 4,
  },
  {
    name: 'blue_giant',
    energy: 2500,
    quarksToUpgrade: 500000,
    quarksPerClick: 5,
  },
  {
    name: 'blue_supergiant',
    energy: 3000,
    quarksToUpgrade: 1000000,
    quarksPerClick: 6,
  },
  {
    name: 'neutron_star',
    energy: 3500,
    quarksToUpgrade: 5000000,
    quarksPerClick: 7,
  },
  {
    name: 'supernova',
    energy: 4000,
    quarksToUpgrade: 10000000,
    quarksPerClick: 8,
  },
  {
    name: 'black_hole',
    energy: 5000,
    quarksToUpgrade: 100000000,
    quarksPerClick: 10,
  },
] as const;

export type upgradeEffectUser = {
  quarks: number;
  quarksPerClick: number;
  clicksPerTap: number;
  level: number;
  energyLimit: number;
  energy: number;
  lastFreeRechargeAt: number;
  paidRechargesToday: number;
  lastPaidRechargeResetAt: number;
  megaClickExpiresAt: number;
};
type upgradeEffect = (user: upgradeEffectUser, tier: number) => upgradeEffectUser;

type RechargeStatus = {
  price: number;
  canRecharge: boolean;
  updatedLastFreeRechargeAt: number;
  updatedPaidRechargesToday: number;
  updatedLastPaidRechargeResetAt: number;
};

export type UpgradeDefinition = {
  name: string;
  description: string;
  attribute_type: 'energy' | 'energyLimit' | 'quarksPerClick' | 'clicksPerTap';
  tier: number;
  price: (user: upgradeEffectUser, tier: number) => number;
  passiveEffect: upgradeEffect;
  activeEffect: upgradeEffect;
  isEnabled: (user: upgradeEffectUser) => boolean;
};

const MAX_PAID_RECHARGES = 6;
const BASE_RECHARGE_PRICE = 250;
const EIGHT_HOURS_IN_MS = 8 * 60 * 60 * 1000;
const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;
const calcUpgradePrice = (basePrice: number, tier: number) => basePrice * (2 ** (tier - 1));

const getRechargeStatus = (user: upgradeEffectUser) => {
  const now = Date.now();

  // Инициализация переменных
  const lastFreeRechargeAt = user.lastFreeRechargeAt || 0;
  const paidRechargesToday = user.paidRechargesToday || 0;
  const lastPaidRechargeResetAt = user.lastPaidRechargeResetAt || 0;

  // Проверка доступности бесплатной перезарядки
  const freeRechargeAvailable = now - lastFreeRechargeAt >= EIGHT_HOURS_IN_MS;

  // Сброс платных перезарядок
  let currentPaidRecharges = paidRechargesToday;
  let updatedLastPaidRechargeResetAt = lastPaidRechargeResetAt;
  if (now - lastPaidRechargeResetAt >= TWENTY_FOUR_HOURS_IN_MS) {
    currentPaidRecharges = 0;
    updatedLastPaidRechargeResetAt = now;
  }

  let price: number | null = 0;
  let canRecharge = true;
  let updatedLastFreeRechargeAt = lastFreeRechargeAt;
  let updatedPaidRechargesToday = currentPaidRecharges;

  if (freeRechargeAvailable) {
    // Бесплатная перезарядка
    price = 0;
    updatedLastFreeRechargeAt = now;
  } else {
    if (currentPaidRecharges >= MAX_PAID_RECHARGES) {
      // Достигнут максимум платных перезарядок
      price = null; // Цена недоступна
      canRecharge = false;
    } else {
      // Платная перезарядка
      price = calcUpgradePrice(BASE_RECHARGE_PRICE, 1);
      updatedPaidRechargesToday += 1;
    }
  }

  return {
    price,
    canRecharge,
    updatedLastFreeRechargeAt,
    updatedPaidRechargesToday,
    updatedLastPaidRechargeResetAt,
  } as RechargeStatus;
}


export const UPGRADES: { [key: string]: UpgradeDefinition } = {
  recharge: {
    name: 'Recharge',
    description: 'Fully restores energy.',
    attribute_type: 'energy',
    tier: 1,
    price(user: upgradeEffectUser, _tier: number) {
      const data = getRechargeStatus(user)
      return data.price;
    },
    activeEffect(user: upgradeEffectUser, _tier: number) {
      const status = getRechargeStatus(user);
      if (!status.canRecharge) return user;

      return {
        ...user,
        energy: user.energyLimit,
        lastFreeRechargeAt: status.updatedLastFreeRechargeAt,
        paidRechargesToday: status.updatedPaidRechargesToday,
        lastPaidRechargeResetAt: status.updatedLastPaidRechargeResetAt,
      };
    },
    passiveEffect(user: upgradeEffectUser, _tier: number) {
      return user;
    },
    isEnabled(user: upgradeEffectUser) {
      const status = getRechargeStatus(user);
      return status.canRecharge;
    },
  },
  energyBoost: {
    name: 'Increase Energy',
    description: 'Increases maximum energy by 500 units.',
    attribute_type: 'energyLimit',
    tier: 1,
    price: (_user, tier) => calcUpgradePrice(500, tier),
    activeEffect: (user, _tier) => {
      return user;
    },
    passiveEffect: (user, tier) => {
      const additionalEnergy = 500 * tier;
      const potentialEnergyLimit = user.energyLimit + additionalEnergy;
      const cappedEnergyLimit = Math.min(potentialEnergyLimit, 10000);

      return {
        ...user,
        energyLimit: cappedEnergyLimit,
      };
    },
    isEnabled: user => user.energyLimit < 10000
  },
  additionalTap: {
    name: '+1 Tap per Click',
    description: 'Adds an additional tap for every click.',
    attribute_type: 'clicksPerTap',
    tier: 1,
    price(_user: upgradeEffectUser, tier: number) {
      const basePrice = 250; // As per your cost table
      return calcUpgradePrice(basePrice, tier);
    },
    activeEffect: (user: upgradeEffectUser, _tier: number) => user,
    passiveEffect: (user: upgradeEffectUser, tier: number) => ({
      ...user,
      clicksPerTap: user.clicksPerTap + tier, // Each tier adds 1 tap
    }),
    isEnabled: () => true, // Unlimited maximum
  },
  megaClick: {
    name: 'Mega Click',
    description: 'Adds +1 quark for every click for 1 minute.',
    attribute_type: 'quarksPerClick',
    tier: 1,
    price(_user: upgradeEffectUser, tier: number) {
      const basePrice = 300; // As per your cost table
      return calcUpgradePrice(basePrice, tier);
    },
    activeEffect(user: upgradeEffectUser, _tier: number) {
      const now = Date.now();
      const duration = 60 * 1000; // 1 minute in milliseconds

      // Extend the effect duration
      const currentExpiration = user.megaClickExpiresAt || now;
      const newExpiration = currentExpiration > now ? currentExpiration + duration : now + duration;

      return {
        ...user,
        megaClickExpiresAt: newExpiration,
      };
    },
    passiveEffect(user: upgradeEffectUser, _tier: number) {
      const now = Date.now();
      const isActive = user.megaClickExpiresAt && user.megaClickExpiresAt > now;
      console.log('passiveEffect', [isActive, user]);
      if (isActive) {
        return {
          ...user,
          quarksPerClick: user.quarksPerClick + 1,
        };
      } else {
        return user;
      }
    },
    isEnabled(user: upgradeEffectUser) {
      const now = Date.now();
      const isActive = user.megaClickExpiresAt && user.megaClickExpiresAt > now;
      return !isActive;
    },
  },
  warpDrive: {
    name: 'Warp Drive',
    description: 'Allows you to spend all accumulated energy in one tap.',
    attribute_type: 'energy',
    tier: 1,
    price(_user: upgradeEffectUser, tier: number) {
      const basePrice = 250;
      return calcUpgradePrice(basePrice, tier);
    },
    activeEffect: (user, _tier) => {
      const gain = user.energy
      return {
        ...user,
        quarks: user.quarks + gain,
        energy: 0,
      }
    },
    passiveEffect: (user, _tier) => {
      return user
    },
    isEnabled: (user) => user.level > 0,
  },
};

export interface Action {
  type: 'click' | 'upgrade' | 'claim_reward' | 'swap_transaction';
  payload: Record<string, string | number>;
}

export interface SerializedUpgrade {
  slug: string;
  tier: number;
  prices?: number[];
}

export interface SerializedState {
  clicks: number;
  quarks: number;
  stars: number;
  level: number;
  energyReset: number;
  energyResetAt: number;
  upgrades: SerializedUpgrade[];
  profile_image?: string;
  lastFreeRechargeAt: number;
  paidRechargesToday: number;
  lastPaidRechargeResetAt: number;
  megaClickExpiresAt: number;
}

export const initClicker = (
  quarks: number = 0,
  stars: number = 0,
  clicks: number = 0,
  level: number = 1
) => {
  // things that are persisted
  const $clicks = atom<number>(clicks);
  const $proifle_image = atom<string | undefined>();
  const $quarks = atom<number>(quarks);
  const $stars = atom<number>(stars);
  const $level = atom<number>(level);
  const $upgrades = atom<SerializedUpgrade[]>([]);
  const $levelDef = computed($level, level => {
    const lvl = Math.min(Math.max(level - 1, 0), LEVELS.length - 1);

    return LEVELS[lvl];
  });

  const $levelProgress = computed([$level, $quarks], (currentLvl, currentQuarks) => {
    const levelDefIndex = Math.min(Math.max(currentLvl - 1, 0), LEVELS.length - 1);
    const currentLvlDef = LEVELS[levelDefIndex];
    const prevLvlDef =
      currentLvl > 1
        ? LEVELS[levelDefIndex - 1]
        : { energy: 0, quarksToUpgrade: 0, quarksPerClick: 0 };
    const currentLvlQuarks = currentQuarks - prevLvlDef.quarksToUpgrade;
    const currentLvlTotalQuarks = currentLvlDef.quarksToUpgrade - prevLvlDef.quarksToUpgrade;
    if (currentLvlQuarks < 0) {
      // if we spent quarks on upgrades, we still show progress to the next level
      return (currentQuarks / currentLvlDef.quarksToUpgrade) * 100;
    }
    return (currentLvlQuarks / currentLvlTotalQuarks) * 100;
  });

  const $energyLimit = computed([$levelDef, $upgrades], (levelDef, upgrades) => {
    const initialState: upgradeEffectUser = {
      energyLimit: levelDef.energy,
      quarksPerClick: $quarksPerClick.get(),
      clicksPerTap: 1,
      quarks: $quarks.get(),
      level: $level.get(),
      energy: $energy.get(),
      lastFreeRechargeAt: $lastFreeRechargeAt.get(),
      paidRechargesToday: $paidRechargesToday.get(),
      lastPaidRechargeResetAt: $lastPaidRechargeResetAt.get(),
      megaClickExpiresAt: $megaClickExpiresAt.get(),
    };
    const upgradesWithQuarksPerClick = upgrades.filter(
      upgrade => UPGRADES[upgrade.slug].attribute_type === 'energyLimit'
    );
    const updatedState = upgradesWithQuarksPerClick.reduce((state, upgrade) => {
      return UPGRADES[upgrade.slug].passiveEffect(state, upgrade.tier);
    }, initialState);
    return updatedState.energyLimit;
  });

  const $clicksPerTap = computed([$levelDef, $upgrades, $quarks], (levelDef, upgrades, quarks) => {
    const initialState: upgradeEffectUser = {
      quarksPerClick: levelDef.quarksPerClick,
      clicksPerTap: 1,
      quarks: quarks,
      level: $level.get(),
      energyLimit: $energyLimit.get(),
      energy: $energy.get(),
      lastFreeRechargeAt: $lastFreeRechargeAt.get(),
      paidRechargesToday: $paidRechargesToday.get(),
      lastPaidRechargeResetAt: $lastPaidRechargeResetAt.get(),
      megaClickExpiresAt: $megaClickExpiresAt.get(),
    };
    const upgradesWithClicksPerTap = upgrades.filter(
      upgrade => UPGRADES[upgrade.slug].attribute_type === 'clicksPerTap'
    );
    const updatedState = upgradesWithClicksPerTap.reduce((state, upgrade) => {
      return UPGRADES[upgrade.slug].passiveEffect(state, upgrade.tier);
    }, initialState);
    return updatedState.clicksPerTap;
  });

  const $quarksPerClick = computed([$levelDef, $upgrades, $quarks], (levelDef, upgrades, quarks) => {
    const initialState: upgradeEffectUser = {
      quarksPerClick: levelDef.quarksPerClick,
      clicksPerTap: $clicksPerTap.get() || 1,
      quarks: quarks,
      level: $level.get(),
      energyLimit: $energyLimit.get(),
      energy: $energy.get(),
      lastFreeRechargeAt: $lastFreeRechargeAt.get(),
      paidRechargesToday: $paidRechargesToday.get(),
      lastPaidRechargeResetAt: $lastPaidRechargeResetAt.get(),
      megaClickExpiresAt: $megaClickExpiresAt.get(),
    };
    const upgradesWithQuarksPerClick = upgrades.filter(
      upgrade => UPGRADES[upgrade.slug].attribute_type === 'quarksPerClick'
    );
    const updatedState = upgradesWithQuarksPerClick.reduce((state, upgrade) => {
      return UPGRADES[upgrade.slug].passiveEffect(state, upgrade.tier);
    }, initialState);
    return updatedState.quarksPerClick;
  });

  const $energyReset = atom<number>(0);
  const $energyResetAt = atom<number>(0);
  const $lastFreeRechargeAt = atom<number>(0);
  const $paidRechargesToday = atom<number>(0);
  const $lastPaidRechargeResetAt = atom<number>(0);
  const $megaClickExpiresAt = atom<number>(0);


  const $time = intervalStore(500);

  const $energy = computed(
    [$energyReset, $energyResetAt, $energyLimit, $time],
    (energyReset, energyResetAt, energyLimit, time) => {
      const elapsedSeconds = (time - energyResetAt) / 1000;
      const energyRegenRate = 1; // energy per second

      const reduced =
        energyResetAt === 0
          ? energyLimit
          : Math.max(0, energyReset + Math.floor(elapsedSeconds * energyRegenRate));

      return Math.min(energyLimit, reduced);
    }
  );

  const handleSwapTransaction = (quarksDiff: number, starsDiff: number) => {
    // Getting current values
    const currentQuarks = $quarks.get();
    const currentStars = $stars.get();

    // Performing the swap operation using decimal utilities
    const newQuarks = Math.ceil(currentQuarks + quarksDiff);
    const newStars = addDecimals(currentStars, starsDiff);

    // Setting the new values
    $quarks.set(newQuarks);
    $stars.set(newStars);

    return true;
  };

  const handleAction = (action: Action) => {
    switch (action.type) {
    case 'click': {
      $time.set(Date.now()); // make sure $energy is recalculated
      const currentEnergy = $energy.get();

      const perClick = $quarksPerClick.get();
      const clicksPerTap = $clicksPerTap.get() || 1;
      const perTap = perClick * clicksPerTap;
      const newQuarks = $quarks.get() + perTap;
      const newClicks = $clicks.get() + 1; //real clicks
      console.log('click', [perClick, clicksPerTap, perTap, currentEnergy, newQuarks, newClicks]);
      if (currentEnergy > 0) {
        $clicks.set(newClicks);
        $quarks.set(Math.round(newQuarks));
        $energyReset.set(currentEnergy - perTap);
        $energyResetAt.set(Date.now());
        if (newQuarks >= $levelDef.get().quarksToUpgrade) {
          const newLevel = $level.get() + 1;
          $level.set(newLevel);
          $energyResetAt.set(0);
          $levelUpModalVisible.set(true);
        }

        return true;
      }

      break;
    }

    case 'claim_reward': {
      const rewardQuarks = action.payload.rewardQuarks.toString();
      const rewardStars = action.payload.rewardStars.toString();
      const newQuarks = $quarks.get() + parseInt(rewardQuarks);
      const newStars = addDecimals($stars.get(), parseFloat(rewardStars));
      if (rewardQuarks) {
        $quarks.set(newQuarks);
      }
      if (rewardStars) {
        $stars.set(newStars);
      }
      return true;
    }
    case 'swap_transaction': {
      const quarksDiff = action.payload.quarksDiff as number;
      const starsDiff = action.payload.starsDiff as number;

      return handleSwapTransaction(quarksDiff, starsDiff);
    }

    case 'upgrade': {
      $time.set(Date.now()); // make sure $energy is recalculated
      const slug = action.payload.slug as string;
      const initialState: upgradeEffectUser = {
        quarks: $quarks.get(),
        quarksPerClick: $quarksPerClick.get(),
        clicksPerTap: $clicksPerTap.get(),
        level: $level.get(),
        energyLimit: $energyLimit.get(),
        energy: $energy.get(),
        lastFreeRechargeAt: $lastFreeRechargeAt.get(),
        paidRechargesToday: $paidRechargesToday.get(),
        lastPaidRechargeResetAt: $lastPaidRechargeResetAt.get(),
        megaClickExpiresAt: $megaClickExpiresAt.get(),
      };
      const currentUpgrades = $upgrades.get() || [];
      const currentUpgrade = currentUpgrades.find(upgrade => upgrade.slug === slug);
      const newTier = (currentUpgrade?.tier || 0) + 1;
      const upgradeDef = UPGRADES[slug];
      let updatedState = initialState;
      const upgradePrice = upgradeDef.price(updatedState, newTier);
      updatedState.quarks -= upgradePrice;
      if (updatedState.quarks >= 0) {
        updatedState = upgradeDef.activeEffect(updatedState, newTier);
        let updatedUpgrades = currentUpgrades;
        if (currentUpgrade) {
          updatedUpgrades = updatedUpgrades.map(upgrade => {
            let updatedUpgrade = upgrade;
            //update prices array with upgradePrice by index(tier)
            if (updatedUpgrade.slug === slug) {
              const newTier = upgrade.tier + 1;
              updatedUpgrade.prices = upgrade.prices || [];
              //recalculate map previous prices if not set
              updatedUpgrade.prices.map((price, index) => {
                if (updatedUpgrade.prices && !price) {
                  updatedUpgrade.prices[index] = upgradeDef.price(updatedState, index + 1);
                }
              });
              updatedUpgrade.prices[newTier - 1] = upgradePrice;
              updatedUpgrade = {
                ...upgrade,
                prices: upgrade.prices,
                tier: newTier,
              };
            }
            return upgrade.slug === slug ? { ...upgrade, tier: upgrade.tier + 1 } : upgrade;
          });
        } else {
          updatedUpgrades = [...updatedUpgrades, { slug, tier: 1, prices: [upgradePrice] }];
        }
        $lastFreeRechargeAt.set(updatedState.lastFreeRechargeAt);
        $paidRechargesToday.set(updatedState.paidRechargesToday);
        $lastPaidRechargeResetAt.set(updatedState.lastPaidRechargeResetAt);
        $megaClickExpiresAt.set(updatedState.megaClickExpiresAt);
        $upgrades.set(updatedUpgrades);
        $quarks.set(Math.round(updatedState.quarks));
        $energyReset.set(updatedState.energy);
        $energyResetAt.set(Date.now());
        return true;
      }
      break;
    }
    }

    return false; // state was not changed
  };


  const deserialize = (state: Partial<SerializedState>) => {
    if (state.profile_image !== undefined) {
      $proifle_image.set(state.profile_image);
    }
    if (state.quarks !== undefined) {
      $quarks.set(state.quarks);
    }
    if (state.stars !== undefined) {
      $stars.set(state.stars);
    }
    if (state.level !== undefined) {
      $level.set(state.level);
    }

    if (state.energyReset !== undefined) {
      $energyReset.set(state.energyReset);
    }

    if (state.energyResetAt !== undefined) {
      $energyResetAt.set(state.energyResetAt);
    }
    if (state.upgrades !== undefined) {
      $upgrades.set(state.upgrades);
    }
    if (state.clicks !== undefined) {
      $clicks.set(state.clicks);
    }
    if (state.lastFreeRechargeAt !== undefined) {
      $lastFreeRechargeAt.set(state.lastFreeRechargeAt);
    }
    if (state.paidRechargesToday !== undefined) {
      $paidRechargesToday.set(state.paidRechargesToday);
    }
    if (state.lastPaidRechargeResetAt !== undefined) {
      $lastPaidRechargeResetAt.set(state.lastPaidRechargeResetAt);
    }
    if (state.megaClickExpiresAt !== undefined) {
      $megaClickExpiresAt.set(state.megaClickExpiresAt);
    }
  };

  const serialize = (): SerializedState => ({
    profile_image: $proifle_image.get(),
    quarks: $quarks.get(),
    clicks: $clicks.get(),
    stars: $stars.get(),
    level: $level.get(),
    energyReset: $energyReset.get(),
    energyResetAt: $energyResetAt.get(),
    upgrades: $upgrades.get(),
    lastFreeRechargeAt: $lastFreeRechargeAt.get(),
    paidRechargesToday: $paidRechargesToday.get(),
    lastPaidRechargeResetAt: $lastPaidRechargeResetAt.get(),
    megaClickExpiresAt: $megaClickExpiresAt.get(),
  });

  const $levelUpModalVisible = atom<boolean>(false);

  return {
    // state
    clicks: $clicks,
    quarks: $quarks,
    stars: $stars,
    clicksPerTap: $clicksPerTap,
    quarksPerClick: $quarksPerClick,
    level: $level,
    levelDef: $levelDef,
    levelProgress: $levelProgress,
    energy: $energy,
    energyLimit: $energyLimit,
    energyReset: $energyReset,
    energyResetAt: $energyResetAt,
    upgrades: $upgrades,
    profileImage: $proifle_image,
    levelUpModalVisible: $levelUpModalVisible,
    lastFreeRechargeAt: $lastFreeRechargeAt,
    paidRechargesToday: $paidRechargesToday,
    lastPaidRechargeResetAt: $lastPaidRechargeResetAt,
    megaClickExpiresAt: $megaClickExpiresAt,
    // methods
    handleAction,
    serialize,
    deserialize,
  };
};

export type ClickerState = ReturnType<typeof initClicker>;
