import { HolderOutlined } from '@ant-design/icons';
import { Divider, Typography } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import useSelectedTypePostStore from '../../state/useSelectedTypePostStore';
import PrimaryCard from '../custom/card/PrimaryCard';
import PrimarySelect from '../custom/select/PrimarySelect';

interface SortBySelectProps {
  sorts: any;
  sortBy?: string;
}

export default function SharedSortSelectPost(props: SortBySelectProps) {
  const { sorts, sortBy } = props ?? {};

  const { setSelectedPostValue, selectedPostValue } = useSelectedTypePostStore();

  const handleChange = (e: any) => {
    setSelectedPostValue(e);
  };

  const options = _.map(Object.keys(sorts), (sort) => {
    return {
      label: sorts[sort],
      value: sort,
    };
  });

  return (
    <>
      <PrimaryCard className='bg-main-purple'>
        <Typography className='text-lg gap-2 text-white mb-2 font-medium flex items-center'>Sorted by:</Typography>
        <Divider className='my-2 bg-white' />
        <PrimarySelect
          onChange={(e) => handleChange(e)}
          variant='normal'
          defaultValue={selectedPostValue}
          options={options}
        />
      </PrimaryCard>
    </>
  );
}
