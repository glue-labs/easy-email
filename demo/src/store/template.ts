import { article, IArticle, ITemp } from '@demo/services/article';
import createSliceState from './common/createSliceState';
import { Message } from '@arco-design/web-react';
import { history } from '@demo/utils/history';
import { emailToImage } from '@demo/utils/emailToImage';
import { IBlockData, BlockManager, BasicType, AdvancedType } from 'easy-email-core';
import { IEmailTemplate, ITempEmailTemplate } from 'easy-email-editor';
import { getTemplate } from '@demo/config/getTemplate';

export function getAdaptor(data: IArticle): IEmailTemplate {
  const content = JSON.parse(data.content.content) as IBlockData;
  return {
    ...data,
    content,
    subject: data.title,
    subTitle: data.summary,
  };
}

export default createSliceState({
  name: 'template',
  initialState: null as IEmailTemplate | null,
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
  effects: {
    fetchById: async (
      state,
      {
        id
      }: {
        id: string;
      },
    ) => {
      try {
        let data = await getTemplate(id);
        if (!data) {
          data = await article.getTemp(id);
        }
        return {
          content: JSON.parse(data.json),
          subject: '',
          subTitle: '',
          defaultData: JSON.parse(data.defaultData),
        };
      } catch (error) {
        history.replace('/');
        throw error;
      }
    },
    fetchDefaultTemplate: async state => {
      return {
        subject: 'Welcome to Easy-email',
        subTitle: 'Nice to meet you!',
        content: BlockManager.getBlockByType(BasicType.PAGE).create({
          children: [BlockManager.getBlockByType(AdvancedType.WRAPPER).create()],
        }),
      } as IEmailTemplate;
    },
    create: async (
      state,
      payload: {
        id: string;
        template: IEmailTemplate;
        mjml: string;
        success: (id: string, data: ITempEmailTemplate) => void;
      },
    ) => {

      console.log('HI HHH', payload);
      const data = await article.addTempArticle({
        // id: payload.id,
        title: payload.template.subject,
        mjml: payload.mjml,
        json: payload.template.content,
      });

      console.log("data", data, payload.template);
      // payload.success(data[0].id, data);
      // return { ...data, ...payload.template };
    },
    duplicate: async (
      state,
      payload: {
        article: {
          article_id: number;
          user_id: number;
        };
        success: (id: number) => void;
      },
    ) => {
      const source = await article.getArticle(
        payload.article.article_id,
        payload.article.user_id,
      );
      const data = await article.addArticle({
        title: source.title,
        content: source.content.content,
        picture: source.picture,
        summary: source.summary,
      });
      payload.success(data.article_id);
    },
    updateById: async (
      state,
      payload: {
        id: number;
        template: IEmailTemplate;
        success: (templateId: number) => void;
      },
    ) => {
      try {
        let isDefaultTemplate = await getTemplate(payload.id);
        if (isDefaultTemplate) {
          Message.error('Cannot change the default template');
          return;
        }

        const picture = await emailToImage(payload.template.content);
        await article.updateArticle(payload.id, {
          picture,
          content: JSON.stringify(payload.template.content),
          title: payload.template.subject,
          summary: payload.template.subTitle,
        });
        payload.success(payload.id);
      } catch (error: any) {
        if (error?.response?.status === 404) {
          throw {
            message: 'Cannot change the default template',
          };
        }
      }
    },
    removeById: async (state, payload: { id: number; success: () => void; }) => {
      try {
        await article.deleteArticle(payload.id);
        payload.success();
        Message.success('Removed success.');
      } catch (error: any) {
        if (error?.response?.status === 404) {
          throw {
            message: 'Cannot delete the default template',
          };
        }
      }
    },
  },
});
