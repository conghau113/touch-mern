import { tw } from '../../../utils/classUtil';
import { Typography } from 'antd';
import _ from 'lodash';
import PrimaryTag, { type PrimaryTagProps } from './PrimaryTag';

type PrimaryTagPlusProps = {
  tooltipTitleKey?: string;
  showTooltip?: boolean;
};

interface PrimaryTagsProps {
  items: Array<PrimaryTagProps | null | undefined>;
  maxShowItems?: number; // Hiện số lượng items
  // Props của showing tag (Những items đang hiển thị)
  showingTagProps?: PrimaryTagProps & PrimaryTagPlusProps;
  // Props của more tag (Chỉ work khi có maxShowItems)
  moreTagProps?: PrimaryTagProps & PrimaryTagPlusProps;
  className?: string;
}

export default function PrimaryTags(props: PrimaryTagsProps) {
  const { items, className, maxShowItems, showingTagProps = {}, moreTagProps = {}, ...restProps } = props;
  const {
    showTooltip: showTooltipShowingTagShowingTag,
    tooltipTitleKey: tooltipTitleKeyShowingTag,
    tooltipProps: tooltipPropsShowingTag,
    ...restShowingTagProps
  } = showingTagProps;
  const {
    showTooltip: showTooltipMoreTag,
    tooltipTitleKey: tooltipTitleKeyMoreTag,
    tooltipProps: tooltipPropsMoreTag,
    ...restMoreTagProps
  } = moreTagProps;

  const commonTag = (item?: PrimaryTagProps | null, index?: number) => (
    <PrimaryTag
      maxItems={_.size(items)}
      key={index}
      tooltipProps={
        // Chỉ dùng tooltip khi 'showTooltipShowingTagShowingTag' = true
        showTooltipShowingTagShowingTag
          ? {
              // Hiện title theo trường, mặc định là 'children'
              title: _.get(item, tooltipTitleKeyShowingTag ?? 'children'),
              ...tooltipPropsShowingTag,
            }
          : undefined
      }
      {...{ ...restShowingTagProps, ...item }}
    />
  );

  return (
    <div className={tw('flex flex-wrap gap-1', className)} {...restProps}>
      {(() => {
        if (_.size(items)) {
          if (maxShowItems) {
            const takeItems = _.take(items, maxShowItems);
            const moreItems = _.drop(items, maxShowItems);

            return (
              <>
                {/* Items tag */}
                {_.map(takeItems, (item, index) => commonTag(item, index))}

                {/* More tag */}
                {_.size(moreItems) ? (
                  <PrimaryTag
                    maxItems={_.size(items)}
                    tooltipProps={
                      // Chỉ dùng tooltip khi 'showTooltipMoreTag' = true
                      showTooltipMoreTag
                        ? {
                            /**
                             * Truyền thêm 'tooltipTitleKeyMoreTag' để biết map ra theo trường nào,
                             * Ví dụ: Muốn hiển thị title của 1 list các objects
                             * [
                             *   {
                             *     title: "A",
                             *     name: "B"
                             *   }
                             * ]
                             * Để chỉ việc sẽ hiển thị các trường 'title' thì truyền 'tooltipTitleKeyMoreTag' = 'title'
                             */
                            title: (
                              <Typography className='whitespace-pre-line text-xs text-white'>
                                {_.join(
                                  _.map(moreItems, (item) =>
                                    tooltipTitleKeyMoreTag ? _.get(item, tooltipTitleKeyMoreTag) : item?.children
                                  ),
                                  '\n'
                                )}
                              </Typography>
                            ),
                            ...tooltipPropsMoreTag,
                          }
                        : undefined
                    }
                    {...restMoreTagProps}
                  >{`+${_.size(moreItems)}`}</PrimaryTag>
                ) : null}
              </>
            );
          }
          return _.map(items, (item, index) => commonTag(item, index));
        }
      })()}
    </div>
  );
}
