import { useEditorProps } from '@';
import { Button, Form, FormInstance, Input, Space } from '@arco-design/web-react';
import { IconDelete, IconPlus, IconSave } from '@arco-design/web-react/icon';
import { useExtensionProps } from '@extensions';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export function DataPanel() {
  const { setMergeTags, mergeTags } = useEditorProps();
  const { updateDefaultData, mergeTagData } = useExtensionProps();
  console.log("templateData", updateDefaultData, '<<<<<<', mergeTagData);
  const formRef = useRef<FormInstance>(null);
  const [initialValues, setInitialValues] = useState({ tagData: [] });

  useMemo(() => {
    const newValues = {
      tagData: mergeTagData?.mutableKeys.map((k: string) => {
        return {
          key: k,
          value: mergeTags && mergeTags[k]
        };
      }),
    };
    if (mergeTagData?.mutableKeys) {
      formRef?.current?.setFieldsValue(newValues);
    }
    setInitialValues(newValues);
  }, [mergeTags]);

  console.log(initialValues, 'SDDD');
  return (
    <div style={{ padding: 0 }}>
      <Form
        ref={formRef}
        autoComplete='off'
        onSubmit={(values => {
          let newObj: Record<string, any> = {};
          values.tagData.map((tag: { key: string; value: string; }) => {
            newObj[tag.key] = tag.value;
          });

          setMergeTags && setMergeTags({
            ...mergeTags,
            ...newObj
          });
        })}
        initialValues={initialValues}
        onValuesChange={(_, v) => {
          if (Array.isArray(_)) {
            return;
          }
          if (typeof _ === 'object') {
            const key = Object.keys(_)[0];
          }
        }}
      >
        <Form.List field='tagData'>
          {(fields, { add, remove, move }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <div key={item.key}>
                      <Space style={{ padding: 10 }}>
                        <Form.Item
                          field={item.field + '.key'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          field={item.field + '.value'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input />
                        </Form.Item>
                        {/* <Button
                          icon={<IconDelete />}
                          shape='circle'
                          status='danger'
                          onClick={() => remove(index)}
                        /> */}
                      </Space>
                    </div>
                  );
                })}
                <Form.Item style={{ padding: 10 }}>
                  <Space size={20}>

                    {/* <Button
                      type='primary'
                      icon={<IconPlus />}
                      onClick={() => {
                        add();
                      }}
                    /> */}
                    <Button
                      icon={<IconSave />}
                      type='primary'
                      htmlType='submit'
                    >
                      Save Data
                    </Button>
                  </Space>

                </Form.Item>

              </div>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
}
