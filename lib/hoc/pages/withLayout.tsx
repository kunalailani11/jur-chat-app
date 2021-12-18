import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

export default function withLayout<TProps>(
    ComposedComponent: React.ComponentType<TProps>
  ): React.ComponentType<TProps> {
    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
    const WrappedComponent: React.ComponentType<TProps> = (props: TProps) => {
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
        )
    }
    WrappedComponent.displayName = `withLayout(${displayName})`;

  return WrappedComponent;
  }