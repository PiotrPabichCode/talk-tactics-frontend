'use client';

import { Table } from '@/components/table/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useGetCourseItemById } from '@/services/queries/course.query';
import { columns } from './_components/columns';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';

export default function SingleCourseItemPage({
  params,
}: {
  params: { courseId: string; courseItemId: string };
}) {
  const {
    data: courseItem,
    isFetching,
    isError,
  } = useGetCourseItemById(params.courseItemId);
  if (isFetching) {
    return <Spinner />;
  }
  if (!courseItem || isError) {
    console.log(courseItem, isError, 'Something went wrong');
    return null;
  }

  return (
    <div className='p-4 text-center'>
      <Card className='relative'>
        <Link href={`/courses/${params.courseId}`}>
          <Button variant='action' className='absolute top-5 right-5'>
            <p className='hidden md:block md:mr-2'>Back</p>
            <Undo2 className=' h-4 w-4' />
          </Button>
        </Link>
        <CardHeader>
          <CardTitle>{courseItem.word}</CardTitle>
          <CardDescription>{courseItem.phonetic}</CardDescription>
          <CardDescription>{courseItem.partOfSpeech}</CardDescription>
          <CardDescription className='font-bold pt-2'>
            {courseItem.course.title}
          </CardDescription>
        </CardHeader>
        <Separator className='mb-2' />
        <CardContent>
          <Table columns={columns} data={courseItem.meanings} />
        </CardContent>
      </Card>
    </div>
  );
}
