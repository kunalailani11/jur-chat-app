import React, { useEffect } from 'react';
import { Layout, Row, Col, notification } from 'antd';
import { useAppContext } from 'context/state';

const { Content } = Layout;

const ignorePacket = ['ping', 'welcome', 'confirm_subscription'];

const wsEndPoint = '34.122.252.114:3000';

export default function withLayout<TProps>(
  ComposedComponent: React.ComponentType<TProps>
): React.ComponentType<TProps> {
  const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
  const WrappedComponent: React.ComponentType<TProps> = (props: TProps) => {
    const user = useAppContext();
    const {
      userInfo: { id },
    } = user;
    useEffect(() => {
      const ws = new WebSocket(`ws://${wsEndPoint}/cable`);
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            command: 'subscribe',
            identifier: JSON.stringify({
              channel: 'NotificationsChannel',
            }),
          })
        );
      };
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type && ignorePacket.includes(data.type)) return false;
          if (data.message?.sender_id == id) return false;
          if (data.message?.contact_ids.indexOf(id) == -1) return false;

          notification.open({
            message: data.message.sender_name,
            description: data.message.content,
          });
        } catch (e) {
          // catch the error
        }
      };
      return () => {
        ws.close;
      };
    }, []);

    return (
      <Layout>
        <Content>
          <Row className="content-row-wrapper">
            <Col span={14} className="content-column-wrapper">
              <ComposedComponent {...props}></ComposedComponent>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  };
  WrappedComponent.displayName = `withLayout(${displayName})`;

  return WrappedComponent;
}
