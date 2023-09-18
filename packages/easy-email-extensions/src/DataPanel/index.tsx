import { useEditorProps } from 'easy-email-editor';
import { Button, Form, FormInstance, Input, Space } from '@arco-design/web-react';
import { IconSave } from '@arco-design/web-react/icon';
import { ImageUploaderField, useExtensionProps } from '@extensions';
import React, { useMemo, useRef, useState } from 'react';
import { get } from 'lodash';

export function DataPanel() {
  const { setMergeTags, mergeTags } = useEditorProps();
  const { updateDefaultData, mergeTagData } = useExtensionProps();
  const { onUploadImage } = useEditorProps();
  const formRef = useRef<FormInstance>(null);
  const [initialValues, setInitialValues] = useState({ tagData: [] });

  useMemo(() => {
    const newValues = {
      tagData: mergeTagData?.mutableKeys?.map((k: string) => {
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


  async function uploadImage(blob: Blob, key: string) {
    if (!onUploadImage) {
      return 'Failed';
    }

    let val = await onUploadImage(blob);

    const newObject = { ...mergeTags };
    newObject[key] = val;

    setMergeTags && setMergeTags(newObject);
    return val;
  }

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
          {(fields, { add, remove, move }, ...rest) => {
            return (
              <div>
                {fields.map((item, index) => {
                  if (get(initialValues, item.field + '.key') === 'productLogo') {
                    return (
                      <div key={item.key}>
                        <Space style={{ padding: 10 }}>
                          <Form.Item
                            field={item.field + '.key'}
                            rules={[{ required: true }]}
                            noStyle
                            label={item.field + '.key'}
                          >
                            <Input readOnly style={{ color: "black", cursor: "no-drop" }} />
                          </Form.Item>
                          <Form.Item
                            field={item.field + '.value'}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Input />
                          </Form.Item>
                        </Space>

                        <ImageUploaderField
                          label={t('src')}
                          labelHidden
                          name='imageUploader'
                          uploadHandler={(blob) => uploadImage(blob, get(initialValues, item.field + '.key'))}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={item.key}>
                      <Space style={{ padding: 10 }}>
                        <Form.Item
                          field={item.field + '.key'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input readOnly style={{ color: "black", cursor: "no-drop" }} />
                        </Form.Item>
                        <Form.Item
                          field={item.field + '.value'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input />
                        </Form.Item>
                      </Space>
                    </div>
                  );
                })}
                <Form.Item style={{ padding: 10 }}>
                  <Space >
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
