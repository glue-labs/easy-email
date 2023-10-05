import { Button, Card, Divider } from '@arco-design/web-react';
import Meta from '@arco-design/web-react/es/Card/meta';
import React from 'react';
import { useForm } from 'react-final-form';
import { useExtensionProps } from '../Providers/ExtensionProvider';
import { MjmlToJson } from '@extensions/utils/MjmlToJson';
import { useEditorProps } from '@';

export const TemplateUi = () => {
  const { templates } = useExtensionProps();
  const { setMergeTags, mergeTags } = useEditorProps();

  const form = useForm();

  const onSubmit = (card: {
    templateMjml: string;
    templateId: string;
    defaultData: Record<string, any>;
  }) => {
    const content = MjmlToJson(card.templateMjml);
    form.restart({
      subject: '',
      content,
      subtitle: ''
    });

    setMergeTags && setMergeTags({
      ...mergeTags,
      ...card?.defaultData?.fields,
    });
  };

  return (
    <>
      {
        templates?.map((card: any, index: any) => {
          return (
            <div key={index}>
              <Card
                hoverable
                key={index}
                style={{ width: 360, padding: '10px' }}
                cover={(
                  <div style={{ height: 204, overflow: 'hidden' }}>
                    <img
                      style={{ width: '100%', transform: 'translateY(-20px)' }}
                      alt='dessert'
                      src={card.imageUrl}
                    />
                  </div>
                )}
              >
                <Meta
                  title={card.title}
                  key={index}
                />
                <br />
                <Button onClick={() => onSubmit(card)}>Use This Template
                </Button>
              </Card>
              <Divider style={{ border: '5px solid rgb(var(--gray-3))' }} />
            </div>
          );
        })
      }
    </>
  );
};
