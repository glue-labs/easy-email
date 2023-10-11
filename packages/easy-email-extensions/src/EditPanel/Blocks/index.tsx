import { Card, Collapse, Grid, Select, Space, Typography } from '@arco-design/web-react';
import { AdvancedType, BlockManager, IBlockData } from 'easy-email-core';
import { BlockAvatarWrapper, IconFont } from 'easy-email-editor';
import React, { useMemo, useState } from 'react';
import { IconCaretRight, IconCaretUp } from '@arco-design/web-react/icon';
import { getIconNameByBlockType } from '@extensions/utils/getIconNameByBlockType';
import styles from './index.module.scss';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';

export function Blocks() {
  const { categories, changeCategories } = useExtensionProps();
  const [selectedCategory, setSelectedCategory] = useState('Content');

  const defaultActiveKey = useMemo(
    () => [
      ...categories.filter((item) => item.active).map((item) => item.label),
    ],
    [categories]
  );

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      style={{ paddingBottom: 30, minHeight: '100%' }}
    >
      {categories.map((cat, index) => {
        if (cat.displayType === 'column') {
          return (
            <Collapse.Item
              key={index}
              contentStyle={{ padding: '0px 20px' }}
              name={cat.label}
              header={cat.label}
            >
              <Space direction='vertical'>
                <div />
              </Space>
              {cat.blocks.map((item, index) => (
                <LayoutItem
                  key={index}
                  title={item.title || ''}
                  columns={item.payload}
                />
              ))}

              <Space direction='vertical'>
                <div />
              </Space>
            </Collapse.Item>
          );
        }

        if (cat.displayType === 'custom') {
          return (
            <Collapse.Item
              key={index}
              contentStyle={{ padding: 0, paddingBottom: 0, paddingTop: 20 }}
              name={cat.label}
              header={cat.label}
            >
              <Grid.Row>
                {cat.blocks.map((item, index) => {
                  return <React.Fragment key={index}>{item}</React.Fragment>;
                })}
              </Grid.Row>
            </Collapse.Item>
          );
        }
        return (
          <div key={index}>
            <Select
              style={{ padding: 15 }}
              onChange={(t) => { changeCategories && changeCategories(t); }}
              value={selectedCategory}

            >
              <Select.Option key='All' value='all'>All</Select.Option>
              <Select.Option key='footer' value='footer'>Footer</Select.Option>
              <Select.Option key='topbar' value='topbar'>Topbar</Select.Option>
              <Select.Option key='body' value='body'>Body</Select.Option>
            </Select>
            <Grid.Row>
              {cat.blocks.map((item, index) => {
                return <BlockItem key={index} {...(item as any)} />;
              })}
            </Grid.Row>
          </div>
        );
      })}
    </Collapse>

  );
}

function BlockItem({
  type,
  payload,
  title,
  json,
  previewUrl,
  filterType,
}: {
  type: string;
  payload?: Partial<IBlockData>;
  title?: string;
  filterType: string | undefined;
  previewUrl: string | undefined;
  json: any;
}) {
  const block = BlockManager.getBlockByType(type, json);

  return (
    <BlockAvatarWrapper type={type} payload={payload} json={json}>
      <Card
        hoverable
        style={{ width: 360, marginTop: 10 }}
        title={title || block?.name}
        cover={
          <div style={{ height: 204, overflow: 'hidden' }}>
            <img
              src={previewUrl}
              style={{ width: '100%', transform: 'translateY(-20px)' }}
              alt={title || block?.name}
            />
          </div>
        }
      >
      </Card>
    </BlockAvatarWrapper>
  );
}

function LayoutItem({
  columns,
  title,
}: {
  columns: string[][];
  title: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <p
        onClick={() => setVisible((v) => !v)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>{title}</span>
        {columns.length > 1 && (
          <span>{!visible ? <IconCaretRight /> : <IconCaretUp />}</span>
        )}
      </p>
      {columns.map((item, index) => {
        const hide = !visible && index !== 0;
        const payload = {
          type: AdvancedType.SECTION,
          attributes: {},
          children: item.map((col) => ({
            type: AdvancedType.COLUMN,
            attributes: {
              width: col,
            },
            data: {
              value: {},
            },
            children: [],
          })),
        };

        return (
          <div
            key={index}
            style={{
              height: hide ? 0 : undefined,
              overflow: 'hidden',
              marginBottom: hide ? 0 : 20,
            }}
          >
            <BlockAvatarWrapper type={AdvancedType.SECTION} payload={payload}>
              <div
                style={{
                  border: '1px solid rgb(229, 229, 229)',
                  width: '100%',
                  padding: 10,
                }}
              >
                <div
                  style={{
                    height: 16,
                    border: '1px solid rgb(85, 85, 85)',
                    borderRadius: 3,
                    display: 'flex',
                  }}
                >
                  {item.map((column, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          borderRight:
                            index === item.length - 1
                              ? undefined
                              : '1px solid rgb(85, 85, 85)',
                          height: '100%',
                          width: column,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </BlockAvatarWrapper>
          </div>
        );
      })}
    </div>
  );
}
