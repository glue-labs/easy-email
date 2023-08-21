import { Button, Collapse, Divider, Input, Message } from '@arco-design/web-react';
import {
  BasicType,
  BlockManager,
  getPageIdx,
  getParentByIdx,
  IBlockData,
  JsonToMjml,
} from 'easy-email-core';
import {
  useBlock,
  useFocusIdx,
  useEditorContext,
  useEditorProps,
} from 'easy-email-editor';
import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MjmlToJson } from '@extensions/utils/MjmlToJson';
import styles from './index.module.scss';

export function SourceCodePanel({ jsonReadOnly, mjmlReadOnly }: { jsonReadOnly: boolean; mjmlReadOnly: boolean }) {
  const { setValueByIdx, focusBlock, values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const [mjmlText, setMjmlText] = useState('');
  const { pageData } = useEditorContext();
  const { mergeTags } = useEditorProps();

  const code = useMemo(() => {
    if (!focusBlock) return '';
    return JSON.stringify(focusBlock, null, 2) || '';
  }, [focusBlock]);

  const onChangeCode = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        const parseValue = JSON.parse(
          JSON.stringify(eval('(' + event.target.value + ')')),
        ) as IBlockData;

        const block = BlockManager.getBlockByType(parseValue.type);
        if (!block) {
          throw new Error(t('Invalid content'));
        }
        if (
          !parseValue.data ||
          !parseValue.data.value ||
          !parseValue.attributes ||
          !Array.isArray(parseValue.children)
        ) {
          throw new Error(t('Invalid content'));
        }
        setValueByIdx(focusIdx, parseValue);
      } catch (error: any) {
        Message.error(error?.message || error);
      }
    },
    [focusIdx, setValueByIdx],
  );

  const onMjmlChange = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      try {
        const parseValue = MjmlToJson(event.target.value);
        if (parseValue.type !== BasicType.PAGE) {
          const parentBlock = getParentByIdx(values, focusIdx)!;
          const parseBlock = BlockManager.getBlockByType(parseValue.type);

          if (!parseBlock?.validParentType.includes(parentBlock?.type)) {
            throw new Error(t('Invalid content'));
          }
        } else if (focusIdx !== getPageIdx()) {
          throw new Error(t('Invalid content'));
        }

        setValueByIdx(focusIdx, parseValue);
      } catch (error) {
        Message.error(t('Invalid content'));
      }
    },
    [focusIdx, setValueByIdx, values],
  );

  const onChangeMjmlText = useCallback((value: string) => {
    setMjmlText(value);
  }, []);

  useEffect(() => {
    focusBlock &&
      setMjmlText(
        JsonToMjml({
          idx: focusIdx,
          data: focusBlock,
          context: pageData,
          mode: 'production',
          dataSource: cloneDeep(mergeTags),
        }),
      );
  }, [focusBlock, focusIdx, pageData, mergeTags]);

  if (!focusBlock) return null;

  return (
    <Collapse>
      <Collapse.Item
        name='logo'
        header={t('Logo Image')}
        showExpandIcon={false}
      >
      </Collapse.Item>
      <Collapse.Item
        name='Nav'
        header={t('Nav bar Links')}
        contentStyle={{ padding: '8px 13px' }}
        showExpandIcon={false}
      >
      </Collapse.Item>
      <Collapse.Item
        name='header title'
        header={t('Header image')}
        contentStyle={{ padding: '8px 13px' }}
        showExpandIcon={false}
      >
      </Collapse.Item>
      <Collapse.Item
        name='header'
        header={t('Header Title')}
        contentStyle={{ padding: '8px 13px' }}
        showExpandIcon={false}
      >
      </Collapse.Item>
      <Collapse.Item
        name='body'
        header={t('Body')}
        contentStyle={{ padding: '8px 13px' }}
      >
        Image
        <Divider style={{ margin: '8px 0' }}/>
        Text
        {/* <Divider style={{ margin: '8px 0' }}/> */}
      </Collapse.Item>
      <Collapse.Item
        name='button'
        header={t('Button')}
        contentStyle={{ padding: '8px 13px' }}
        showExpandIcon={false}
      >
      </Collapse.Item>
      <Collapse.Item
        name='footer'
        header={t('Footer')}
        contentStyle={{ padding: '8px 13px' }}
      >
        Image
        <Divider style={{ margin: '8px 0' }}/>
        Company Name
        <Divider style={{ margin: '8px 0' }}/>
        Social Links
      </Collapse.Item>
    </Collapse>

  );
}
