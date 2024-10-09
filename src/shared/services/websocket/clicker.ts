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

type upgradeEffectUser = {
  quarks: number;
  quarksPerClick: number;
  level: number;
  energyLimit: number;
  energy: number;
};
type upgradeEffect = (user: upgradeEffectUser, tier: number) => upgradeEffectUser;

export type UpgradeDefinition = {
  name: string;
  description: string;
  attribute_type: 'energy' | 'energyLimit' | 'quarksPerClick';
  tier: number;
  price: (user: { level: number; energyLimit: number }, tier: number) => number;
  passiveEffect: upgradeEffect;
  activeEffect: upgradeEffect;
  isEnabled: (user: { level: number }) => boolean;
};

export const UPGRADES: { [key: string]: UpgradeDefinition } = {
  powerUp: {
    name: 'Power up',
    description: 'Increases power by 1',
    attribute_type: 'quarksPerClick',
    tier: 1,
    price: (user, tier) => 1000 * tier ** 2 * user.level,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    activeEffect: (user, _tier) => {
      return user;
    },
    passiveEffect: (user, tier) => {
      return {
        ...user,
        quarksPerClick: user.quarksPerClick + tier,
      };
    },
    isEnabled: user => user.level > 0,
  },
  fuelTank: {
    name: 'Extend fuel tank',
    description: 'Increases max energy by 100 and refills energy',
    attribute_type: 'energyLimit',
    tier: 1,
    price: (_user, tier) => 500 * tier ** 2,
    activeEffect: (user, tier) => {
      return {
        ...user,
        energy: user.energyLimit + 100 * tier,
      };
    },
    passiveEffect: (user, tier) => {
      return {
        ...user,
        energyLimit: user.energyLimit + 100 * tier,
      };
    },
    isEnabled: user => user.level > 0,
  },
  recharge: {
    name: 'Recharge',
    description: 'Recharges energy to full',
    attribute_type: 'energy',
    tier: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    price: (user, _tier) => user.energyLimit * 0.6 * user.level,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    activeEffect: (user, _tier) => {
      return {
        ...user,
        energy: user.energyLimit,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    passiveEffect: (user, _tier) => {
      return user;
    },
    isEnabled: user => user.level > 0,
  },
  warpDrive: {
    name: 'Warp Drive',
    description: 'Gain quarks equal to (89 + tier)% energy',
    attribute_type: 'energy',
    tier: 1,
    price: (_user, tier) => 1000 * tier ** 2,
    activeEffect: (user, tier) => {
      const gain = user.energy * ((89 + tier) / 100);
      return {
        ...user,
        quarks: user.quarks + gain,
        energy: 0,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    passiveEffect: (user, _tier) => {
      return user;
    },
    isEnabled: user => user.level > 0,
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
      quarks: $quarks.get(),
      level: $level.get(),
      energy: $energy.get(),
    };
    const upgradesWithQuarksPerClick = upgrades.filter(
      upgrade => UPGRADES[upgrade.slug].attribute_type === 'energyLimit'
    );
    const updatedState = upgradesWithQuarksPerClick.reduce((state, upgrade) => {
      return UPGRADES[upgrade.slug].passiveEffect(state, upgrade.tier);
    }, initialState);
    return updatedState.energyLimit;
  });

  const $quarksPerClick = computed([$levelDef, $upgrades], (levelDef, upgrades) => {
    const initialState: upgradeEffectUser = {
      quarksPerClick: levelDef.quarksPerClick,
      quarks: $quarks.get(),
      level: $level.get(),
      energyLimit: $energyLimit.get(),
      energy: $energy.get(),
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
      const newQuarks = $quarks.get() + perClick;
      const newClicks = $clicks.get() + 1;
      if (currentEnergy > 0) {
        $clicks.set(newClicks);
        $quarks.set(Math.round(newQuarks));
        $energyReset.set(currentEnergy - perClick);
        $energyResetAt.set(Date.now());
        if (newQuarks >= $levelDef.get().quarksToUpgrade) {
          $level.set($level.get() + 1);
          $energyResetAt.set(0);
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
        level: $level.get(),
        energyLimit: $energyLimit.get(),
        energy: $energy.get(),
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
  });

  return {
    // state
    clicks: $clicks,
    quarks: $quarks,
    stars: $stars,
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
    // methods
    handleAction,
    serialize,
    deserialize,
  };
};

export type ClickerState = ReturnType<typeof initClicker>;
