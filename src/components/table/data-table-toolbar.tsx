'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table, TFilters } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { useState } from 'react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: TFilters;
}

export function DataTableToolbar<TData>({
  table,
  filters: settings,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-center justify-between'>
      {settings && (
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder={settings.mainPlaceholder}
            value={table.getState().globalFilter}
            onChange={(event) => {
              table.setGlobalFilter(event.target.value);
            }}
            className='h-8 w-[150px] lg:w-[250px]'
          />
          {settings.filters?.map(
            (filter) =>
              table.getColumn(filter.name) && (
                <DataTableFacetedFilter
                  column={table.getColumn(filter.name)}
                  title={filter.title}
                  options={filter.options}
                />
              )
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'>
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      )}

      <DataTableViewOptions table={table} />
    </div>
  );
}
