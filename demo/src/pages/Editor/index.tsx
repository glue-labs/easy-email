import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@demo/store/template';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import { useLoading } from '@demo/hooks/useLoading';
import {
  Button,
  ConfigProvider,
  Message,
  PageHeader,
} from '@arco-design/web-react';
import { useQuery } from '@demo/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep, set, isEqual, get } from 'lodash';
import { Loading } from '@demo/components/loading';
import services from '@demo/services';
import { Liquid } from 'liquidjs';
import {
  EmailEditor,
  EmailEditorProvider,
  EmailEditorProviderProps,
  IEmailTemplate,
} from 'easy-email-editor';

import { Stack } from '@demo/components/Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { FormApi } from 'final-form';
import { UserStorage } from '@demo/utils/user-storage';

import { useCollection } from './components/useCollection';
import { IBlockData } from 'easy-email-core';
import {
  BlockMarketManager,
  ExtensionProps,
  StandardLayout,
} from 'easy-email-extensions';
import { AutoSaveAndRestoreEmail } from '@demo/components/AutoSaveAndRestoreEmail';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import { testMergeTags } from './testMergeTags';
import { useMergeTagsModal } from './components/useMergeTagsModal';

import { useWindowSize } from 'react-use';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { IconSave } from '@arco-design/web-react/icon';
import component from '@demo/store/component';
import templateList from '@demo/store/templateList';
import {
  onExportHTML,
  onExportImage,
  onExportJSON,
  onExportMJML
} from '@demo/utils/exportUtility';
import { CustomBlocksType } from './components/CustomBlocks/constants';
import defaultData from '@demo/store/defaultData';

const imageCompression = import('browser-image-compression');

export default function Editor() {
  const defaultCategories: ExtensionProps['categories'] = [
    {
      label: 'Content',
      active: true,
      blocks: [
        // {
        //   type: CustomBlocksType.TOPBAR_3,
        // },
        // {
        //   type: CustomBlocksType.TOPBAR_4,
        // },
        // {
        //   type: CustomBlocksType.TOPBAR_5,
        // },
        // {
        //   type: CustomBlocksType.TOPBAR_6,
        // }
      ],
    }
  ];

  const changeCategories = (category: string) => {
    dispatch(component.actions.fetch({
      categoryId: category
    }));
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  const { collectionCategory } = useCollection();
  const { width } = useWindowSize();

  const smallScene = width < 1400;

  const { id, userId } = useQuery();
  const loading = useLoading(template.loadings.fetchById);
  const {
    mergeTags,
    setMergeTags,
  } = useMergeTagsModal(testMergeTags);

  // List Blocks
  const list = useAppSelector('component');
  useEffect(() => {
    dispatch(component.actions.fetch({}));
  }, [dispatch]);

  // List Blocks
  const templates = useAppSelector('templateList');
  useEffect(() => {
    dispatch(templateList.actions.fetch(undefined));
  }, [dispatch]);

  console.log(templates, 'okayss');

  const mergeTagData = useAppSelector('defaultData');
  useEffect(() => {
    dispatch(defaultData.actions.fetchById(id));
  }, [dispatch]);

  useEffect(() => {
    if (collectionCategory) {
      BlockMarketManager.addCategories([collectionCategory]);
      return () => {
        BlockMarketManager.removeCategories([collectionCategory]);
      };
    }
  }, [collectionCategory]);

  // Get Template Data By Doing API Call on Component mount
  useEffect(() => {
    if (id) {
      if (!userId) {
        UserStorage.getAccount().then(account => {
          dispatch(template.actions.fetchById({ id: +id, userId: account.user_id }));
        });
      } else {
        dispatch(template.actions.fetchById({ id: +id, userId: +userId }));
      }
    } else {
      dispatch(template.actions.fetchDefaultTemplate(undefined));
    }

    return () => {
      dispatch(template.actions.set(null));
    };
  }, [dispatch, id, userId]);

  // Update merge tags keys
  useEffect(() => {
    if (!mergeTagData || !Object.keys(mergeTagData).length) return;
    console.log('SFF', mergeTagData);
    setMergeTags({
      ...mergeTagData.fields,
      mutableKeys: mergeTagData.mutableKeys
    });
  }, [mergeTagData]);

  // Compress Image & Upload
  const onUploadImage = async (blob: Blob) => {
    const compressionFile = await (
      await imageCompression
    ).default(blob as File, {
      maxWidthOrHeight: 1440,
    });
    return services.common.uploadByQiniu(compressionFile);
  };

  // Method to update merge tag value
  const onChangeMergeTag = useCallback((path: string, val: any) => {
    setMergeTags(old => {
      const newObj = cloneDeep(old);
      set(newObj, path, val);
      return newObj;
    });
  }, []);

  const updateDefaultData = (id: string) => {
    dispatch(defaultData.actions.fetchById(+id));
  };

  // Load Template Data into the Editor
  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!templateData) return null;
    const sourceData = cloneDeep(templateData.content) as IBlockData;
    return {
      ...templateData,
      content: sourceData, // replace standard block
    };
  }, [templateData]);

  // Update the Json
  const categories = useMemo(() => {
    if (!list) return [];
    const newList = cloneDeep(list);
    const filteredList = newList.map((l: any) => l.templateJson);
    defaultCategories[0].blocks = [
      ...defaultCategories[0].blocks,
      ...filteredList,
    ];
    return defaultCategories;
  }, [list]);


  const onSubmit = useCallback(
    async (
      values: IEmailTemplate,
      form: FormApi<IEmailTemplate, Partial<IEmailTemplate>>,
    ) => {
      pushEvent({ event: 'EmailSave' });
      if (id) {
        const isChanged = !(
          isEqual(initialValues?.content, values.content) &&
          isEqual(initialValues?.subTitle, values?.subTitle) &&
          isEqual(initialValues?.subject, values?.subject)
        );

        if (!isChanged) {
          Message.success('Updated success!');
          form.restart(values);
          return;
        }
        dispatch(
          template.actions.updateById({
            id: +id,
            template: values,
            success() {
              Message.success('Updated success!');
              form.restart(values);
            },
          }),
        );
      } else {
        dispatch(
          template.actions.create({
            template: values,
            success(id, newTemplate) {
              Message.success('Saved success!');
              form.restart(newTemplate);
              history.replace(`/editor?id=${id}`);
            },
          }),
        );
      }
    },
    [dispatch, history, id, initialValues],
  );

  // Method to do Preview with Injected Data
  const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] = useCallback(
    (html: string, mergeTags) => {
      const engine = new Liquid();
      const tpl = engine.parse(html);
      return engine.renderSync(tpl, mergeTags);
    },
    [],
  );

  const saveMyTemplate = async (values: IEmailTemplate) => {
    const val1 = onExportJSON(values);
    console.log(val1);
    const val = onExportHTML(values, mergeTags);
    console.log(val);
    const val2 = onExportMJML(values, mergeTags);
    console.log(val2);
    const val3 = await onExportImage(values, mergeTags);
    console.log(val3);

    dispatch(component.actions.update({
      id: '1313',
      data: {
        templateMjml: val2,
        templateJson: val1,
      }
    }));
  };

  if (!templateData && loading && !categories.length) {
    return (
      <Loading loading={loading}>
        <div style={{ height: '100vh' }} />
      </Loading>
    );
  }

  if (!initialValues) return null;

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <EmailEditorProvider
          key={id}
          height={'calc(100vh - 68px)'}
          data={initialValues}
          onUploadImage={onUploadImage}
          onSubmit={onSubmit}
          onChangeMergeTag={onChangeMergeTag}
          setMergeTags={setMergeTags}
          autoComplete
          enabledLogic
          dashed={false}
          mergeTags={mergeTags}
          mergeTagGenerate={tag => get(mergeTags, tag)}
          onBeforePreview={onBeforePreview}
          socialIcons={[]}
        >
          {({ values }, { submit, restart }) => {
            return (
              <>
                <PageHeader
                  style={{ background: 'var(--color-bg-2)' }}
                  backIcon
                  title='Go Back To xG'
                  onBack={() => {
                    if (window.confirm('Are you sure you want to go back?')) {
                      // Perform the navigation here
                      history.push('/');
                    }
                  }}
                  extra={
                    <Stack alignment='center'>
                      <Button
                        type='outline'
                        onClick={() => { saveMyTemplate(values); }}
                        icon={<IconSave />
                        }
                      ></Button>
                    </Stack>
                  }
                />
                <StandardLayout
                  compact={!smallScene}
                  categories={categories}
                  changeCategories={changeCategories}
                  templates={templates}
                  mergeTagData={mergeTagData}
                  updateDefaultData={updateDefaultData}
                >
                  <EmailEditor />
                </StandardLayout>
                <AutoSaveAndRestoreEmail />
              </>
            );
          }}
        </EmailEditorProvider>
        <style>{`#bmc-wbtn {display:none !important;}`}</style>
      </div>
    </ConfigProvider>
  );
}