import { TabNavigation } from '@/shared/ui';
import { TabNavigationLink } from '@/shared/ui/atoms/TabNavigation';
import { TabNavigationContainerProps } from './types';
import Link from 'next/link';

export const TabNavigationContainer = ({
  children,
  navigation,
  pathname,
}: TabNavigationContainerProps) => {
  return (
    <div className="dark:bg-gray-925 bg-white">
      <TabNavigation className="mt-6 gap-x-4 px-4 sm:px-6">
        {navigation.map((item) => (
          <TabNavigationLink key={item.title} asChild active={pathname === item.href}>
            <Link href={item.href}>{item.title}</Link>
          </TabNavigationLink>
        ))}
      </TabNavigation>
      <>{children}</>
    </div>
  );
};
