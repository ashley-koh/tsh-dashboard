import React from "react";
import { Card, List, Avatar } from "antd";

const Ranking: React.FC = () => {
  const data: { name: string; value: number }[] = [];
  for (let i = 0; i < 80; i++) {
    data.push({
      name: `Employee ${i}`,
      value: Math.round(Math.random() * 100),
    });
  }

  return (
    <Card title="Department Ranking">
      <List
        pagination={{ position: "bottom", align: "center" }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">view</a>,
              <a key="list-loadmore-more">contact</a>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.name}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>{item.value}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Ranking;
