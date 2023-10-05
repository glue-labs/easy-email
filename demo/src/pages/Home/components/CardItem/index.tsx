import { IArticle } from '@demo/services/article';
import React from 'react';
import { IconEdit } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import template from '@demo/store/template';
import { pushEvent } from '@demo/utils/pushEvent';
import { getLoadingByKey, useLoading } from '@demo/hooks/useLoading';
import { Loading } from '@demo/components/loading';

interface CardItemProps {
  data: any;
}

export function CardItem(props: CardItemProps) {
  const { data } = props;

  const loading = useLoading([
    getLoadingByKey(template.loadings.duplicate, data.id),
    getLoadingByKey(template.loadings.removeById, data.id),
  ]);

  return (
    <div
      key={data.id}
      className={styles.templeteItem}
      style={{ backgroundImage: `url(${data.imageUrl})` }}
    >
      <div className={styles.bottom}>
        <div className={styles.title}>Title: {data.title}</div>
        <div className={styles.title}>
          Date {dayjs(data.created_at * 1000).format('YYYY-MM-DD')}
        </div>
      </div>
      <div className={styles.mask}>
        {loading ? (
          <div className={styles.listBottom}>
            <Loading loading color='#ffffff' />
          </div>
        ) : (
          <div className={styles.listBottom}>
            <div className={styles.listItem}>
              <Link
                to={`/editor?id=${data.id}`}
                onClick={() =>
                  pushEvent({
                    event: 'Edit',
                    payload: { article_id: data.id, title: data.title },
                  })
                }
              >
                <IconEdit />
                &nbsp;Edit
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
