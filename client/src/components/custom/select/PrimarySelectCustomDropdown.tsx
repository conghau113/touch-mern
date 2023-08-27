import { tw } from '../../../utils/classUtil';
import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Select, Space, type RefSelectProps, type SelectProps } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../button/PrimaryButton';
import PrimaryCheckbox from '../checkbox/PrimaryCheckbox';
import DownArrowIcon from '../icon/DownArrowIcon';
import PrimaryInput from '../input/PrimaryInput';

interface PrimarySelectCustomDropdownProps extends SelectProps {}

export default React.forwardRef(function PrimarySelectCustomDropdown(
  props: PrimarySelectCustomDropdownProps,
  ref: React.Ref<RefSelectProps> | null
) {
  const {
    className,
    value,
    options,
    onChange,
    open,
    mode,
    showSearch,
    defaultOpen,
    onDropdownVisibleChange,
    ...restProps
  } = props;
  const [isOpen, setOpen] = useState<boolean>(defaultOpen ?? open ?? false);
  const [filterValue, setFilterValue] = useState<string>();
  const [filterOptions, setFilterOptions] = useState<any[]>(options ?? []);
  const [checkedValueTemp, setCheckedValueTemp] = useState<any[]>([]);
  const [checkedValueConfirm, setCheckedValueConfirm] = useState<any[]>([]);

  useEffect(() => {
    setFilterOptions(
      _.filter(options, (option) =>
        _.includes(option?.label?.toString()?.toLowerCase(), filterValue?.trim()?.toLowerCase())
      )
    );
  }, [filterValue]);

  useEffect(() => {
    setFilterOptions(options ?? []);
  }, [options]);

  return (
    <Select
      ref={ref}
      open={isOpen}
      dropdownRender={() => {
        return (
          <>
            <div className='px-5 py-4'>
              <PrimaryInput
                value={filterValue}
                onChange={(event) => setFilterValue(event.target.value)}
                placeholder='Tìm kiếm'
                className='h-8 border-none bg-light-17'
                variant='search-prefix'
              />
            </div>
            <div className='max-h-48 overflow-x-hidden'>
              <Checkbox.Group
                value={checkedValueTemp}
                onChange={(checkedValue) => {
                  setCheckedValueTemp(checkedValue);
                }}
              >
                <Space className='flex flex-col items-start px-5 pb-6'>
                  {_.map(filterOptions, (option, index) => {
                    const { label, value } = option;
                    return (
                      <PrimaryCheckbox key={index} value={value}>
                        {label}
                      </PrimaryCheckbox>
                    );
                  })}
                </Space>
              </Checkbox.Group>
            </div>
            <Divider style={{ margin: '8px 0' }} />
            <div className='flex items-center justify-between px-5 py-4'>
              <div>
                <PrimaryButton
                  variant='default'
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Hủy
                </PrimaryButton>
              </div>
              <div className='flex gap-2'>
                <PrimaryButton
                  variant='cancel'
                  onClick={() => {
                    setCheckedValueTemp([]);
                  }}
                >
                  Đặt về mặc định
                </PrimaryButton>
                <PrimaryButton
                  variant='primary'
                  onClick={() => {
                    setCheckedValueConfirm(checkedValueTemp);
                    setOpen(false);
                  }}
                >
                  Áp dụng
                </PrimaryButton>
              </div>
            </div>
          </>
        );
      }}
      options={filterOptions}
      onChange={(value, option) => {
        // onChange?.(checkedValueConfirm, option)
      }}
      className={tw(
        `
          h-12 w-full border-main-purple
          [&_.ant-select-selection-item]:flex [&_.ant-select-selection-item]:items-center 
          [&_.ant-select-selection-placeholder]:flex [&_.ant-select-selection-placeholder]:items-center 
          [&_.ant-select-selection-search]:flex  [&_.ant-select-selection-search]:items-center
          [&_.ant-select-selector]:h-full
        `,
        className
      )}
      suffixIcon={
        isOpen && ((mode === 'multiple' && (showSearch === undefined || showSearch)) ?? showSearch) ? (
          <SearchOutlined />
        ) : (
          <DownArrowIcon />
        )
      }
      placement='topLeft'
      onDropdownVisibleChange={(open) => {
        onDropdownVisibleChange?.(open);
        setOpen(open);
        open && setCheckedValueTemp(checkedValueConfirm);
      }}
      {...{ defaultOpen, showSearch, mode, ...restProps }}
    />
  );
});
