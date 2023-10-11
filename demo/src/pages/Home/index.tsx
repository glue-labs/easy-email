import React from 'react';
import Frame from '@demo/components/Frame';
import { Button } from '@arco-design/web-react';
import { history } from '@demo/utils/history';
import { pushEvent } from '@demo/utils/pushEvent';

export default function Home() {
  const list = [];

  return (
    <Frame
      title='Templates'
      primaryAction={
        <Button
          onClick={() => {
            pushEvent({ event: 'Create' });
            history.push('/editor');
          }}
        >
          Add
        </Button>
      }
    >
      <>
        {/* <Stack>
          {[...templates, ...list].map((item) => (
            <CardItem data={item} key={item.article_id} />
          ))}
        </Stack> */}
      </>
    </Frame>
  );
}
