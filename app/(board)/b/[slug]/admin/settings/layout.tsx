'use client';
import MaxWidthContainer from '@/components/max-width-container';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const tabs = [
    {
      name: 'General',
      segment: null,
    },
    {
      name: 'Theme',
      segment: 'theme',
    },
  ];

  return (
    <>
      <div className="flex h-32 items-center border-b border-gray-200">
        <MaxWidthContainer>
          <h1 className="text-2xl font-medium tracking-tight text-foreground">
            Settings
          </h1>
        </MaxWidthContainer>
      </div>
      <MaxWidthContainer className="grid items-start gap-5 py-10 lg:grid-cols-5">
        <div className="top-36 flex gap-1 lg:sticky lg:grid">
          {tabs.map(({ name, segment }, index) => (
            <SettingsNavLink segment={segment} key={index}>
              {name}
            </SettingsNavLink>
          ))}
        </div>
        <div className="grid gap-5 lg:col-span-4">{children}</div>
      </MaxWidthContainer>
    </>
  );
};

export default SettingsLayout;

const SettingsNavLink = ({
  segment,
  children,
}: {
  segment: string | null;
  children: React.ReactNode;
}) => {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const { slug } = useParams() as {
    slug?: string;
  };

  const href = `${slug ? `/b/${slug}` : ''}/admin/settings${
    segment ? `/${segment}` : ''
  }`;

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        'm-1 rounded-sm px-2 md:px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 text-muted-foreground hover:text-foreground text-sm',
        {
          'text-foreground font-medium': selectedLayoutSegment === segment,
        }
      )}
    >
      {children}
    </Link>
  );
};
