'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import React from 'react';
import { cn } from '@/lib/utils';
import { CourseDto } from '@/typings/course';
import uniqBy from 'lodash/uniqBy';
import { shuffle } from 'lodash';
import Image from 'next/image';
import { CourseLevel } from '@/api/courses.types';

interface WordOption {
  title: CourseLevel;
  description: string;
  href: string;
}

const WordOptions = ({ courses }: { courses: CourseDto[] }) => {
  const BASE_DESCRIPTION = 'Most frequently used english words - Top';
  return courses.map((course) => (
    <ListItem
      key={course.level + '_word'}
      title={course.level}
      href={`/courses/${course.id}/words/${Math.floor(
        Math.random() * course.quantity
      )}`}>{`${BASE_DESCRIPTION} ${
      course.level === 'ADVANCED'
        ? '<85%'
        : course.level === 'INTERMEDIATE'
        ? '85-94%'
        : '95-99%'
    }`}</ListItem>
  ));
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}>
          <div className='text-sm font-medium leading-none line-clamp-1'>
            {title}
          </div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export function LinksNav({
  header,
  courses,
}: {
  header?: boolean;
  courses: CourseDto[];
}) {
  if (courses.length < 3) {
    return null;
  }
  const shuffledCourses = shuffle(courses);
  const uniqueCourses: CourseDto[] = uniqBy(
    shuffledCourses,
    (course: CourseDto) => course.level
  );
  return (
    <NavigationMenu orientation={!header ? 'vertical' : 'horizontal'}>
      <NavigationMenuList className={cn(!header && 'flex-col items-start')}>
        <NavigationMenuItem>
          <NavigationMenuTrigger>English courses</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-6 w-[90vw] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <Link
                    className='flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                    href='/courses'>
                    <div className='flex flex-row items-center justify-center md:block space-x-3 md:space-x-0'>
                      <Image
                        src={'/english.svg'}
                        alt='English flag'
                        width={32}
                        height={32}
                      />
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        English courses
                      </div>
                    </div>
                    <p className='text-sm leading-tight text-muted-foreground'>
                      {uniqueCourses[0].description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {uniqueCourses.map((course) => (
                <ListItem
                  key={course.id}
                  href={`/courses/${course.id}`}
                  title={course.level}>
                  {course.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className=''>
          <NavigationMenuTrigger>Generate random word</NavigationMenuTrigger>
          <NavigationMenuContent className='overflow-x-hidden'>
            <ul className='grid grid-cols-1 gap-3 p-4 w-full'>
              <WordOptions courses={uniqueCourses} />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
