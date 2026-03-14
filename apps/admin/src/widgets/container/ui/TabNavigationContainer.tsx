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
    <div className="h-full w-full bg-white dark:bg-dark">
      <TabNavigation className="gap-x-5 px-5 sm:px-6 xl:h-16">
        {navigation.map((item) => (
          <TabNavigationLink
            key={item.title}
            asChild
            active={pathname === item.href}
            className="text-base"
          >
            <Link href={item.href}>{item.title}</Link>
          </TabNavigationLink>
        ))}
      </TabNavigation>
      <div className="xl:h-[calc(100%-64px)]">{children}</div>
    </div>
  );
};
