import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserData, getUserFeatureFlags } from '@/entities/User';
import { ListBox } from '@/shared/ui/redesigned/popups';
import { FeatureFlags, featuresNameMap, updateFeatureFlag } from '@/shared/lib/helpers/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import { switcherItems } from '../../model/constants/featureFlagsSwitcher';
import { FeatureFlagValue } from '../../model/types/featureFlagsSwitcher';

interface FeatureFlagsSwitcherProps {
  className?: string;
  userLogin: string;
}

export const FeatureFlagsSwitcher = memo((props: FeatureFlagsSwitcherProps) => {
  const { className, userLogin } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean | undefined>();
  const [userFlags, setUserFlags] = useState<FeatureFlags | undefined>();
  const currentUser = useSelector(getUserData);

  const loadFeaturedFlags = useCallback(async () => {
    setLoading(true);
    const response = await dispatch(getUserFeatureFlags({ userLogin: userLogin }));
    setUserFlags(response.payload as FeatureFlags);
    setLoading(false);
  }, [userLogin, setLoading, setUserFlags, dispatch]);

  useInitialEffect(() => {
    loadFeaturedFlags();
  });

  const onChange = useCallback(
    (flagName: keyof FeatureFlags) => async (value: FeatureFlagValue) => {
      const booleanValue = value === 'on';

      const needToUpdate = booleanValue !== userFlags?.[flagName];

      if (!needToUpdate) return;

      await dispatch(
        updateFeatureFlag({
          userLogin: userLogin,
          active: booleanValue,
          featureName: flagName,
          needReloadPage: currentUser?.login === userLogin
        })
      );
      loadFeaturedFlags();
    },
    [currentUser, userLogin, loadFeaturedFlags, userFlags]
  );

  if (loading) {
    return (
      <VStack gap={8} className={className}>
        <Text title={t('toggle features flags')} />
        <Skeleton width={200} height={38} />
        <Skeleton width={200} height={38} />
        <Skeleton width={200} height={38} />
      </VStack>
    );
  }

  return (
    <VStack gap={8} className={className}>
      <Text title={t('toggle features flags')} />
      {userFlags &&
        Object.keys(userFlags).map((flag) => (
          <ListBox<FeatureFlagValue>
            key={flag}
            onChange={onChange(flag as keyof FeatureFlags)}
            items={switcherItems}
            value={userFlags[flag] ? 'on' : 'off'}
            label={`${featuresNameMap[flag]}`}
          />
        ))}
    </VStack>
  );
});
